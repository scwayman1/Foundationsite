import crypto from "crypto";
import type { Express, NextFunction, Request, Response } from "express";
import type { PlanningAuthStore, PlanningPrincipal, PlanningRole } from "./planning-auth-store";

const SESSION_COOKIE = "casino_planning_session";
const CSRF_COOKIE = "casino_planning_csrf";
const roleRank: Record<PlanningRole, number> = { viewer: 1, editor: 2, owner: 3 };

type Options = {
  mode?: "observe" | "enforced";
  mcpToken?: string;
  publicOrigin?: string;
};

function parseCookies(req: Request) {
  const values: Record<string, string> = {};
  for (const part of (req.get("cookie") || "").split(";")) {
    const [rawKey, ...rawValue] = part.trim().split("=");
    if (rawKey) values[rawKey] = rawValue.join("=");
  }
  return values;
}
function asyncHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => { void handler(req, res, next).catch(next); };
}
function bearer(req: Request) {
  const value = req.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}
function tokenMatches(expected: string, supplied: string) {
  if (!expected || !supplied) return false;
  const a = crypto.createHash("sha256").update(expected).digest();
  const b = crypto.createHash("sha256").update(supplied).digest();
  return crypto.timingSafeEqual(a, b);
}
function setCookie(res: Response, name: string, value: string, options: { httpOnly?: boolean; maxAge?: number } = {}) {
  const flags = [`${name}=${encodeURIComponent(value)}`, "Path=/", "SameSite=Strict", options.httpOnly ? "HttpOnly" : "", options.maxAge ? `Max-Age=${options.maxAge}` : "", process.env.NODE_ENV === "production" ? "Secure" : ""].filter(Boolean);
  res.append("Set-Cookie", flags.join("; "));
}
function clearCookie(res: Response, name: string) { res.append("Set-Cookie", `${name}=; Path=/; SameSite=Strict; Max-Age=0; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}`); }
function publicUser(principal: PlanningPrincipal) {
  return { id: principal.id, email: principal.email, name: principal.name, role: principal.role, orientationComplete: principal.orientationComplete, expiresAt: principal.expiresAt };
}

export function installPlanningAuth(app: Express, store: PlanningAuthStore, options: Options = {}) {
  const mode = options.mode || (process.env.CASINO_PLANNING_AUTH_MODE === "enforced" ? "enforced" : "observe");
  const mcpToken = options.mcpToken?.trim() || process.env.CASINO_PLANNING_MCP_TOKEN?.trim() || "";
  const publicOrigin = (options.publicOrigin || process.env.CASINO_PLANNING_PUBLIC_ORIGIN || "https://www.coastlinecollegefoundation.com").replace(/\/$/, "");
  const allowedOrigins = new Set([publicOrigin, "http://127.0.0.1:4177", "http://localhost:4177", "http://127.0.0.1:5173", "http://localhost:5173"]);

  const loadPrincipal = async (req: Request) => {
    const cookies = parseCookies(req);
    return store.authenticate(cookies[SESSION_COOKIE]);
  };
  const requireOrigin = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.get("origin") || "";
    if (!allowedOrigins.has(origin)) return res.status(403).json({ error: "invalid_origin" });
    next();
  };
  const requireRole = (minimum: PlanningRole, mutation = false) => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "no-store");
    const cookies = parseCookies(req);
    const principal = await store.authenticate(cookies[SESSION_COOKIE], mutation ? req.get("x-csrf-token") : undefined);
    if (!principal) {
      if (mode === "observe") { res.locals.planningPrincipal = null; return next(); }
      return res.status(mutation ? 403 : 401).json({ error: mutation ? "csrf_or_session_invalid" : "authentication_required" });
    }
    if (mutation && (!allowedOrigins.has(req.get("origin") || "") || req.get("x-csrf-token") !== cookies[CSRF_COOKIE])) return res.status(403).json({ error: "csrf_or_origin_invalid" });
    if (roleRank[principal.role] < roleRank[minimum]) return res.status(403).json({ error: "insufficient_permission" });
    res.locals.planningPrincipal = principal; next();
  });
  const actor = (res: Response) => {
    const principal = res.locals.planningPrincipal as PlanningPrincipal | null | undefined;
    return principal ? `${principal.name} (${principal.email})` : "Legacy unauthenticated workspace";
  };

  app.get("/api/casino-night-auth/status", asyncHandler(async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, mode, provisioned: await store.hasUsers(), invitationOnly: true, roles: ["owner", "editor", "viewer"] });
  }));
  app.get("/api/casino-night-auth/session", asyncHandler(async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const principal = await loadPrincipal(req);
    res.json(principal ? { authenticated: true, user: publicUser(principal), mode } : { authenticated: false, mode });
  }));
  app.post("/api/casino-night-auth/redeem", requireOrigin, asyncHandler(async (req, res) => {
    try {
      const redeemed = await store.redeemInvite(req.body?.token);
      const seconds = Math.max(1, Math.floor((new Date(redeemed.expiresAt).valueOf() - Date.now()) / 1000));
      setCookie(res, SESSION_COOKIE, redeemed.sessionToken, { httpOnly: true, maxAge: seconds });
      setCookie(res, CSRF_COOKIE, redeemed.csrfToken, { maxAge: seconds });
      res.setHeader("Cache-Control", "no-store");
      res.json({ authenticated: true, user: publicUser({ ...redeemed.user, sessionId: redeemed.sessionId, expiresAt: redeemed.expiresAt }) });
    } catch { res.status(400).json({ error: "invalid_or_expired_invitation" }); }
  }));
  app.post("/api/casino-night-auth/logout", requireRole("viewer", true), asyncHandler(async (_req, res) => {
    const principal = res.locals.planningPrincipal as PlanningPrincipal | null;
    if (principal) await store.logout(principal.sessionId);
    clearCookie(res, SESSION_COOKIE); clearCookie(res, CSRF_COOKIE); res.json({ ok: true });
  }));
  app.post("/api/casino-night-auth/orientation", requireRole("viewer", true), asyncHandler(async (_req, res) => {
    const principal = res.locals.planningPrincipal as PlanningPrincipal | null;
    if (!principal) return res.status(401).json({ error: "authentication_required" });
    await store.completeOrientation(principal.id); res.json({ ok: true });
  }));
  app.post("/api/casino-night-auth/bootstrap", requireOrigin, asyncHandler(async (req, res) => {
    if (!mcpToken) return res.status(503).json({ error: "secure_bootstrap_not_configured" });
    if (!tokenMatches(mcpToken, bearer(req))) return res.status(401).json({ error: "unauthorized" });
    try {
      const invite = await store.createBootstrapOwnerInvite({ email: req.body?.email, name: req.body?.name });
      res.status(201).json({ invite: { ...invite, token: undefined, url: `${publicOrigin}/internal/casino-night-planning-access#invite=${encodeURIComponent(invite.token)}` } });
    } catch (error) { res.status(400).json({ error: error instanceof Error ? error.message : "bootstrap_failed" }); }
  }));
  app.get("/api/casino-night-auth/users", requireRole("owner"), asyncHandler(async (_req, res) => res.json({ users: await store.listUsers(), invites: await store.listInvites() })));
  app.post("/api/casino-night-auth/invites", requireRole("owner", true), asyncHandler(async (req, res) => {
    const principal = res.locals.planningPrincipal as PlanningPrincipal | null;
    if (!principal) return res.status(401).json({ error: "authentication_required" });
    try {
      const invite = await store.createInvite({ email: req.body?.email, name: req.body?.name, role: req.body?.role, invitedBy: principal.id, expiresHours: req.body?.expiresHours });
      res.status(201).json({ invite: { ...invite, token: undefined, url: `${publicOrigin}/internal/casino-night-planning-access#invite=${encodeURIComponent(invite.token)}` } });
    } catch (error) { res.status(400).json({ error: error instanceof Error ? error.message : "invite_failed" }); }
  }));
  app.patch("/api/casino-night-auth/users/:id", requireRole("owner", true), asyncHandler(async (req, res) => {
    const principal = res.locals.planningPrincipal as PlanningPrincipal | null;
    if (!principal) return res.status(401).json({ error: "authentication_required" });
    try { res.json({ user: await store.updateUser(req.params.id, req.body || {}, principal.id) }); }
    catch (error) { res.status(400).json({ error: error instanceof Error ? error.message : "user_update_failed" }); }
  }));

  return {
    mode,
    actor,
    requireRead: requireRole("viewer"),
    requireEdit: requireRole("editor", true),
    requireOwnerRead: requireRole("owner"),
    requireOwner: requireRole("owner", true),
  };
}
