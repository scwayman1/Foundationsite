import crypto from "crypto";
import fs from "fs";
import path from "path";
import initSqlJs, { type Database } from "sql.js";

export type PlanningRole = "owner" | "editor" | "viewer";
export type PlanningUser = {
  id: string;
  email: string;
  name: string;
  role: PlanningRole;
  status: "active" | "suspended";
  orientationComplete: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};
export type PlanningPrincipal = PlanningUser & { sessionId: string; expiresAt: string };

type Options = { dbPath: string; now?: () => string; randomToken?: () => string; persist?: typeof persist };
type DbRow = Record<string, unknown>;

const schema = `
CREATE TABLE IF NOT EXISTS auth_users (
  id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner','editor','viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended')),
  orientation_complete INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL, last_login_at TEXT
);
CREATE TABLE IF NOT EXISTS auth_invites (
  id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, email TEXT NOT NULL,
  name TEXT NOT NULL, role TEXT NOT NULL CHECK (role IN ('owner','editor','viewer')),
  invited_by TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT NOT NULL,
  used_at TEXT, revoked_at TEXT
);
CREATE INDEX IF NOT EXISTS auth_invites_email ON auth_invites(email, created_at DESC);
CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, csrf_hash TEXT NOT NULL,
  user_id TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL, revoked_at TEXT,
  FOREIGN KEY(user_id) REFERENCES auth_users(id)
);
CREATE INDEX IF NOT EXISTS auth_sessions_user ON auth_sessions(user_id, expires_at);
`;

function rows(db: Database, query: string, params: Array<string | number | null> = []) {
  const statement = db.prepare(query);
  try {
    statement.bind(params);
    const result: DbRow[] = [];
    while (statement.step()) result.push(statement.getAsObject());
    return result;
  } finally { statement.free(); }
}
function digest(value: string) { return crypto.createHash("sha256").update(value).digest("hex"); }
function normalizeEmail(value: unknown) {
  const email = typeof value === "string" ? value.trim().toLowerCase().slice(0, 180) : "";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("invalid_email");
  return email;
}
function cleanName(value: unknown) {
  const name = typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, 120) : "";
  if (!name) throw new Error("invalid_name");
  return name;
}
function role(value: unknown): PlanningRole {
  if (value === "owner" || value === "editor" || value === "viewer") return value;
  throw new Error("invalid_role");
}
function userFromRow(row: DbRow): PlanningUser {
  return {
    id: String(row.id), email: String(row.email), name: String(row.name), role: role(row.role),
    status: row.status === "suspended" ? "suspended" : "active",
    orientationComplete: Number(row.orientation_complete) === 1,
    createdAt: String(row.created_at), updatedAt: String(row.updated_at),
    lastLoginAt: row.last_login_at ? String(row.last_login_at) : null,
  };
}
function persist(db: Database, dbPath: string) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const temp = `${dbPath}.${process.pid}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  fs.writeFileSync(temp, Buffer.from(db.export()), { mode: 0o600 });
  const file = fs.openSync(temp, "r"); try { fs.fsyncSync(file); } finally { fs.closeSync(file); }
  fs.renameSync(temp, dbPath); fs.chmodSync(dbPath, 0o600);
}

export class PlanningAuthStore {
  private dbPromise?: Promise<Database>;
  private queue: Promise<unknown> = Promise.resolve();
  private readonly now: () => string;
  private readonly randomToken: () => string;
  private readonly save: typeof persist;
  constructor(private readonly options: Options) {
    this.now = options.now || (() => new Date().toISOString());
    this.randomToken = options.randomToken || (() => crypto.randomBytes(32).toString("base64url"));
    this.save = options.persist || persist;
  }
  async initialize() { await this.database(); }
  private database() {
    if (!this.dbPromise) this.dbPromise = (async () => {
      fs.mkdirSync(path.dirname(this.options.dbPath), { recursive: true });
      const SQL = await initSqlJs();
      const db = fs.existsSync(this.options.dbPath) ? new SQL.Database(fs.readFileSync(this.options.dbPath)) : new SQL.Database();
      db.run("PRAGMA foreign_keys = ON"); db.run(schema); this.save(db, this.options.dbPath); return db;
    })();
    return this.dbPromise;
  }
  private async write<T>(operation: (db: Database) => T) {
    const current = this.queue.then(async () => {
      const db = await this.database(); db.run("BEGIN IMMEDIATE TRANSACTION"); let committed = false;
      try {
        const value = operation(db); db.run("COMMIT"); committed = true; this.save(db, this.options.dbPath); return value;
      } catch (error) {
        if (!committed) { try { db.run("ROLLBACK"); } catch { /* noop */ } }
        else { try { db.close(); } finally { this.dbPromise = undefined; } }
        throw error;
      }
    });
    this.queue = current.catch(() => undefined); return current;
  }
  async hasUsers() { return Number(rows(await this.database(), "SELECT COUNT(*) count FROM auth_users")[0]?.count || 0) > 0; }
  async createInvite(input: { email: unknown; name: unknown; role: unknown; invitedBy: string; expiresHours?: number }) {
    const email = normalizeEmail(input.email); const name = cleanName(input.name); const inviteRole = role(input.role);
    const hours = Math.max(1, Math.min(168, Number(input.expiresHours) || 72));
    const token = this.randomToken(); const id = crypto.randomUUID(); const createdAt = this.now();
    const expiresAt = new Date(new Date(createdAt).valueOf() + hours * 3_600_000).toISOString();
    await this.write((db) => {
      if (rows(db, "SELECT id FROM auth_users WHERE email=?", [email])[0]) throw new Error("user_already_exists");
      db.run("UPDATE auth_invites SET revoked_at=? WHERE email=? AND used_at IS NULL AND revoked_at IS NULL", [createdAt, email]);
      db.run(`INSERT INTO auth_invites
        (id, token_hash, email, name, role, invited_by, created_at, expires_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, digest(token), email, name, inviteRole, input.invitedBy, createdAt, expiresAt]);
    });
    return { id, token, email, name, role: inviteRole, expiresAt };
  }
  async createBootstrapOwnerInvite(input: { email: unknown; name: unknown }) {
    const email = normalizeEmail(input.email); const name = cleanName(input.name);
    const token = this.randomToken(); const id = crypto.randomUUID(); const createdAt = this.now();
    const expiresAt = new Date(new Date(createdAt).valueOf() + 24 * 3_600_000).toISOString();
    await this.write((db) => {
      const userCount = Number(rows(db, "SELECT COUNT(*) count FROM auth_users")[0]?.count || 0);
      if (userCount > 0) throw new Error("bootstrap_already_completed");
      db.run("UPDATE auth_invites SET revoked_at=? WHERE invited_by='secure bootstrap' AND used_at IS NULL AND revoked_at IS NULL AND expires_at<=?", [createdAt, createdAt]);
      const active = Number(rows(db, "SELECT COUNT(*) count FROM auth_invites WHERE invited_by='secure bootstrap' AND used_at IS NULL AND revoked_at IS NULL")[0]?.count || 0);
      if (active > 0) throw new Error("bootstrap_invitation_already_exists");
      db.run(`INSERT INTO auth_invites
        (id, token_hash, email, name, role, invited_by, created_at, expires_at)
        VALUES (?, ?, ?, ?, 'owner', 'secure bootstrap', ?, ?)`, [id, digest(token), email, name, createdAt, expiresAt]);
    });
    return { id, token, email, name, role: "owner" as const, expiresAt };
  }
  async redeemInvite(tokenValue: unknown) {
    const token = typeof tokenValue === "string" ? tokenValue.trim() : "";
    if (token.length < 32) throw new Error("invalid_invite");
    return this.write((db) => {
      const now = this.now();
      const invite = rows(db, "SELECT * FROM auth_invites WHERE token_hash = ?", [digest(token)])[0];
      if (!invite || invite.used_at || invite.revoked_at || String(invite.expires_at) <= now) throw new Error("invalid_invite");
      let userRow = rows(db, "SELECT * FROM auth_users WHERE email = ?", [String(invite.email)])[0];
      if (userRow) throw new Error("invalid_invite");
      const userId = crypto.randomUUID();
      db.run(`INSERT INTO auth_users
        (id,email,name,role,status,orientation_complete,created_at,updated_at,last_login_at)
        VALUES (?,?,?,?, 'active',0,?,?,?)`, [userId, String(invite.email), String(invite.name), String(invite.role), now, now, now]);
      db.run("UPDATE auth_invites SET used_at=? WHERE id=?", [now, String(invite.id)]);
      const sessionToken = this.randomToken(); const csrfToken = this.randomToken(); const sessionId = crypto.randomUUID();
      const expiresAt = new Date(new Date(now).valueOf() + 14 * 86_400_000).toISOString();
      db.run(`INSERT INTO auth_sessions (id,token_hash,csrf_hash,user_id,created_at,expires_at,last_seen_at)
        VALUES (?,?,?,?,?,?,?)`, [sessionId, digest(sessionToken), digest(csrfToken), userId, now, expiresAt, now]);
      userRow = rows(db, "SELECT * FROM auth_users WHERE id=?", [userId])[0];
      return { user: userFromRow(userRow), sessionId, sessionToken, csrfToken, expiresAt };
    });
  }
  async authenticate(sessionToken: unknown, csrfToken?: unknown) {
    const supplied = typeof sessionToken === "string" ? sessionToken.trim() : "";
    if (supplied.length < 32) return null;
    const db = await this.database(); const now = this.now();
    const row = rows(db, `SELECT s.id session_id,s.expires_at,u.* FROM auth_sessions s
      JOIN auth_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.revoked_at IS NULL
      AND s.expires_at>? AND u.status='active'`, [digest(supplied), now])[0];
    if (!row) return null;
    if (csrfToken !== undefined) {
      const csrf = typeof csrfToken === "string" ? csrfToken.trim() : "";
      const check = rows(db, "SELECT csrf_hash FROM auth_sessions WHERE id=?", [String(row.session_id)])[0];
      if (!csrf || !check || digest(csrf) !== String(check.csrf_hash)) return null;
    }
    return { ...userFromRow(row), sessionId: String(row.session_id), expiresAt: String(row.expires_at) } as PlanningPrincipal;
  }
  async logout(sessionId: string) { await this.write((db) => db.run("UPDATE auth_sessions SET revoked_at=? WHERE id=?", [this.now(), sessionId])); }
  async completeOrientation(userId: string) {
    await this.write((db) => db.run("UPDATE auth_users SET orientation_complete=1,updated_at=? WHERE id=?", [this.now(), userId]));
  }
  async listUsers() { return rows(await this.database(), "SELECT * FROM auth_users ORDER BY created_at").map(userFromRow); }
  async listInvites() {
    return rows(await this.database(), `SELECT id,email,name,role,invited_by,created_at,expires_at,used_at,revoked_at
      FROM auth_invites ORDER BY created_at DESC LIMIT 100`);
  }
  async updateUser(id: string, input: { role?: unknown; status?: unknown }, actorId: string) {
    return this.write((db) => {
      const before = rows(db, "SELECT * FROM auth_users WHERE id=?", [id])[0]; if (!before) throw new Error("user_not_found");
      const nextRole = input.role === undefined ? role(before.role) : role(input.role);
      const status = input.status === undefined ? String(before.status) : input.status;
      if (status !== "active" && status !== "suspended") throw new Error("invalid_status");
      if (id === actorId && status === "suspended") throw new Error("cannot_suspend_self");
      if (role(before.role) === "owner" && (nextRole !== "owner" || status !== "active")) {
        const owners = Number(rows(db, "SELECT COUNT(*) count FROM auth_users WHERE role='owner' AND status='active'")[0]?.count || 0);
        if (owners <= 1) throw new Error("cannot_remove_last_owner");
      }
      const now = this.now(); db.run("UPDATE auth_users SET role=?,status=?,updated_at=? WHERE id=?", [nextRole,status,now,id]);
      if (status === "suspended") {
        db.run("UPDATE auth_sessions SET revoked_at=? WHERE user_id=? AND revoked_at IS NULL", [now,id]);
        db.run("UPDATE auth_invites SET revoked_at=? WHERE email=? AND used_at IS NULL AND revoked_at IS NULL", [now,String(before.email)]);
      }
      return userFromRow(rows(db, "SELECT * FROM auth_users WHERE id=?", [id])[0]);
    });
  }
}
