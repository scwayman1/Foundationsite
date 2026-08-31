import crypto from "crypto";
import fs from "fs";
import path from "path";
import initSqlJs, { type Database } from "sql.js";

export type PlanningRecord = {
  id: number;
  kind: string;
  workstream: string;
  title: string;
  data: Record<string, unknown>;
  sortOrder: number;
  revision: number;
  createdAt: string;
  updatedAt: string;
};

export type PlanningActivity = {
  id: string;
  action: string;
  description: string;
  recordKind: string | null;
  recordId: number | null;
  actor: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  createdAt: string;
};

type ManusRecord = Omit<PlanningRecord, "data" | "revision"> & { data: string };
type ManusActivity = {
  id: number;
  action: string;
  description: string;
  recordKind?: string | null;
  recordId?: number | null;
  createdAt: string;
};
type ManusSnapshot = { records?: ManusRecord[]; activity?: ManusActivity[] };

type PlanningStoreOptions = {
  dbPath: string;
  seedPath?: string;
  now?: () => string;
  randomId?: () => string;
};

const allowedKinds = new Set([
  "workstream",
  "contract",
  "action",
  "accomplishment",
  "role",
  "runOfShow",
  "communication",
  "honoree",
]);

const schema = `
  CREATE TABLE IF NOT EXISTS planning_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kind TEXT NOT NULL,
    workstream TEXT NOT NULL,
    title TEXT NOT NULL,
    data_json TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 999,
    revision INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived_at TEXT
  );
  CREATE INDEX IF NOT EXISTS planning_records_kind ON planning_records (kind, archived_at, sort_order, id);
  CREATE TABLE IF NOT EXISTS planning_activity (
    sequence INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT NOT NULL UNIQUE,
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    record_kind TEXT,
    record_id INTEGER,
    actor TEXT NOT NULL,
    before_json TEXT,
    after_json TEXT,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS planning_activity_created ON planning_activity (sequence DESC);
  CREATE TABLE IF NOT EXISTS planning_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`;

function rows(db: Database, query: string, params: Array<string | number | null> = []) {
  const statement = db.prepare(query);
  try {
    statement.bind(params);
    const result: Record<string, unknown>[] = [];
    while (statement.step()) result.push(statement.getAsObject());
    return result;
  } finally {
    statement.free();
  }
}

function parseObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  if (typeof value !== "string") return {};
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function nullableObject(value: unknown): Record<string, unknown> | null {
  if (value == null || value === "") return null;
  return parseObject(value);
}

function recordFromRow(row: Record<string, unknown>): PlanningRecord {
  return {
    id: Number(row.id),
    kind: String(row.kind),
    workstream: String(row.workstream),
    title: String(row.title),
    data: parseObject(row.data_json),
    sortOrder: Number(row.sort_order),
    revision: Number(row.revision),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function activityFromRow(row: Record<string, unknown>): PlanningActivity {
  return {
    id: String(row.event_id),
    action: String(row.action),
    description: String(row.description),
    recordKind: row.record_kind == null ? null : String(row.record_kind),
    recordId: row.record_id == null ? null : Number(row.record_id),
    actor: String(row.actor),
    before: nullableObject(row.before_json),
    after: nullableObject(row.after_json),
    createdAt: String(row.created_at),
  };
}

function persistDatabase(db: Database, dbPath: string) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const tempPath = `${dbPath}.${process.pid}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  fs.writeFileSync(tempPath, Buffer.from(db.export()), { mode: 0o600 });
  const file = fs.openSync(tempPath, "r");
  try { fs.fsyncSync(file); } finally { fs.closeSync(file); }
  fs.renameSync(tempPath, dbPath);
  fs.chmodSync(dbPath, 0o600);
  const directory = fs.openSync(path.dirname(dbPath), "r");
  try { fs.fsyncSync(directory); } finally { fs.closeSync(directory); }
}

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanData(value: unknown) {
  const data = parseObject(value);
  const encoded = JSON.stringify(data);
  if (encoded.length > 75_000) throw new Error("planning_data_too_large");
  return data;
}

function readSeed(seedPath?: string): ManusSnapshot | null {
  if (!seedPath || !fs.existsSync(seedPath)) return null;
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(seedPath, "utf8"));
    return parsed && typeof parsed === "object" ? parsed as ManusSnapshot : null;
  } catch {
    return null;
  }
}

export class PlanningStore {
  private readonly dbPath: string;
  private readonly seedPath?: string;
  private readonly now: () => string;
  private readonly randomId: () => string;
  private dbPromise: Promise<Database> | undefined;
  private writeQueue: Promise<unknown> = Promise.resolve();

  constructor(options: PlanningStoreOptions) {
    this.dbPath = options.dbPath;
    this.seedPath = options.seedPath;
    this.now = options.now || (() => new Date().toISOString());
    this.randomId = options.randomId || (() => crypto.randomBytes(12).toString("hex"));
  }

  async initialize() { await this.database(); }

  private database() {
    if (!this.dbPromise) {
      this.dbPromise = (async () => {
        fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
        const SQL = await initSqlJs();
        const db = fs.existsSync(this.dbPath) ? new SQL.Database(fs.readFileSync(this.dbPath)) : new SQL.Database();
        db.run(schema);
        this.migrateSeed(db);
        persistDatabase(db, this.dbPath);
        return db;
      })();
      this.dbPromise.catch(() => { this.dbPromise = undefined; });
    }
    return this.dbPromise;
  }

  private migrateSeed(db: Database) {
    const seed = readSeed(this.seedPath);
    if (!seed) return;
    const fingerprint = crypto.createHash("sha256").update(JSON.stringify(seed)).digest("hex");
    const migrated = rows(db, "SELECT value FROM planning_meta WHERE key = 'manus_seed_sha256'");
    const recordCount = Number(rows(db, "SELECT COUNT(*) AS count FROM planning_records")[0]?.count || 0);
    if (migrated.length || recordCount) return;

    db.run("BEGIN IMMEDIATE TRANSACTION");
    try {
      for (const source of seed.records || []) {
        if (!allowedKinds.has(source.kind)) continue;
        const title = cleanText(source.title, 500);
        if (!title) continue;
        db.run(`INSERT INTO planning_records
          (id, kind, workstream, title, data_json, sort_order, revision, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`, [
          source.id,
          source.kind,
          cleanText(source.workstream, 120),
          title,
          JSON.stringify(cleanData(source.data)),
          Number.isFinite(source.sortOrder) ? source.sortOrder : 999,
          source.createdAt,
          source.updatedAt,
        ]);
      }
      for (const source of seed.activity || []) {
        db.run(`INSERT OR IGNORE INTO planning_activity
          (event_id, action, description, record_kind, record_id, actor, before_json, after_json, created_at)
          VALUES (?, ?, ?, ?, ?, 'Manus migration', NULL, NULL, ?)`, [
          `manus_${source.id}`,
          source.action || "imported",
          source.description || "Imported activity from the former planning workspace.",
          source.recordKind || null,
          source.recordId || null,
          source.createdAt,
        ]);
      }
      db.run("INSERT INTO planning_meta (key, value) VALUES ('manus_seed_sha256', ?)", [fingerprint]);
      db.run("INSERT INTO planning_meta (key, value) VALUES ('manus_seed_imported_at', ?)", [this.now()]);
      db.run("COMMIT");
    } catch (error) {
      try { db.run("ROLLBACK"); } catch { /* no-op */ }
      throw error;
    }
  }

  private async write<T>(operation: (db: Database) => T) {
    const queued = this.writeQueue.then(async () => {
      const db = await this.database();
      db.run("BEGIN IMMEDIATE TRANSACTION");
      try {
        const result = operation(db);
        db.run("COMMIT");
        persistDatabase(db, this.dbPath);
        return result;
      } catch (error) {
        try { db.run("ROLLBACK"); } catch { /* no-op */ }
        db.close();
        this.dbPromise = undefined;
        throw error;
      }
    });
    this.writeQueue = queued.catch(() => undefined);
    return queued;
  }

  async snapshot() {
    const db = await this.database();
    return {
      records: rows(db, `SELECT id, kind, workstream, title, data_json, sort_order, revision, created_at, updated_at
        FROM planning_records WHERE archived_at IS NULL ORDER BY kind, sort_order, id`).map(recordFromRow),
      activity: rows(db, `SELECT event_id, action, description, record_kind, record_id, actor,
        before_json, after_json, created_at FROM planning_activity ORDER BY sequence DESC LIMIT 250`).map(activityFromRow),
      meta: {
        storage: "sqlite",
        durability: "persistent-disk",
        generatedAt: this.now(),
      },
    };
  }

  async health() {
    const db = await this.database();
    const counts = rows(db, `SELECT
      SUM(CASE WHEN archived_at IS NULL THEN 1 ELSE 0 END) AS active_records,
      SUM(CASE WHEN archived_at IS NOT NULL THEN 1 ELSE 0 END) AS archived_records
      FROM planning_records`)[0] || {};
    const activity = rows(db, "SELECT COUNT(*) AS count FROM planning_activity")[0] || {};
    return {
      ok: true,
      storage: "sqlite",
      activeRecords: Number(counts.active_records || 0),
      archivedRecords: Number(counts.archived_records || 0),
      activityEvents: Number(activity.count || 0),
    };
  }

  async create(input: { kind: unknown; workstream?: unknown; title: unknown; data?: unknown; sortOrder?: unknown; actor?: unknown }) {
    const kind = cleanText(input.kind, 40);
    const title = cleanText(input.title, 500);
    if (!allowedKinds.has(kind) || !title) throw new Error("invalid_planning_record");
    const data = cleanData(input.data);
    const actor = cleanText(input.actor, 120) || "Committee member";
    return this.write((db) => {
      const now = this.now();
      db.run(`INSERT INTO planning_records
        (kind, workstream, title, data_json, sort_order, revision, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 1, ?, ?)`, [
        kind,
        cleanText(input.workstream, 120),
        title,
        JSON.stringify(data),
        Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 999,
        now,
        now,
      ]);
      const id = Number(rows(db, "SELECT last_insert_rowid() AS id")[0]?.id);
      const after = recordFromRow(rows(db, "SELECT * FROM planning_records WHERE id = ?", [id])[0]);
      this.recordEvent(db, "created", `Created ${kind}: ${title}`, after, actor, null, after);
      return after;
    });
  }

  async update(id: number, input: { title?: unknown; workstream?: unknown; data?: unknown; sortOrder?: unknown; revision?: unknown; actor?: unknown }) {
    return this.write((db) => {
      const row = rows(db, "SELECT * FROM planning_records WHERE id = ? AND archived_at IS NULL", [id])[0];
      if (!row) throw new Error("planning_record_not_found");
      const before = recordFromRow(row);
      if (Number.isInteger(input.revision) && Number(input.revision) !== before.revision) throw new Error("planning_revision_conflict");
      const title = input.title === undefined ? before.title : cleanText(input.title, 500);
      if (!title) throw new Error("invalid_planning_record");
      const workstream = input.workstream === undefined ? before.workstream : cleanText(input.workstream, 120);
      const data = input.data === undefined ? before.data : cleanData(input.data);
      const sortOrder = input.sortOrder === undefined ? before.sortOrder : Number(input.sortOrder);
      const updatedAt = this.now();
      db.run(`UPDATE planning_records SET title = ?, workstream = ?, data_json = ?, sort_order = ?,
        revision = revision + 1, updated_at = ? WHERE id = ?`, [
        title,
        workstream,
        JSON.stringify(data),
        Number.isFinite(sortOrder) ? sortOrder : before.sortOrder,
        updatedAt,
        id,
      ]);
      const after = recordFromRow(rows(db, "SELECT * FROM planning_records WHERE id = ?", [id])[0]);
      this.recordEvent(db, "updated", `Updated ${after.kind}: ${after.title}`, after, cleanText(input.actor, 120) || "Committee member", before, after);
      return after;
    });
  }

  async archive(id: number, actorValue?: unknown) {
    return this.write((db) => {
      const row = rows(db, "SELECT * FROM planning_records WHERE id = ? AND archived_at IS NULL", [id])[0];
      if (!row) throw new Error("planning_record_not_found");
      const before = recordFromRow(row);
      const archivedAt = this.now();
      db.run("UPDATE planning_records SET archived_at = ?, updated_at = ?, revision = revision + 1 WHERE id = ?", [archivedAt, archivedAt, id]);
      this.recordEvent(db, "archived", `Archived ${before.kind}: ${before.title}`, before, cleanText(actorValue, 120) || "Committee member", before, null);
      return { ok: true, id, archivedAt };
    });
  }

  private recordEvent(db: Database, action: string, description: string, record: PlanningRecord, actor: string, before: PlanningRecord | null, after: PlanningRecord | null) {
    db.run(`INSERT INTO planning_activity
      (event_id, action, description, record_kind, record_id, actor, before_json, after_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      `evt_${this.randomId()}`,
      action,
      description,
      record.kind,
      record.id,
      actor,
      before ? JSON.stringify(before) : null,
      after ? JSON.stringify(after) : null,
      this.now(),
    ]);
  }
}
