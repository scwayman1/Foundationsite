import express from "express";
import fs from "fs";
import { createServer, type Server } from "http";
import os from "os";
import path from "path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { afterEach, describe, expect, it } from "vitest";
import { PlanningStore } from "./planning-store";
import { installPlanningMcp } from "./planning-mcp";

const servers: Server[] = [];
const directories: string[] = [];
afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve) => server.close(() => resolve()))));
  for (const directory of directories.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});

async function fixture() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "planning-mcp-"));
  directories.push(directory);
  const store = new PlanningStore({ dbPath: path.join(directory, "planning.sqlite"), randomId: () => `test-${Date.now()}` });
  await store.initialize();
  const app = express();
  app.use(express.json());
  installPlanningMcp(app, store, { token: "test-private-token", enableDnsRebindingProtection: false });
  const server = createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("test_server_unavailable");
  const base = `http://127.0.0.1:${address.port}`;
  return { store, base };
}

function textResult(result: Awaited<ReturnType<Client["callTool"]>>) {
  const content = result.content as Array<{ type: string; text?: string }>;
  return JSON.parse(content.find((item) => item.type === "text")?.text || "{}");
}

describe("Casino Night planning MCP", () => {
  it("rejects missing credentials without revealing board data", async () => {
    const { base } = await fixture();
    const response = await fetch(`${base}/mcp/casino-night-planning`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "1" } } }),
    });
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "planning_mcp_unauthorized" });
  });

  it("supports an authenticated create, revision-safe update, completion, and attributed audit trail", async () => {
    const { store, base } = await fixture();
    const client = new Client({ name: "planning-mcp-test", version: "1.0.0" });
    const transport = new StreamableHTTPClientTransport(new URL(`${base}/mcp/casino-night-planning`), {
      requestInit: { headers: { Authorization: "Bearer test-private-token", "X-Agent-Name": "Test Worker" } },
    });
    await client.connect(transport);
    const tools = await client.listTools();
    expect(tools.tools.map((tool) => tool.name)).toEqual(expect.arrayContaining([
      "board_summary", "list_actions", "get_action", "create_action", "update_action", "complete_action", "recent_activity",
    ]));

    const createdPayload = textResult(await client.callTool({ name: "create_action", arguments: {
      title: "Confirm volunteer check-in lead",
      workstream: "Volunteer operations",
      owner: "Scott",
      nextStep: "Ask the committee chair to confirm the lead.",
    } }));
    const created = createdPayload.created;
    expect(created).toMatchObject({ title: "Confirm volunteer check-in lead", revision: 1, status: "Not started" });

    const updatedPayload = textResult(await client.callTool({ name: "update_action", arguments: {
      id: created.id,
      revision: created.revision,
      status: "In progress",
      dueDate: "2026-09-05",
      latestUpdate: "Committee chair contacted.",
    } }));
    const updated = updatedPayload.updated;
    expect(updated).toMatchObject({ revision: 2, status: "In progress", dueDate: "2026-09-05" });

    const stale = await client.callTool({ name: "update_action", arguments: { id: created.id, revision: 1, owner: "Stale agent" } });
    expect(stale.isError).toBe(true);
    expect(textResult(stale)).toEqual({ error: "planning_revision_conflict" });

    const completedPayload = textResult(await client.callTool({ name: "complete_action", arguments: {
      id: created.id,
      revision: updated.revision,
      completionNote: "Volunteer check-in lead confirmed with the committee chair.",
      evidence: "Chair confirmation recorded in the planning meeting notes.",
    } }));
    expect(completedPayload.completed).toMatchObject({ revision: 3, status: "Done" });

    const snapshot = await store.snapshot();
    const action = snapshot.records.find((record) => record.id === created.id);
    expect(action?.data).toMatchObject({ status: "Done", latestUpdate: "Volunteer check-in lead confirmed with the committee chair." });
    expect(snapshot.activity.slice(0, 3).every((event) => event.actor === "MCP agent: Test Worker")).toBe(true);
    await client.close();
  });
});
