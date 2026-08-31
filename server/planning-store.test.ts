import fs from "fs";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { PlanningStore } from "./planning-store";

const temporaryDirectories: string[] = [];
function temporaryDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "planning-store-"));
  temporaryDirectories.push(directory);
  return directory;
}
afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});

function writeSeed(directory: string) {
  const seedPath = path.join(directory, "snapshot.json");
  fs.writeFileSync(seedPath, JSON.stringify({
    records: [{
      id: 42,
      kind: "action",
      workstream: "communications",
      title: "Send committee update",
      data: JSON.stringify({ owner: "Scott", status: "In progress", latestUpdate: "Drafted" }),
      sortOrder: 7,
      createdAt: "2026-08-28T18:00:00.000Z",
      updatedAt: "2026-08-28T18:30:00.000Z",
    }],
    activity: [{
      id: 9,
      action: "created",
      description: "Created an action record in the shared database.",
      recordKind: "action",
      recordId: 42,
      createdAt: "2026-08-28T18:00:00.000Z",
    }],
  }, null, 2));
  return seedPath;
}

describe("PlanningStore", () => {
  it("imports the exact Manus snapshot once without changing IDs or timestamps", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "planning.sqlite");
    const seedPath = writeSeed(directory);
    const store = new PlanningStore({ dbPath, seedPath, now: () => "2026-08-30T00:00:00.000Z" });
    const first = await store.snapshot();
    expect(first.records).toEqual([expect.objectContaining({
      id: 42,
      title: "Send committee update",
      data: { owner: "Scott", status: "In progress", latestUpdate: "Drafted" },
      createdAt: "2026-08-28T18:00:00.000Z",
      updatedAt: "2026-08-28T18:30:00.000Z",
    })]);
    expect(first.activity).toEqual([expect.objectContaining({ id: "manus_9", recordId: 42 })]);

    const restarted = new PlanningStore({ dbPath, seedPath });
    expect((await restarted.snapshot()).records).toHaveLength(1);
    expect((await restarted.snapshot()).activity).toHaveLength(1);
  });

  it("persists updates with optimistic revisions and append-only before/after audit", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "planning.sqlite");
    const seedPath = writeSeed(directory);
    const times = ["2026-08-30T01:00:00.000Z", "2026-08-30T01:00:01.000Z"];
    const store = new PlanningStore({ dbPath, seedPath, now: () => times.shift() || "2026-08-30T01:00:02.000Z", randomId: () => "update-one" });
    const current = (await store.snapshot()).records[0];
    const updated = await store.update(42, {
      revision: current.revision,
      actor: "Scott",
      data: { ...current.data, status: "Done", evidence: "Committee message sent" },
    });
    expect(updated).toMatchObject({ revision: 2, data: { status: "Done", evidence: "Committee message sent" } });
    const activity = (await store.snapshot()).activity[0];
    expect(activity).toMatchObject({ action: "updated", actor: "Scott", recordId: 42 });
    expect(activity.before?.data).toMatchObject({ status: "In progress" });
    expect(activity.after?.data).toMatchObject({ status: "Done" });

    await expect(store.update(42, { revision: 1, title: "Stale overwrite" })).rejects.toThrow("planning_revision_conflict");
    const restarted = new PlanningStore({ dbPath, seedPath });
    expect((await restarted.snapshot()).records[0]).toMatchObject({ revision: 2, data: { status: "Done" } });
  });

  it("serializes concurrent creates without losing records or activity", async () => {
    const directory = temporaryDirectory();
    const store = new PlanningStore({ dbPath: path.join(directory, "planning.sqlite") });
    await Promise.all(Array.from({ length: 10 }, (_, index) => store.create({
      kind: "action",
      title: `Action ${index}`,
      workstream: "logistics",
      data: { status: "Not started", owner: "Unassigned" },
      actor: "Test",
    })));
    const snapshot = await store.snapshot();
    expect(snapshot.records).toHaveLength(10);
    expect(snapshot.activity).toHaveLength(10);
    expect(await store.health()).toMatchObject({ activeRecords: 10, archivedRecords: 0, activityEvents: 10 });
  });

  it("archives rather than hard-deleting records and retains the audit trail", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "planning.sqlite");
    const store = new PlanningStore({ dbPath, seedPath: writeSeed(directory), randomId: () => "archive-one" });
    await store.archive(42, "Scott");
    expect((await store.snapshot()).records).toHaveLength(0);
    expect(await store.health()).toMatchObject({ activeRecords: 0, archivedRecords: 1, activityEvents: 2 });
    expect((await store.snapshot()).activity[0]).toMatchObject({ action: "archived", actor: "Scott", recordId: 42 });
  });
});
