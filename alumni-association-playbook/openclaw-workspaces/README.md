# OpenClaw Workspaces — Coastline College Alumni Agent Fleet

This directory contains **production-ready OpenClaw workspace files** for all 11 agents in the Coastline College Alumni Association Agent Fleet. Each agent workspace follows the standard OpenClaw file layout and can be deployed directly to an OpenClaw Gateway.

## Quick Start

### 1. Copy workspaces to your OpenClaw installation

```bash
# Copy each agent workspace to the OpenClaw workspace directory
for agent in mission-control identity intelligence network-graph storytelling engagement opportunity event-engine giving feedback career-pathways; do
  cp -r ./$agent ~/.openclaw/workspace-$agent
done
```

### 2. Apply the fleet configuration

```bash
# Merge the fleet config into your openclaw.json
# (Review and adapt the agents.list and bindings sections to your environment)
cp openclaw.json ~/.openclaw/openclaw.json
```

### 3. Register agents with OpenClaw

```bash
# Or use the CLI wizard for each agent
openclaw agents add mission-control
openclaw agents add identity
openclaw agents add intelligence
openclaw agents add network-graph
openclaw agents add storytelling
openclaw agents add engagement
openclaw agents add opportunity
openclaw agents add event-engine
openclaw agents add giving
openclaw agents add feedback
openclaw agents add career-pathways
```

### 4. Verify and start

```bash
openclaw agents list --bindings
openclaw gateway restart
openclaw channels status --probe
```

## Directory Structure

Each agent workspace contains the standard OpenClaw files:

| File | Purpose |
|------|---------|
| `SOUL.md` | Persona, tone, boundaries, and core identity |
| `AGENTS.md` | Operating instructions, responsibilities, inputs/outputs, collaboration rules, quality guards |
| `IDENTITY.md` | Agent name, emoji, and one-line vibe |
| `TOOLS.md` | Tool conventions and GradRoots integration notes |
| `HEARTBEAT.md` | Proactive loop checklist for periodic heartbeat runs |
| `BOOT.md` | Startup checklist executed on gateway restart |
| `USER.md` | Operator context (Coastline College Foundation staff) |
| `memory/` | Daily memory logs (auto-populated at runtime) |
| `skills/` | Agent-specific skills (add as needed) |

## Fleet Architecture

The fleet operates in a **4-tier hub-and-spoke topology** with Mission Control as the central orchestrator:

**Tier 1 — Orchestration:** Mission Control (routes all work, enforces governance)

**Tier 2 — Intelligence:** Identity, Intelligence, Network Graph (data enrichment, scoring, relationships)

**Tier 3 — Execution:** Storytelling, Engagement, Opportunity, Event Engine, Giving, Career Pathways (content, outreach, events, fundraising, partnerships)

**Tier 4 — Learning:** Feedback (outcome tracking, system optimization)

## Relationship to Playbook Documentation

The playbook documentation in the parent directory (`09-agents/`) contains the full strategic specifications for each agent — rich narrative documentation intended for human stakeholders and board members. The workspace files in this directory are the **machine-optimized** versions, structured for OpenClaw ingestion while preserving all operational logic from the playbook specs.

## Configuration Notes

The `openclaw.json` file includes fleet-level configuration for governance rules, communication frequency caps, proactive loop schedules, and tier architecture. Review and customize the `bindings` section to match your channel setup (WhatsApp, Discord, Telegram, etc.).
