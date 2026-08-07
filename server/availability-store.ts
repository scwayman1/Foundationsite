import crypto from "crypto";
import fs from "fs";
import path from "path";
import initSqlJs, { type Database } from "sql.js";

export type AvailabilityRecordType = "participant" | "verification";

export type AvailabilitySubmissionInput = {
  name: string;
  email: string;
  slots: string[];
  recordedAt?: string;
  submissionId?: string;
  recordType?: AvailabilityRecordType;
  source?: string;
};

export type AvailabilitySubmission = {
  sequence: number;
  submissionId: string;
  respondentId: string;
  name: string;
  email: string;
  slots: string[];
  recordedAt: string;
  recordType: AvailabilityRecordType;
  source: string;
};

export type AvailabilityLatestResponse = {
  name: string;
  slots: string[];
  updatedAt: string;
};

type LegacyAvailabilityResponse = {
  id?: string;
  name?: string;
  email?: string;
  slots?: unknown[];
  updatedAt?: string;
};

type AvailabilityStoreOptions = {
  dbPath: string;
  legacyJsonPaths?: string[];
  now?: () => string;
  randomId?: () => string;
};

const schema = `
  CREATE TABLE IF NOT EXISTS availability_submissions (
    sequence INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id TEXT NOT NULL UNIQUE,
    respondent_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    slots_json TEXT NOT NULL,
    recorded_at TEXT NOT NULL,
    record_type TEXT NOT NULL CHECK (record_type IN ('participant', 'verification')),
    source TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS availability_submissions_respondent
    ON availability_submissions (record_type, respondent_id, sequence DESC);
`;

function respondentId(email: string) {
  return crypto.createHash("sha256").update(email).digest("hex").slice(0, 16);
}

function parseSlots(value: unknown): string[] {
  if (typeof value !== "string") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((slot): slot is string => typeof slot === "string") : [];
  } catch {
    return [];
  }
}

function rows(db: Database, query: string, params: Array<string | number> = []) {
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

function submissionFromRow(row: Record<string, unknown>): AvailabilitySubmission {
  return {
    sequence: Number(row.sequence),
    submissionId: String(row.submission_id),
    respondentId: String(row.respondent_id),
    name: String(row.name),
    email: String(row.email),
    slots: parseSlots(row.slots_json),
    recordedAt: String(row.recorded_at),
    recordType: String(row.record_type) as AvailabilityRecordType,
    source: String(row.source),
  };
}

function persistDatabase(db: Database, dbPath: string) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const tempPath = `${dbPath}.${process.pid}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  fs.writeFileSync(tempPath, Buffer.from(db.export()), { mode: 0o600 });
  const file = fs.openSync(tempPath, "r");
  try {
    fs.fsyncSync(file);
  } finally {
    fs.closeSync(file);
  }
  fs.renameSync(tempPath, dbPath);
  fs.chmodSync(dbPath, 0o600);
  const directory = fs.openSync(path.dirname(dbPath), "r");
  try {
    fs.fsyncSync(directory);
  } finally {
    fs.closeSync(directory);
  }
}

function readLegacy(pathname: string): LegacyAvailabilityResponse[] {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(pathname, "utf8"));
    return Array.isArray(parsed) ? parsed as LegacyAvailabilityResponse[] : [];
  } catch {
    return [];
  }
}

export class AvailabilityStore {
  private readonly dbPath: string;
  private readonly legacyJsonPaths: string[];
  private readonly now: () => string;
  private readonly randomId: () => string;
  private dbPromise: Promise<Database> | undefined;
  private writeQueue: Promise<unknown> = Promise.resolve();

  constructor(options: AvailabilityStoreOptions) {
    this.dbPath = options.dbPath;
    this.legacyJsonPaths = options.legacyJsonPaths || [];
    this.now = options.now || (() => new Date().toISOString());
    this.randomId = options.randomId || (() => crypto.randomBytes(12).toString("hex"));
  }

  async initialize() {
    await this.database();
  }

  private database() {
    if (!this.dbPromise) {
      this.dbPromise = (async () => {
        fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
        const SQL = await initSqlJs();
        const db = fs.existsSync(this.dbPath)
          ? new SQL.Database(fs.readFileSync(this.dbPath))
          : new SQL.Database();
        db.run(schema);
        this.migrateLegacy(db);
        persistDatabase(db, this.dbPath);
        return db;
      })();
      this.dbPromise.catch(() => { this.dbPromise = undefined; });
    }
    return this.dbPromise;
  }

  private migrateLegacy(db: Database) {
    for (const legacyPath of this.legacyJsonPaths) {
      for (const item of readLegacy(legacyPath)) {
        const name = typeof item.name === "string" ? item.name.trim() : "";
        const email = typeof item.email === "string" ? item.email.trim().toLowerCase() : "";
        const slots = Array.isArray(item.slots) ? item.slots.filter((slot): slot is string => typeof slot === "string") : [];
        const recordedAt = typeof item.updatedAt === "string" && !Number.isNaN(Date.parse(item.updatedAt))
          ? item.updatedAt
          : "";
        if (!name || !email || !slots.length || !recordedAt) continue;
        const fingerprint = crypto.createHash("sha256")
          .update(JSON.stringify({ id: item.id, name, email, slots, recordedAt }))
          .digest("hex")
          .slice(0, 24);
        const submissionId = `legacy_${fingerprint}`;
        const alreadyMigrated = rows(db, "SELECT 1 AS found FROM availability_submissions WHERE submission_id = ?", [submissionId]);
        if (alreadyMigrated.length) continue;
        db.run(`INSERT INTO availability_submissions
          (submission_id, respondent_id, name, email, slots_json, recorded_at, record_type, source)
          VALUES (?, ?, ?, ?, ?, ?, 'participant', 'legacy_json')`, [
          submissionId,
          respondentId(email),
          name,
          email,
          JSON.stringify(slots),
          recordedAt,
        ]);
      }
    }
  }

  async record(input: AvailabilitySubmissionInput) {
    const operation = this.writeQueue.then(async () => {
      const db = await this.database();
      const email = input.email.trim().toLowerCase();
      const recordType = input.recordType || "participant";
      const recordedAt = input.recordedAt || this.now();
      const submissionId = input.submissionId || this.randomId();
      const existing = rows(db, `SELECT COUNT(*) AS count FROM availability_submissions
        WHERE respondent_id = ? AND record_type = ?`, [respondentId(email), recordType]);
      const historyCount = Number(existing[0]?.count || 0) + 1;
      db.run("BEGIN IMMEDIATE TRANSACTION");
      try {
        db.run(`INSERT INTO availability_submissions
          (submission_id, respondent_id, name, email, slots_json, recorded_at, record_type, source)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
          submissionId,
          respondentId(email),
          input.name,
          email,
          JSON.stringify(input.slots),
          recordedAt,
          recordType,
          input.source || "form",
        ]);
        db.run("COMMIT");
        persistDatabase(db, this.dbPath);
      } catch (error) {
        try { db.run("ROLLBACK"); } catch { /* transaction may already be committed */ }
        db.close();
        this.dbPromise = undefined;
        throw error;
      }
      return { submissionId, recordedAt, historyCount, updated: historyCount > 1, recordType };
    });
    this.writeQueue = operation.catch(() => undefined);
    return operation;
  }

  async latest() {
    const db = await this.database();
    const latestRows = rows(db, `
      SELECT current.name, current.slots_json, current.recorded_at
      FROM availability_submissions current
      INNER JOIN (
        SELECT respondent_id, MAX(sequence) AS sequence
        FROM availability_submissions
        WHERE record_type = 'participant'
        GROUP BY respondent_id
      ) latest ON latest.sequence = current.sequence
      ORDER BY current.sequence ASC
    `);
    return latestRows.map((row): AvailabilityLatestResponse => ({
      name: String(row.name),
      slots: parseSlots(row.slots_json),
      updatedAt: String(row.recorded_at),
    }));
  }

  async history() {
    const db = await this.database();
    return rows(db, `SELECT sequence, submission_id, respondent_id, name, email, slots_json,
      recorded_at, record_type, source FROM availability_submissions ORDER BY sequence ASC`)
      .map(submissionFromRow);
  }

  async health() {
    const db = await this.database();
    const values = rows(db, `SELECT
      SUM(CASE WHEN record_type = 'participant' THEN 1 ELSE 0 END) AS participant_submissions,
      SUM(CASE WHEN record_type = 'verification' THEN 1 ELSE 0 END) AS verification_submissions,
      COUNT(DISTINCT CASE WHEN record_type = 'participant' THEN respondent_id END) AS participant_respondents
      FROM availability_submissions`)[0] || {};
    return {
      participantSubmissions: Number(values.participant_submissions || 0),
      verificationSubmissions: Number(values.verification_submissions || 0),
      responseCount: Number(values.participant_respondents || 0),
    };
  }
}
