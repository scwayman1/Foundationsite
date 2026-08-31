import crypto, { randomUUID } from "crypto";
import type { Express, NextFunction, Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import * as z from "zod/v4";
import type { PlanningRecord, PlanningStore } from "./planning-store";

const MCP_PATH = "/mcp/casino-night-planning";
const VALID_STATUSES = ["Not started", "In progress", "Blocked", "Done"] as const;
const transports = new Map<string, StreamableHTTPServerTransport>();

type McpInstallOptions = {
  token?: string;
  allowedHosts?: string[];
  enableDnsRebindingProtection?: boolean;
};

type ActionView = {
  id: number;
  revision: number;
  title: string;
  workstream: string;
  owner: string;
  status: string;
  dueDate: string;
  priority: string;
  blocker: string;
  dependency: string;
  nextStep: string;
  latestUpdate: string;
  evidence: string;
  updatedAt: string;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

export function actionView(record: PlanningRecord): ActionView {
  return {
    id: record.id,
    revision: record.revision,
    title: record.title,
    workstream: record.workstream || asText(record.data.workstream),
    owner: asText(record.data.owner),
    status: asText(record.data.status) || "Not started",
    dueDate: asText(record.data.dueDate ?? record.data.due_date),
    priority: asText(record.data.priority),
    blocker: asText(record.data.blocker),
    dependency: asText(record.data.dependency),
    nextStep: asText(record.data.next_step ?? record.data.nextStep),
    latestUpdate: asText(record.data.latestUpdate ?? record.data.latest_update),
    evidence: asText(record.data.evidence),
    updatedAt: record.updatedAt,
  };
}

function result(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
    structuredContent: value && typeof value === "object" ? value as Record<string, unknown> : { value },
  };
}

function failure(error: unknown) {
  const message = error instanceof Error ? error.message : "planning_mcp_operation_failed";
  return {
    isError: true,
    content: [{ type: "text" as const, text: JSON.stringify({ error: message }) }],
  };
}

function findAction(records: PlanningRecord[], id: number) {
  const record = records.find((candidate) => candidate.id === id && candidate.kind === "action");
  if (!record) throw new Error("planning_action_not_found");
  return record;
}

function setCanonicalField(data: Record<string, unknown>, key: string, value: string) {
  const next = { ...data, [key]: value };
  if (key === "dueDate") delete next.due_date;
  if (key === "latestUpdate") delete next.latest_update;
  if (key === "next_step") delete next.nextStep;
  return next;
}

export function createPlanningMcpServer(store: PlanningStore, actor: string) {
  const server = new McpServer({
    name: "coastline-casino-night-planning",
    version: "0.1.0",
    websiteUrl: "https://www.coastlinecollegefoundation.com/internal/casino-night-planning-studio",
  });

  server.registerTool("board_summary", {
    title: "Casino Night board summary",
    description: "Summarize active Casino Night action items by status, owner, and workstream.",
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async () => {
    try {
      const snapshot = await store.snapshot();
      const actions = snapshot.records.filter((record) => record.kind === "action").map(actionView);
      const countBy = (key: "status" | "owner" | "workstream") => Object.fromEntries(
        Array.from(actions.reduce((counts, action) => {
          const value = action[key] || "Unassigned";
          counts.set(value, (counts.get(value) || 0) + 1);
          return counts;
        }, new Map<string, number>()).entries()).sort(([a], [b]) => a.localeCompare(b)),
      );
      return result({ totalActions: actions.length, byStatus: countBy("status"), byOwner: countBy("owner"), byWorkstream: countBy("workstream"), generatedAt: snapshot.meta.generatedAt });
    } catch (error) { return failure(error); }
  });

  server.registerTool("list_actions", {
    title: "List Casino Night actions",
    description: "List active action items, optionally filtered by status, owner, workstream, or free-text search. Returns IDs and revisions needed for safe updates.",
    inputSchema: {
      status: z.enum(VALID_STATUSES).optional(),
      owner: z.string().max(120).optional(),
      workstream: z.string().max(120).optional(),
      search: z.string().max(300).optional(),
      limit: z.number().int().min(1).max(100).default(100),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ status, owner, workstream, search, limit }) => {
    try {
      const snapshot = await store.snapshot();
      const needle = asText(search).toLowerCase();
      const actions = snapshot.records
        .filter((record) => record.kind === "action")
        .map(actionView)
        .filter((action) => !status || action.status === status)
        .filter((action) => !owner || action.owner.toLowerCase() === owner.trim().toLowerCase())
        .filter((action) => !workstream || action.workstream.toLowerCase() === workstream.trim().toLowerCase())
        .filter((action) => !needle || JSON.stringify(action).toLowerCase().includes(needle))
        .slice(0, limit);
      return result({ count: actions.length, actions });
    } catch (error) { return failure(error); }
  });

  server.registerTool("get_action", {
    title: "Get one Casino Night action",
    description: "Get one action by ID, including its current revision and all form fields.",
    inputSchema: { id: z.number().int().positive() },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ id }) => {
    try {
      const action = findAction((await store.snapshot()).records, id);
      return result({ action: actionView(action), rawData: action.data });
    } catch (error) { return failure(error); }
  });

  server.registerTool("create_action", {
    title: "Create a Casino Night action",
    description: "Create a new action item in the planning board. Use only for concrete, actionable work.",
    inputSchema: {
      title: z.string().min(1).max(500),
      workstream: z.string().max(120).default(""),
      owner: z.string().max(120).default("Unassigned"),
      status: z.enum(VALID_STATUSES).default("Not started"),
      dueDate: z.string().max(80).default(""),
      priority: z.string().max(80).default(""),
      blocker: z.string().max(5000).default(""),
      dependency: z.string().max(5000).default(""),
      nextStep: z.string().max(5000).default(""),
      latestUpdate: z.string().max(10000).default(""),
      evidence: z.string().max(10000).default(""),
    },
    annotations: { destructiveHint: false, idempotentHint: false, openWorldHint: false },
  }, async (input) => {
    try {
      const created = await store.create({
        kind: "action",
        title: input.title,
        workstream: input.workstream,
        actor,
        data: {
          owner: input.owner,
          status: input.status,
          dueDate: input.dueDate,
          priority: input.priority,
          blocker: input.blocker,
          dependency: input.dependency,
          next_step: input.nextStep,
          latestUpdate: input.latestUpdate,
          evidence: input.evidence,
        },
      });
      return result({ created: actionView(created) });
    } catch (error) { return failure(error); }
  });

  server.registerTool("update_action", {
    title: "Update a Casino Night action",
    description: "Update selected action-form fields. The current revision is required to prevent stale overwrites; call get_action first.",
    inputSchema: {
      id: z.number().int().positive(),
      revision: z.number().int().positive(),
      title: z.string().min(1).max(500).optional(),
      workstream: z.string().max(120).optional(),
      owner: z.string().max(120).optional(),
      status: z.enum(VALID_STATUSES).optional(),
      dueDate: z.string().max(80).optional(),
      priority: z.string().max(80).optional(),
      blocker: z.string().max(5000).optional(),
      dependency: z.string().max(5000).optional(),
      nextStep: z.string().max(5000).optional(),
      latestUpdate: z.string().max(10000).optional(),
      evidence: z.string().max(10000).optional(),
    },
    annotations: { destructiveHint: false, idempotentHint: false, openWorldHint: false },
  }, async (input) => {
    try {
      const current = findAction((await store.snapshot()).records, input.id);
      let data = { ...current.data };
      const fields: Array<[keyof typeof input, string]> = [
        ["owner", "owner"], ["status", "status"], ["dueDate", "dueDate"], ["priority", "priority"],
        ["blocker", "blocker"], ["dependency", "dependency"], ["nextStep", "next_step"],
        ["latestUpdate", "latestUpdate"], ["evidence", "evidence"],
      ];
      for (const [inputKey, dataKey] of fields) {
        const value = input[inputKey];
        if (typeof value === "string") data = setCanonicalField(data, dataKey, value);
      }
      const updated = await store.update(input.id, {
        revision: input.revision,
        actor,
        title: input.title,
        workstream: input.workstream,
        data,
      });
      return result({ updated: actionView(updated) });
    } catch (error) { return failure(error); }
  });

  server.registerTool("complete_action", {
    title: "Complete a Casino Night action",
    description: "Mark an action Done with a concrete completion note. Requires the current revision to prevent stale overwrites.",
    inputSchema: {
      id: z.number().int().positive(),
      revision: z.number().int().positive(),
      completionNote: z.string().min(1).max(10000),
      evidence: z.string().max(10000).optional(),
    },
    annotations: { destructiveHint: false, idempotentHint: false, openWorldHint: false },
  }, async ({ id, revision, completionNote, evidence }) => {
    try {
      const current = findAction((await store.snapshot()).records, id);
      let data = setCanonicalField(current.data, "status", "Done");
      data = setCanonicalField(data, "latestUpdate", completionNote);
      if (evidence !== undefined) data = setCanonicalField(data, "evidence", evidence);
      const updated = await store.update(id, { revision, actor, data });
      return result({ completed: actionView(updated) });
    } catch (error) { return failure(error); }
  });

  server.registerTool("recent_activity", {
    title: "Recent Casino Night board activity",
    description: "Read recent board changes, including server-attributed MCP agent activity.",
    inputSchema: { limit: z.number().int().min(1).max(100).default(30) },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ limit }) => {
    try {
      const activity = (await store.snapshot()).activity.slice(0, limit);
      return result({ count: activity.length, activity });
    } catch (error) { return failure(error); }
  });

  return server;
}

function suppliedBearer(req: Request) {
  const value = req.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

function tokenMatches(expected: string, supplied: string) {
  if (!expected || !supplied) return false;
  const expectedDigest = crypto.createHash("sha256").update(expected).digest();
  const suppliedDigest = crypto.createHash("sha256").update(supplied).digest();
  return crypto.timingSafeEqual(expectedDigest, suppliedDigest);
}

function actorFrom(req: Request) {
  const name = asText(req.get("x-agent-name")).replace(/[^a-z0-9 ._:@/-]/gi, "").slice(0, 80);
  return `MCP agent: ${name || "unnamed"}`;
}

export function installPlanningMcp(app: Express, store: PlanningStore, options: McpInstallOptions = {}) {
  const token = options.token?.trim() || process.env.CASINO_PLANNING_MCP_TOKEN?.trim() || "";
  const port = process.env.PORT?.trim();
  const allowedHosts = options.allowedHosts || [
    "www.coastlinecollegefoundation.com",
    "coastlinecollegefoundation.com",
    "127.0.0.1",
    "localhost",
    ...(port ? [`127.0.0.1:${port}`, `localhost:${port}`] : []),
  ];
  const enableDnsRebindingProtection = options.enableDnsRebindingProtection ?? true;

  const authenticate = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "no-store");
    if (!token) return res.status(503).json({ error: "planning_mcp_not_configured" });
    if (!tokenMatches(token, suppliedBearer(req))) return res.status(401).json({ error: "planning_mcp_unauthorized" });
    next();
  };

  app.post(MCP_PATH, authenticate, async (req, res) => {
    const sessionId = req.get("mcp-session-id") || "";
    try {
      let transport = sessionId ? transports.get(sessionId) : undefined;
      if (!transport && !sessionId && isInitializeRequest(req.body)) {
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          enableDnsRebindingProtection,
          allowedHosts,
          onsessioninitialized: (id) => { transports.set(id, transport!); },
        });
        transport.onclose = () => {
          if (transport?.sessionId) transports.delete(transport.sessionId);
        };
        const server = createPlanningMcpServer(store, actorFrom(req));
        await server.connect(transport);
      } else if (!transport) {
        return res.status(400).json({ jsonrpc: "2.0", error: { code: -32000, message: "Invalid or missing MCP session" }, id: null });
      }
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("Casino Night MCP request failed:", error);
      if (!res.headersSent) res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
    }
  });

  const handleSession = async (req: Request, res: Response) => {
    const transport = transports.get(req.get("mcp-session-id") || "");
    if (!transport) return res.status(400).send("Invalid or missing MCP session");
    await transport.handleRequest(req, res);
  };
  app.get(MCP_PATH, authenticate, handleSession);
  app.delete(MCP_PATH, authenticate, handleSession);

  app.get("/api/casino-night-planning/mcp-status", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, configured: Boolean(token), transport: "streamable-http", endpoint: MCP_PATH, tools: 7 });
  });
}
