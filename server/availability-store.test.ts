import fs from "fs";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { AvailabilityStore } from "./availability-store";

const temporaryDirectories: string[] = [];

function temporaryDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "availability-store-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("AvailabilityStore", () => {
  it("migrates exact legacy records once and preserves original timestamps", async () => {
    const directory = temporaryDirectory();
    const legacyPath = path.join(directory, "casino-night-availability.json");
    const dbPath = path.join(directory, "casino-night-availability.sqlite");
    fs.writeFileSync(legacyPath, JSON.stringify([
      {
        id: "original-id",
        name: "Existing Person",
        email: "Existing@Example.org",
        slots: ["2-10:30", "4-16:00"],
        updatedAt: "2026-08-06T21:23:50.982Z",
      },
    ], null, 2));

    const firstStore = new AvailabilityStore({ dbPath, legacyJsonPaths: [legacyPath] });
    await firstStore.initialize();
    const firstHistory = await firstStore.history();
    expect(firstHistory).toHaveLength(1);
    expect(firstHistory[0]).toMatchObject({
      name: "Existing Person",
      email: "existing@example.org",
      slots: ["2-10:30", "4-16:00"],
      recordedAt: "2026-08-06T21:23:50.982Z",
      recordType: "participant",
      source: "legacy_json",
    });

    const restartedStore = new AvailabilityStore({ dbPath, legacyJsonPaths: [legacyPath] });
    await restartedStore.initialize();
    expect(await restartedStore.history()).toEqual(firstHistory);
  });

  it("retains every update while projecting only the latest response", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "availability.sqlite");
    const ids = ["submission-one", "submission-two"];
    const times = ["2026-08-07T20:00:00.000Z", "2026-08-07T20:05:00.000Z"];
    const store = new AvailabilityStore({
      dbPath,
      randomId: () => ids.shift() || "unexpected",
      now: () => times.shift() || "unexpected",
    });

    const first = await store.record({ name: "Test Person", email: "TEST@example.org", slots: ["0-09:00"] });
    const second = await store.record({ name: "Test Person Updated", email: "test@example.org", slots: ["3-14:30"] });

    expect(first).toMatchObject({ updated: false, historyCount: 1 });
    expect(second).toMatchObject({ updated: true, historyCount: 2 });
    expect(await store.latest()).toEqual([
      { name: "Test Person Updated", slots: ["3-14:30"], updatedAt: "2026-08-07T20:05:00.000Z" },
    ]);
    expect(await store.history()).toMatchObject([
      { submissionId: "submission-one", name: "Test Person", slots: ["0-09:00"], recordedAt: "2026-08-07T20:00:00.000Z" },
      { submissionId: "submission-two", name: "Test Person Updated", slots: ["3-14:30"], recordedAt: "2026-08-07T20:05:00.000Z" },
    ]);
  });

  it("survives a restart with current state and complete history intact", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "availability.sqlite");
    const store = new AvailabilityStore({ dbPath });
    await store.record({ name: "Restart Test", email: "restart@example.org", slots: ["1-10:00"] });
    await store.record({ name: "Restart Test", email: "restart@example.org", slots: ["1-10:30"] });

    const restartedStore = new AvailabilityStore({ dbPath });
    expect(await restartedStore.latest()).toMatchObject([
      { name: "Restart Test", slots: ["1-10:30"] },
    ]);
    expect(await restartedStore.history()).toHaveLength(2);
    expect(await restartedStore.health()).toEqual({
      participantSubmissions: 2,
      verificationSubmissions: 0,
      responseCount: 1,
    });
  });

  it("keeps verification probes durable but out of participant results", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "availability.sqlite");
    const store = new AvailabilityStore({ dbPath });
    await store.record({ name: "Participant", email: "participant@example.org", slots: ["2-12:00"] });
    await store.record({ name: "Durability Probe", email: "probe@example.org", slots: ["0-08:00"], recordType: "verification" });
    await store.record({ name: "Durability Probe", email: "probe@example.org", slots: ["4-16:00"], recordType: "verification" });

    expect(await store.latest()).toMatchObject([{ name: "Participant", slots: ["2-12:00"] }]);
    expect(await store.history()).toHaveLength(3);
    expect(await store.health()).toEqual({
      participantSubmissions: 1,
      verificationSubmissions: 2,
      responseCount: 1,
    });

    const redeployedStore = new AvailabilityStore({ dbPath });
    expect(await redeployedStore.health()).toEqual({
      participantSubmissions: 1,
      verificationSubmissions: 2,
      responseCount: 1,
    });
  });

  it("serializes concurrent writes without losing submission history", async () => {
    const directory = temporaryDirectory();
    const dbPath = path.join(directory, "availability.sqlite");
    let id = 0;
    const store = new AvailabilityStore({ dbPath, randomId: () => `concurrent-${++id}` });

    await Promise.all(Array.from({ length: 12 }, (_, index) => store.record({
      name: `Concurrent ${index}`,
      email: "concurrent@example.org",
      slots: [`${index % 5}-10:00`],
    })));

    expect(await store.history()).toHaveLength(12);
    expect(await store.latest()).toHaveLength(1);
    expect((await store.health()).participantSubmissions).toBe(12);
  });
});
