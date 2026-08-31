import express from "express";
import fs from "fs";
import { createServer, type Server } from "http";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { PlanningAuthStore } from "./planning-auth-store";
import { installPlanningAuth } from "./planning-auth";

const cleanup: string[] = [];
const servers: Server[] = [];
afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve) => server.close(() => resolve()))));
  for (const directory of cleanup.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});
function temp() { const directory = fs.mkdtempSync(path.join(os.tmpdir(), "planning-auth-")); cleanup.push(directory); return directory; }
function cookies(response: Response) {
  const values = (response.headers as Headers & { getSetCookie?: () => string[] }).getSetCookie?.() || [response.headers.get("set-cookie") || ""];
  return values.map((value) => value.split(";", 1)[0]).filter(Boolean).join("; ");
}
function csrf(cookieHeader: string) {
  const item = cookieHeader.split("; ").find((value) => value.startsWith("casino_planning_csrf="));
  return item ? decodeURIComponent(item.split("=", 2)[1]) : "";
}

async function fixture(mode: "observe" | "enforced" = "enforced") {
  const store = new PlanningAuthStore({ dbPath: path.join(temp(), "auth.sqlite") }); await store.initialize();
  const app = express(); app.use(express.json());
  const server = createServer(app); await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve)); servers.push(server);
  const address = server.address(); if (!address || typeof address === "string") throw new Error("listen failed");
  const base = `http://127.0.0.1:${address.port}`;
  const auth = installPlanningAuth(app, store, { mode, mcpToken: "test-mcp-token", publicOrigin: base });
  app.get("/protected/read", auth.requireRead, (_req, res) => res.json({ ok: true, actor: auth.actor(res) }));
  app.post("/protected/edit", auth.requireEdit, (_req, res) => res.json({ ok: true, actor: auth.actor(res) }));
  return { store, base };
}

describe("PlanningAuthStore", () => {
  it("persists users while storing only token hashes", async () => {
    const directory = temp(); const dbPath = path.join(directory, "auth.sqlite");
    const store = new PlanningAuthStore({ dbPath }); await store.initialize();
    const invite = await store.createBootstrapOwnerInvite({ email: "Scott@Example.org", name: "Scott Wayman" });
    const redeemed = await store.redeemInvite(invite.token);
    expect(redeemed.user).toMatchObject({ email: "scott@example.org", role: "owner", orientationComplete: false });
    expect(fs.readFileSync(dbPath).includes(Buffer.from(invite.token))).toBe(false);
    const reopened = new PlanningAuthStore({ dbPath }); await reopened.initialize();
    expect((await reopened.listUsers())[0]).toMatchObject({ email: "scott@example.org", role: "owner" });
  });

  it("rejects reused invitations and protects the final owner", async () => {
    const store = new PlanningAuthStore({ dbPath: path.join(temp(), "auth.sqlite") }); await store.initialize();
    const invite = await store.createBootstrapOwnerInvite({ email: "owner@example.org", name: "Owner" });
    await expect(store.createBootstrapOwnerInvite({ email: "other@example.org", name: "Other" })).rejects.toThrow("bootstrap_invitation_already_exists");
    const owner = (await store.redeemInvite(invite.token)).user;
    await expect(store.redeemInvite(invite.token)).rejects.toThrow("invalid_invite");
    await expect(store.updateUser(owner.id, { role: "viewer" }, owner.id)).rejects.toThrow("cannot_remove_last_owner");
  });

  it("invalidates superseded invitations and never uses an invite to change an existing member", async () => {
    const store = new PlanningAuthStore({ dbPath: path.join(temp(), "auth.sqlite") }); await store.initialize();
    const bootstrap = await store.createBootstrapOwnerInvite({ email: "owner@example.org", name: "Owner" });
    const owner = (await store.redeemInvite(bootstrap.token)).user;
    await expect(store.createInvite({ email: owner.email, name: owner.name, role: "viewer", invitedBy: owner.id })).rejects.toThrow("user_already_exists");
    const first = await store.createInvite({ email: "member@example.org", name: "Member", role: "viewer", invitedBy: owner.id });
    const replacement = await store.createInvite({ email: "member@example.org", name: "Member", role: "editor", invitedBy: owner.id });
    await expect(store.redeemInvite(first.token)).rejects.toThrow("invalid_invite");
    expect((await store.redeemInvite(replacement.token)).user.role).toBe("editor");
  });

  it("discards committed in-memory state when durable persistence fails", async () => {
    const dbPath = path.join(temp(), "auth.sqlite"); let saves = 0;
    const store = new PlanningAuthStore({ dbPath, persist: (db, target) => {
      saves += 1; if (saves === 2) throw new Error("simulated_persist_failure");
      fs.writeFileSync(target, Buffer.from(db.export()));
    } });
    await store.initialize();
    await expect(store.createBootstrapOwnerInvite({ email: "owner@example.org", name: "Owner" })).rejects.toThrow("simulated_persist_failure");
    const retry = await store.createBootstrapOwnerInvite({ email: "owner@example.org", name: "Owner" });
    expect((await store.redeemInvite(retry.token)).user.role).toBe("owner");
  });
});

describe("planning auth HTTP boundary", () => {
  it("bootstraps an owner, redeems once, and enforces session plus CSRF", async () => {
    const { base } = await fixture();
    expect((await fetch(`${base}/protected/read`)).status).toBe(401);
    const bootstrap = await fetch(`${base}/api/casino-night-auth/bootstrap`, { method: "POST", headers: { origin: base, authorization: "Bearer test-mcp-token", "content-type": "application/json" }, body: JSON.stringify({ email: "scott@example.org", name: "Scott" }) });
    expect(bootstrap.status).toBe(201);
    const inviteUrl = (await bootstrap.json()).invite.url as string;
    const token = new URLSearchParams(new URL(inviteUrl).hash.slice(1)).get("invite"); expect(token).toBeTruthy();
    const redeem = await fetch(`${base}/api/casino-night-auth/redeem`, { method: "POST", headers: { origin: base, "content-type": "application/json" }, body: JSON.stringify({ token }) });
    expect(redeem.status).toBe(200); const cookieHeader = cookies(redeem); expect(cookieHeader).toContain("casino_planning_session=");
    const read = await fetch(`${base}/protected/read`, { headers: { cookie: cookieHeader } });
    expect(read.status).toBe(200); expect((await read.json()).actor).toContain("scott@example.org");
    expect((await fetch(`${base}/protected/edit`, { method: "POST", headers: { cookie: cookieHeader, origin: base } })).status).toBe(403);
    expect((await fetch(`${base}/protected/edit`, { method: "POST", headers: { cookie: cookieHeader, origin: base, "x-csrf-token": csrf(cookieHeader) } })).status).toBe(200);
  });

  it("keeps observe mode explicit and attributable", async () => {
    const { base } = await fixture("observe");
    const response = await fetch(`${base}/protected/read`); expect(response.status).toBe(200);
    expect((await response.json()).actor).toBe("Legacy unauthenticated workspace");
    expect((await (await fetch(`${base}/api/casino-night-auth/status`)).json()).mode).toBe("observe");
  });

  it("ignores malformed cookie encoding instead of crashing the service", async () => {
    const { base } = await fixture();
    const session = await fetch(`${base}/api/casino-night-auth/session`, { headers: { cookie: "broken=%" } });
    expect(session.status).toBe(200); expect((await session.json()).authenticated).toBe(false);
    expect((await fetch(`${base}/protected/read`, { headers: { cookie: "broken=%" } })).status).toBe(401);
  });
});
