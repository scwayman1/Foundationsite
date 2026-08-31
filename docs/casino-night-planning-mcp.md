# Casino Night Planning MCP (experimental)

## Purpose

This private Streamable HTTP MCP server lets Scott's authorized agents interact directly with the Casino Night Planning Studio without browser or computer-use automation.

- MCP endpoint: `https://www.coastlinecollegefoundation.com/mcp/casino-night-planning`
- Setup/QR page: `https://www.coastlinecollegefoundation.com/internal/casino-night-agent-connect`
- Planning board: `https://www.coastlinecollegefoundation.com/internal/casino-night-planning-studio`
- Transport: MCP Streamable HTTP
- Authentication: bearer token in `CASINO_PLANNING_MCP_TOKEN`
- Audit actor: `MCP agent: <X-Agent-Name>`

The MCP endpoint is disabled with HTTP 503 until `CASINO_PLANNING_MCP_TOKEN` is configured. Unauthorized requests return HTTP 401 before board data is read.

## Tool contract

| Tool | Capability | Write safety |
| --- | --- | --- |
| `board_summary` | Counts by status, owner, and workstream | Read-only |
| `list_actions` | Filter/search active actions | Read-only |
| `get_action` | Read one action and its revision | Read-only |
| `create_action` | Create a concrete action item | Attributed append-only audit event |
| `update_action` | Update title, workstream, and form fields | Current revision required |
| `complete_action` | Mark an action Done with a completion note | Current revision required |
| `recent_activity` | Read recent audit events | Read-only |

Archive/delete is intentionally not exposed in this experimental server. Existing unknown record data is preserved during field updates. Legacy snake_case values are normalized to the canonical form fields without losing displayed values.

## Supported action fields

- Action/title
- Workstream
- Owner
- Status: `Not started`, `In progress`, `Blocked`, or `Done`
- Due date
- Priority
- Blocker
- Dependency
- Next step
- Latest update
- Evidence/source

## Authentication and attribution

Every MCP request must include:

```http
Authorization: Bearer <private token>
X-Agent-Name: <stable agent name>
```

The token is compared using fixed-length SHA-256 digests and `timingSafeEqual`. The agent name is sanitized and captured when the MCP session initializes; writes are recorded as `MCP agent: <name>` in the existing append-only activity table.

All agents currently use the same owner token. `X-Agent-Name` improves audit readability but is not cryptographic per-agent identity. A production multi-user version should use OAuth 2.1 or separate revocable per-agent credentials.

## QR/setup design

The QR code contains only the unlisted setup-page URL. It never contains the private bearer token. The setup page builds configuration snippets entirely in browser memory and does not send or store the entered token.

This is deliberate: a QR image is easy to photograph or forward. Long-lived credentials must not be embedded in it.

## Hermes setup

After the production token is configured:

```bash
hermes mcp add casino-night \
  --url https://www.coastlinecollegefoundation.com/mcp/casino-night-planning \
  --header "Authorization: Bearer <private token>" \
  --header "X-Agent-Name: Hermes"
hermes mcp test casino-night
```

Restart the gateway or use `/reload-mcp` so newly discovered tools become available.

## Generic HTTP MCP configuration

```json
{
  "mcpServers": {
    "casino-night": {
      "url": "https://www.coastlinecollegefoundation.com/mcp/casino-night-planning",
      "headers": {
        "Authorization": "Bearer <private token>",
        "X-Agent-Name": "My planning agent"
      }
    }
  }
}
```

Client configuration formats differ; use the setup page to generate a copyable snippet, then adapt the wrapper key if the client expects `mcp_servers` or another name.

## Token rotation/revocation

1. Generate a new high-entropy token (at least 32 random bytes).
2. Replace `CASINO_PLANNING_MCP_TOKEN` in Render.
3. Redeploy/restart the service.
4. Replace the token in each authorized client.
5. Restart/reload MCP clients.
6. Verify the old token returns 401 and the new token lists tools.

The server reads the environment value at process start. Rotation invalidates old credentials after restart; each request is authenticated, including established MCP sessions.

## Security boundaries

- Do not enter confidential donor, payment, student, or personnel data.
- The bearer token is equivalent to action-board write access.
- Keep the token out of QR codes, screenshots, chat messages, source control, logs, and URLs.
- The setup page and planning page are unlisted/noindex, not private.
- The legacy browser-facing Planning API remains an existing separate surface; this MCP implementation does not make that API more public or place its mutation routes behind the MCP token.
- DNS rebinding protection is enabled with an explicit host allowlist.
- Archive/delete and arbitrary database operations are not MCP tools.

## Verification

Automated protocol coverage in `server/planning-mcp.test.ts` verifies:

- missing token is rejected;
- all seven tools are discoverable over Streamable HTTP;
- authenticated create succeeds;
- revision-safe update succeeds;
- stale revision update fails;
- completion succeeds;
- actor attribution is persisted in activity history.

Local production smoke verification must also confirm the setup route, QR SVG, MCP status, real client initialization, tool discovery, create, complete, read-back, and cleanup.
