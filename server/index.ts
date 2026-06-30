import express from "express";
import { createServer } from "http";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type NamingPolicyUser = { id: string; name: string; role: string };
type NamingPolicySection = {
  id: string;
  doc: string;
  title: string;
  status: string;
  owner: string;
  collaborators?: string[];
  risk: string;
  currentText: string;
  proposedText: string;
  rationale: string;
};
type NamingPolicyDb = {
  meta: { project: string; version: number; updatedAt: string; persistence?: string };
  users: NamingPolicyUser[];
  policySections: NamingPolicySection[];
  proposals: Array<Record<string, unknown>>;
  comments: Array<Record<string, unknown>>;
  events: Array<Record<string, unknown>>;
  snapshots: Array<Record<string, unknown>>;
  presence: Array<Record<string, unknown>>;
};

const namingPolicyClients = new Set<express.Response>();
const namingPolicyDbPath = process.env.NAMING_POLICY_DB || path.resolve(process.cwd(), "data", "naming-policy-db.json");

function namingNow() {
  return new Date().toISOString();
}

function namingId(prefix: string) {
  return `${prefix}_${crypto.randomBytes(5).toString("hex")}`;
}

function namingSeed(): NamingPolicyDb {
  return {
    meta: {
      project: "CCCD BP/AP 6620 Naming Policy Collaborative Workspace",
      version: 1,
      updatedAt: namingNow(),
      persistence: "Append-only event log plus current-state JSON database. Use NAMING_POLICY_DB on a persistent disk or external database for hard production durability.",
    },
    users: [
      { id: "scott", name: "Scott Wayman", role: "Coastline College Foundation" },
      { id: "ryan-cook", name: "Ryan Cook", role: "Coast District Foundation" },
      { id: "jennifer", name: "Jennifer Mower", role: "Golden West College Foundation" },
      { id: "patricia", name: "Patricia Falzon", role: "Orange Coast College Foundation" },
      { id: "julie", name: "Julie Clevenger", role: "Director, Chancellor Office Operations" },
    ],
    policySections: [
      { id: "bp-authority", doc: "BP 6620", title: "Board authority and Chancellor routing", status: "needs-review", owner: "julie", risk: "Governance", currentText: "All recommendations for naming buildings, facilities, or memorials shall be submitted by the Chancellor to the Board for consideration. The Chancellor shall develop administrative procedures necessary to administer this Policy.", proposedText: "All recommendations for naming District buildings, facilities, interior spaces, exterior spaces, programs, collections, or other naming opportunities shall be submitted through the Chancellor to the Board of Trustees for consideration. The Chancellor shall maintain administrative procedures that define eligibility, gift thresholds, review evidence, term length, revocation, stewardship, and donor-recognition responsibilities.", rationale: "Expands beyond buildings/facilities and makes procedures operational enough for advancement teams." },
      { id: "ap-scope", doc: "AP 6620", title: "Scope of naming opportunities", status: "drafting", owner: "scott", risk: "Revenue / clarity", currentText: "Final authority includes buildings; major portions of buildings; College roads and access routes; athletic fields; areas of assembly or activity; plazas, dining commons, and other areas of campus circulation; and all other highly visible facilities and properties.", proposedText: "Naming opportunities may include buildings, major portions of buildings, rooms, laboratories, studios, galleries, lecture halls, conference rooms, athletic and recreation facilities, outdoor spaces, plazas, student-support centers, programs, scholarships, collections, funds, technology-enabled spaces, and other visible or mission-critical assets approved through the District process.", rationale: "Makes the policy usable for a modern naming menu, not only capital facilities." },
      { id: "criteria-gift", doc: "AP 6620", title: "Gift-based naming criteria", status: "needs-review", owner: "patricia", risk: "Donor fairness", currentText: "A name may honor an individual or group who has made a significant material donation.", proposedText: "When a naming recommendation is based on a gift, the gift should be significant relative to the cost, strategic value, visibility, operating impact, or philanthropic purpose of the named opportunity. Gift thresholds may be documented in a District naming schedule or approved campaign plan and may vary by campus, asset type, term length, and donor-stewardship obligation.", rationale: "Allows defensible thresholds without hard-coding every price in Board policy." },
      { id: "term-limits", doc: "AP 6620", title: "Finite term naming rights", status: "proposed", owner: "jennifer", risk: "Stewardship", currentText: "The current AP does not clearly distinguish permanent honorary names from time-limited philanthropic naming rights.", proposedText: "Naming rights may be approved as permanent, long-term, or time-limited. Term-limited naming should specify the duration, renewal rights if any, signage responsibilities, changed-circumstance review, and the treatment of the name at the end of the term.", rationale: "Prevents accidental perpetual recognition for gifts that should be campaign/term based." },
      { id: "due-diligence", doc: "AP 6620", title: "Due diligence and reputational review", status: "needs-review", owner: "julie", risk: "Reputation", currentText: "A name must lend prestige and not detract from the District mission.", proposedText: "Before a naming recommendation is advanced, the responsible College or District office shall complete reasonable due diligence addressing reputational risk, donor intent, source-of-funds concerns where relevant, legal restrictions, conflicts of interest, and alignment with District values. Material concerns shall be summarized for Chancellor review before Board consideration.", rationale: "Makes prestige/reputation review actionable and auditable." },
      { id: "revocation", doc: "AP 6620", title: "Revocation / changed circumstances", status: "drafting", owner: "julie", risk: "Legal / governance", currentText: "The current AP does not provide a robust revocation or changed-circumstances process.", proposedText: "The Board may remove or modify an approved name if continued recognition would materially harm the District or College, if gift obligations are not fulfilled, if information later becomes known that would have affected approval, or if the named asset is demolished, repurposed, relocated, substantially renovated, or no longer used for its original purpose. The Chancellor shall recommend an appropriate process for notice, review, and documentation.", rationale: "Protects the District without forcing ad hoc crisis governance." },
      { id: "stewardship", doc: "AP 6620", title: "Stewardship and records", status: "proposed", owner: "scott", risk: "Operations", currentText: "The current policy is light on post-approval stewardship and records.", proposedText: "The District and Colleges shall maintain records of approved namings, gift agreements or supporting documentation, term lengths, signage obligations, stewardship commitments, renewal dates, and any restrictions or conditions. Advancement and business offices should coordinate on donor recognition, facilities changes, and Board records.", rationale: "Turns naming policy into an operating system for donor trust." },
    ],
    proposals: [],
    comments: [],
    events: [],
    snapshots: [],
    presence: [],
  };
}

function ensureNamingPolicyDefaults(db: NamingPolicyDb) {
  const persistenceNotice = "Append-only event log plus current-state JSON database. Use NAMING_POLICY_DB on a persistent disk or external database for hard production durability.";
  if (!db.meta.persistence || db.meta.persistence.includes("service persistent disk")) db.meta.persistence = persistenceNotice;
  const requiredUsers: NamingPolicyUser[] = [
    { id: "scott", name: "Scott Wayman", role: "Coastline College Foundation" },
    { id: "ryan-cook", name: "Ryan Cook", role: "Coast District Foundation" },
  ];
  for (const user of requiredUsers) {
    const existing = db.users.find((item) => item.id === user.id || item.name === user.name);
    if (existing) Object.assign(existing, user);
    else db.users.splice(1, 0, user);
  }
  for (const section of db.policySections) {
    if (!Array.isArray(section.collaborators) || section.collaborators.length === 0) {
      section.collaborators = Array.from(new Set([section.owner].filter(Boolean)));
    }
  }
  return db;
}

function readNamingDb(): NamingPolicyDb {
  fs.mkdirSync(path.dirname(namingPolicyDbPath), { recursive: true });
  if (!fs.existsSync(namingPolicyDbPath)) writeNamingDb(namingSeed(), false);
  const db = JSON.parse(fs.readFileSync(namingPolicyDbPath, "utf8")) as NamingPolicyDb;
  const beforeUsers = JSON.stringify(db.users);
  const beforeSections = JSON.stringify(db.policySections);
  const beforePersistence = db.meta.persistence;
  ensureNamingPolicyDefaults(db);
  if (beforeUsers !== JSON.stringify(db.users) || beforeSections !== JSON.stringify(db.policySections) || beforePersistence !== db.meta.persistence) writeNamingDb(db, false);
  return db;
}

function writeNamingDb(db: NamingPolicyDb, emit = true) {
  fs.mkdirSync(path.dirname(namingPolicyDbPath), { recursive: true });
  db.meta.updatedAt = namingNow();
  const tempPath = `${namingPolicyDbPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(db, null, 2));
  fs.renameSync(tempPath, namingPolicyDbPath);
  if (emit) broadcastNamingPolicy({ type: "state", at: namingNow(), meta: db.meta });
}

function broadcastNamingPolicy(payload: Record<string, unknown>) {
  const message = `event: message\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of Array.from(namingPolicyClients)) {
    try {
      client.write(message);
    } catch {
      namingPolicyClients.delete(client);
    }
  }
}

function recordNamingEvent(db: NamingPolicyDb, type: string, actor: string, detail: Record<string, unknown>) {
  const event = { id: namingId("evt"), type, actor: actor || "anonymous", at: namingNow(), detail };
  db.events.unshift(event);
  db.events = db.events.slice(0, 300);
  broadcastNamingPolicy({ type: "event", event });
  return event;
}

function namingMarkdown(db: NamingPolicyDb) {
  const lines = ["# BP/AP 6620 Naming Policy Board Packet Export", "", `Exported: ${namingNow()}`, ""];
  for (const section of db.policySections) {
    lines.push(`## ${section.doc}: ${section.title}`, "", `Status: ${section.status}  `, `Lead: ${section.owner}  `, `Working group: ${(section.collaborators || []).join(", ") || "open to all reviewers"}  `, `Risk: ${section.risk}`, "", "### Current", section.currentText, "", "### Proposed", section.proposedText, "", "### Rationale", section.rationale, "");
    const comments = db.comments.filter((comment) => comment.sectionId === section.id);
    if (comments.length) {
      lines.push("### Comments");
      for (const comment of comments) lines.push(`- ${comment.author}: ${comment.body}`);
      lines.push("");
    }
  }
  return lines.join("\n");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON request bodies
  app.use(express.json());

  // ── Hidden Naming Policy Studio API ──
  app.get("/api/naming-policy/events", (req, res) => {
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
    });
    res.write(`event: message\ndata: ${JSON.stringify({ type: "hello", at: namingNow() })}\n\n`);
    namingPolicyClients.add(res);
    req.on("close", () => namingPolicyClients.delete(res));
  });

  app.get("/api/naming-policy/health", (_req, res) => {
    res.json({ ok: true, clients: namingPolicyClients.size, db: namingPolicyDbPath, at: namingNow() });
  });

  app.get("/api/naming-policy/state", (_req, res) => {
    res.json(readNamingDb());
  });

  app.get("/api/naming-policy/export.md", (_req, res) => {
    res.type("text/markdown; charset=utf-8").send(namingMarkdown(readNamingDb()));
  });

  app.post("/api/naming-policy/presence", (req, res) => {
    const db = readNamingDb();
    const person = {
      id: req.body.id || namingId("user"),
      name: req.body.name || "Reviewer",
      focus: req.body.focus || "reviewing",
      color: req.body.color || "#006eb6",
      at: namingNow(),
    };
    db.presence = [person, ...db.presence.filter((entry) => entry.id !== person.id)].slice(0, 12);
    recordNamingEvent(db, "presence", String(person.name), { focus: person.focus });
    writeNamingDb(db);
    broadcastNamingPolicy({ type: "presence", presence: db.presence });
    res.json(person);
  });

  app.patch("/api/naming-policy/sections/:id", (req, res) => {
    const db = readNamingDb();
    const section = db.policySections.find((item) => item.id === req.params.id);
    if (!section) return res.status(404).json({ error: "section not found" });
    const changes: Record<string, { before: unknown; after: unknown }> = {};
    for (const key of ["status", "owner", "proposedText", "rationale", "risk"] as const) {
      if (key in req.body && section[key] !== req.body[key]) {
        changes[key] = { before: section[key], after: req.body[key] };
        section[key] = req.body[key];
      }
    }
    if ("collaborators" in req.body) {
      const nextCollaborators = Array.isArray(req.body.collaborators) ? Array.from(new Set(req.body.collaborators.map(String))) : [];
      if (JSON.stringify(section.collaborators || []) !== JSON.stringify(nextCollaborators)) {
        changes.collaborators = { before: section.collaborators || [], after: nextCollaborators };
        section.collaborators = nextCollaborators;
      }
    }
    recordNamingEvent(db, "section.updated", req.body.actor || "anonymous", { sectionId: section.id, title: section.title, changes, reason: req.body.changeReason || null });
    writeNamingDb(db);
    res.json(section);
  });

  app.post("/api/naming-policy/comments", (req, res) => {
    const db = readNamingDb();
    const comment = {
      id: namingId("com"),
      sectionId: req.body.sectionId,
      proposalId: req.body.proposalId || null,
      author: req.body.author || "anonymous",
      kind: req.body.kind || "Note",
      body: req.body.body || "",
      resolved: false,
      createdAt: namingNow(),
    };
    db.comments.unshift(comment);
    recordNamingEvent(db, "comment.created", String(comment.author), { sectionId: comment.sectionId, proposalId: comment.proposalId, kind: comment.kind });
    writeNamingDb(db);
    res.status(201).json(comment);
  });

  app.post("/api/naming-policy/proposals", (req, res) => {
    const db = readNamingDb();
    const proposal = {
      id: namingId("prop"),
      sectionId: req.body.sectionId,
      author: req.body.author || "anonymous",
      title: req.body.title || "Untitled proposal",
      body: req.body.body || "",
      status: "open",
      votes: [],
      createdAt: namingNow(),
      updatedAt: namingNow(),
    };
    db.proposals.unshift(proposal);
    recordNamingEvent(db, "proposal.created", String(proposal.author), { proposalId: proposal.id, sectionId: proposal.sectionId, title: proposal.title });
    writeNamingDb(db);
    res.status(201).json(proposal);
  });

  app.post("/api/naming-policy/snapshots", (req, res) => {
    const db = readNamingDb();
    const snapshot = {
      id: namingId("snap"),
      title: req.body.title || `Snapshot ${db.snapshots.length + 1}`,
      author: req.body.author || "anonymous",
      at: namingNow(),
      sections: db.policySections,
      proposals: db.proposals,
    };
    db.snapshots.unshift(snapshot);
    recordNamingEvent(db, "snapshot.created", String(snapshot.author), { snapshotId: snapshot.id, title: snapshot.title });
    writeNamingDb(db);
    res.status(201).json(snapshot);
  });

  // ── Contact Form API ──
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          error: "All fields are required." 
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          error: "Please provide a valid email address." 
        });
      }

      // Configure email transport
      // Uses SMTP env vars if available, otherwise falls back to a mailto link approach
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const recipientEmail = process.env.CONTACT_EMAIL || "foundation@cccd.edu";

      if (smtpHost && smtpUser && smtpPass) {
        // Full SMTP transport when credentials are configured
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Coastline College Foundation Website" <${smtpUser}>`,
          replyTo: `"${firstName} ${lastName}" <${email}>`,
          to: recipientEmail,
          subject: `New Contact Form Submission from ${firstName} ${lastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0A1628; color: white; padding: 24px 32px; border-radius: 12px 12px 0 0;">
                <h2 style="margin: 0; font-size: 20px;">New Contact Form Submission</h2>
                <p style="margin: 8px 0 0; opacity: 0.7; font-size: 14px;">Coastline College Foundation Website</p>
              </div>
              <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 120px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #475569; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; color: #1e293b; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
              </div>
            </div>
          `,
          text: `New Contact Form Submission\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        });

        console.log(`Contact form email sent to ${recipientEmail} from ${email}`);
        return res.json({ success: true, message: "Your message has been sent successfully." });
      } else {
        // Fallback: Log the submission and store it when SMTP is not configured
        console.log("──────────────────────────────────────");
        console.log("NEW CONTACT FORM SUBMISSION");
        console.log(`Name: ${firstName} ${lastName}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        console.log(`Intended recipient: ${recipientEmail}`);
        console.log("──────────────────────────────────────");

        // Still return success — the form data is captured in server logs
        // and can be forwarded manually or via a log monitoring service
        return res.json({ 
          success: true, 
          message: "Your message has been received. We will be in touch soon." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        success: false, 
        error: "Something went wrong. Please try again or email us directly at foundation@cccd.edu." 
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
