import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, GitBranch, History, Lightbulb, MessageCircle, Radio, ShieldCheck, Sparkles, Users } from "lucide-react";

type User = { id: string; name: string; role: string };
type PolicySection = {
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
type Comment = { id: string; sectionId: string; author: string; body: string; kind?: string; createdAt: string };
type Proposal = { id: string; sectionId: string; author: string; title: string; body: string; status: string; createdAt: string };
type Event = { id: string; type: string; actor: string; at: string; detail?: Record<string, unknown> };
type Presence = { id: string; name: string; focus: string; color: string; at: string };
type State = {
  meta: { project: string; updatedAt: string };
  users: User[];
  policySections: PolicySection[];
  comments: Comment[];
  proposals: Proposal[];
  events: Event[];
  snapshots: unknown[];
  presence: Presence[];
};

const API = "/api/naming-policy";
const reviewerId = `reviewer-${Math.random().toString(36).slice(2)}`;

type SectionCoach = {
  objective: string;
  decisionPoints: string[];
  riskFlags: string[];
  strategy: string;
  suggestedLanguage: string[];
  reviewerQuestions: string[];
};

const statusLabels: Record<string, string> = {
  drafting: "Drafting",
  "needs-review": "Needs Review",
  proposed: "Proposed",
  approved: "Approved",
};

const sectionCoaches: Record<string, SectionCoach> = {
  "bp-authority": {
    objective: "Keep Board authority clear while giving the Chancellor and advancement teams enough procedural room to operate consistently.",
    decisionPoints: [
      "Which naming actions must always go to the Board versus which can be managed administratively?",
      "Should Chancellor review be required before a College or Foundation advances any naming conversation externally?",
      "What evidence should accompany a Board recommendation so trustees are not approving names blindly?",
    ],
    riskFlags: ["Board-delegation ambiguity", "Inconsistent campus routing", "Policy language becoming too procedural"],
    strategy: "Keep BP 6620 principle-based. Put checklists, thresholds, and routing artifacts in AP 6620 or a supporting naming request form.",
    suggestedLanguage: [
      "The Board retains final authority for District naming actions with material visibility, philanthropic significance, or reputational impact.",
      "The Chancellor shall establish administrative procedures for review, documentation, recommendation, stewardship, and changed-circumstance review.",
    ],
    reviewerQuestions: [
      "For Chancellor's Office: Does this preserve final Board authority without slowing routine advancement work?",
      "For Foundation Directors: Is the route clear enough to use during donor conversations?",
      "For Legal: Are any delegated decisions too broad for administrative handling?",
    ],
  },
  "ap-scope": {
    objective: "Define the full universe of naming opportunities so the policy covers modern fundraising assets, not only buildings.",
    decisionPoints: [
      "Which assets require Board approval because they are highly visible or reputationally sensitive?",
      "Should programs, scholarships, funds, collections, and virtual/technology-enabled spaces be explicitly included?",
      "Should there be a separate naming menu or schedule outside AP 6620?",
    ],
    riskFlags: ["Overly narrow asset list", "Unpriced naming opportunities", "Confusion between recognition and official naming"],
    strategy: "Use AP 6620 for categories and review standards; use a separate naming schedule for gift levels and campaign-specific opportunities.",
    suggestedLanguage: [
      "Naming opportunities may include physical, programmatic, endowed, expendable, digital, or mission-critical assets approved through District process.",
      "The Chancellor or designee may maintain a naming schedule that identifies eligible assets, minimum gift expectations, term assumptions, and stewardship obligations.",
    ],
    reviewerQuestions: [
      "For advancement: What assets are missing from the current list that donors actually ask about?",
      "For facilities: Which spaces should never be named or need special review?",
      "For Board/Chancellor: Which categories require trustee approval every time?",
    ],
  },
  "criteria-gift": {
    objective: "Set defensible gift-based naming criteria without hard-coding every dollar amount into Board policy.",
    decisionPoints: [
      "Should gift thresholds be fixed, campaign-based, or determined by asset type?",
      "How should pledge fulfillment, in-kind gifts, and blended gifts be handled?",
      "What standard prevents unfair or inconsistent donor recognition across Colleges?",
    ],
    riskFlags: ["Donor fairness", "Thresholds becoming stale", "Promises made before District approval"],
    strategy: "Keep the policy standard flexible but require documented valuation, gift agreement terms, and District approval before a naming commitment is final.",
    suggestedLanguage: [
      "Gift-based naming should be significant in relation to the value, visibility, useful life, and strategic importance of the named opportunity.",
      "Gift thresholds may be documented in an approved naming schedule, campaign plan, or gift agreement and should be reviewed periodically.",
    ],
    reviewerQuestions: [
      "For Foundation Directors: What threshold flexibility do you need in active campaigns?",
      "For finance/business offices: How should pledge defaults or partial fulfillment affect naming?",
      "For Legal: Should the gift agreement control over the naming schedule if terms conflict?",
    ],
  },
  "term-limits": {
    objective: "Prevent accidental perpetual naming rights while honoring donor intent and campaign promises.",
    decisionPoints: [
      "Are names permanent by default, time-limited by default, or decided case-by-case?",
      "Should buildings, rooms, programs, funds, and temporary spaces have different default terms?",
      "What happens when a term ends, the space changes, or the donor wants renewal?",
    ],
    riskFlags: ["Accidental perpetual commitments", "Untracked expiration dates", "Signage/removal cost disputes"],
    strategy: "Let Board Policy authorize permanent or term-limited namings, while AP/gift agreements define duration, renewal, signage, and end-of-term handling.",
    suggestedLanguage: [
      "Naming rights may be permanent, long-term, or time-limited as approved by the Board and documented in the applicable gift or naming agreement.",
      "Term-limited namings should identify duration, renewal rights, signage responsibilities, and treatment of the name at expiration.",
    ],
    reviewerQuestions: [
      "For advancement: Which donor offers need term flexibility?",
      "For facilities: Who pays to install, maintain, replace, or remove signage?",
      "For Legal: What agreement terms protect the District if the asset is repurposed?",
    ],
  },
  "due-diligence": {
    objective: "Make reputation review consistent, documented, and practical before a name reaches the Board.",
    decisionPoints: [
      "What level of review is required for honorary names versus philanthropic names?",
      "Who checks conflicts, source-of-funds concerns, litigation, misconduct, or reputational issues?",
      "What concerns must be escalated to Chancellor, counsel, or closed session advice?",
    ],
    riskFlags: ["Reputational harm", "Inconsistent background checks", "Sensitive findings handled informally"],
    strategy: "Require a reasonable, documented due-diligence summary before Chancellor review, with escalation for material concerns.",
    suggestedLanguage: [
      "Before advancement, the responsible office shall complete reasonable due diligence addressing mission alignment, reputational risk, conflicts, donor intent, and legal restrictions.",
      "Material concerns shall be summarized for Chancellor review before any recommendation is placed before the Board.",
    ],
    reviewerQuestions: [
      "For Chancellor's Office: What threshold triggers legal or executive review?",
      "For Foundation Directors: What review can occur before a donor conversation becomes too formal?",
      "For Legal: What should not be written into public Board materials?",
    ],
  },
  "revocation": {
    objective: "Give the District a defensible path to remove or modify names when circumstances materially change.",
    decisionPoints: [
      "What circumstances justify removing or modifying a name?",
      "Is donor notice required, and who provides it?",
      "Does the Board need final approval for every removal or only Board-approved namings?",
    ],
    riskFlags: ["Donor dispute", "Public controversy", "Unclear Board authority during a crisis"],
    strategy: "Use high-level BP authority for removal/modification and AP procedures for notice, review, documentation, and gift-agreement coordination.",
    suggestedLanguage: [
      "The Board may remove or modify an approved name if continued recognition would materially harm the District or College or if gift obligations are not fulfilled.",
      "Changed use, demolition, relocation, substantial renovation, or newly discovered information may trigger review under administrative procedures.",
    ],
    reviewerQuestions: [
      "For Legal: What due process or notice language is necessary?",
      "For advancement: How do we preserve donor trust while protecting District discretion?",
      "For Board/Chancellor: Who speaks publicly if a revocation becomes controversial?",
    ],
  },
  "stewardship": {
    objective: "Turn approved namings into maintainable records, obligations, reminders, and donor-trust practices.",
    decisionPoints: [
      "Who owns the official naming inventory?",
      "Where are gift agreements, Board approvals, term dates, signage obligations, and renewal notes stored?",
      "How often should naming records be reviewed for expired terms, changed spaces, or stewardship commitments?",
    ],
    riskFlags: ["Lost agreement terms", "Missed renewal dates", "Facilities changes breaking donor commitments"],
    strategy: "Require a shared naming record and assign responsibility across advancement, business, facilities, and Board records functions.",
    suggestedLanguage: [
      "The District and Colleges shall maintain records of approved namings, supporting agreements, term lengths, signage obligations, renewal dates, and restrictions.",
      "Advancement, business, facilities, and Board records offices should coordinate to keep naming records current through asset changes and donor stewardship cycles.",
    ],
    reviewerQuestions: [
      "For advancement: What donor stewardship promises must be tracked?",
      "For facilities: How will space renovations trigger naming review?",
      "For records/Board office: Which approval documents must be retained permanently?",
    ],
  },
};

function statusClass(status: string) {
  if (status === "approved") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "proposed") return "bg-violet-50 text-violet-700 border-violet-200";
  if (status === "needs-review") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-sky-50 text-sky-700 border-sky-200";
}

const avatarStyles = ["bg-cyan-600", "bg-violet-600", "bg-amber-600", "bg-emerald-600", "bg-rose-600", "bg-slate-700"];
const contributionTypes = ["Language", "Question", "Concern", "Decision", "Evidence"];
const contributionGuidance: Record<string, { encouragement: string; teamView: string; prompt: string }> = {
  Language: {
    encouragement: "Great language notes help the group move from abstract agreement to usable policy wording.",
    teamView: "The team will see this as a suggested wording contribution tied to the current section.",
    prompt: "Be specific: quote the phrase, explain the replacement, and name the policy reason.",
  },
  Question: {
    encouragement: "Good questions protect the committee from approving language before the decision is actually clear.",
    teamView: "The team will see this as an open question that needs an answer before the section advances.",
    prompt: "Ask the question in a way that identifies who should answer it: Legal, Foundation, Chancellor, Board, or Facilities.",
  },
  Concern: {
    encouragement: "Concerns are useful here — this is where risk gets surfaced early instead of becoming a board-packet problem later.",
    teamView: "The team will see this as a risk flag for the section, not as a rejection of the work.",
    prompt: "State the risk, why it matters, and what would make you comfortable moving forward.",
  },
  Decision: {
    encouragement: "Decision notes are valuable because they turn discussion into a record the committee can trust later.",
    teamView: "The team will see this as a decision record or recommended next step for the section.",
    prompt: "Name the decision, the rationale, and whether anyone still needs to confirm it.",
  },
  Evidence: {
    encouragement: "Evidence makes the policy review stronger because it connects edits to facts, examples, or institutional precedent.",
    teamView: "The team will see this as supporting material for why the section should change or stay as written.",
    prompt: "Include the source, example, or document reference that supports the contribution.",
  },
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

function avatarClass(id: string) {
  const score = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatarStyles[score % avatarStyles.length];
}

function eventSummary(event: Event) {
  const detail = event.detail || {};
  if (event.type === "section.updated") {
    const changes = detail.changes && typeof detail.changes === "object" ? Object.keys(detail.changes as Record<string, unknown>) : [];
    return changes.length ? `updated ${changes.join(", ")}${detail.reason ? ` — ${String(detail.reason)}` : ""}` : "reviewed the section";
  }
  if (event.type === "comment.created") return `added ${String(detail.kind || "a contribution").toLowerCase()}`;
  if (event.type === "proposal.created") return `created suggestion “${String(detail.title || "Untitled")}"`;
  if (event.type === "snapshot.created") return `committed snapshot “${String(detail.title || "Snapshot")}"`;
  if (event.type === "presence") return `joined ${String(detail.focus || "the workspace")}`;
  return event.type.replace(/\./g, " ");
}

function coachAnswer(section: PolicySection, coach: SectionCoach, question: string) {
  const normalized = question.toLowerCase();
  const focus = normalized.includes("legal") || normalized.includes("risk") || normalized.includes("liability")
    ? "risk"
    : normalized.includes("language") || normalized.includes("rewrite") || normalized.includes("word") || normalized.includes("draft")
      ? "language"
      : normalized.includes("board") || normalized.includes("chancellor") || normalized.includes("approval")
        ? "governance"
        : normalized.includes("gift") || normalized.includes("donor") || normalized.includes("threshold") || normalized.includes("fundraising")
          ? "donor"
          : normalized.includes("bp") || normalized.includes("ap") || normalized.includes("procedure") || normalized.includes("policy")
            ? "placement"
            : "general";

  const focusAdvice: Record<string, string> = {
    risk: `Risk lens: the main flags here are ${coach.riskFlags.join(", ")}. The editor should require a documented rationale before moving this section to Proposed or Approved, and anything with legal, reputational, donor-default, or Board-authority implications should be marked Needs Review until counsel/Chancellor review is complete.`,
    language: `Drafting lens: prefer language that is specific enough to guide staff but not so detailed that Board Policy becomes an operations manual. Strong language moves for this section include: ${coach.suggestedLanguage.join(" ")}`,
    governance: `Governance lens: preserve Board authority for material naming decisions while using AP 6620 for routing, evidence, and administrative steps. For this section, the core strategy is: ${coach.strategy}`,
    donor: `Advancement lens: protect donor trust by making commitments conditional on District approval, documenting gift terms, and avoiding promises that outlive the asset, campaign, or gift agreement unless the Board explicitly approves them.`,
    placement: `BP/AP placement lens: BP should state authority, principles, and reserved Board discretion. AP should carry workflow, documentation, due diligence, stewardship, and implementation details. Schedules/forms should carry dollar amounts, checklists, and campaign-specific menus.`,
    general: `Best-practice lens: walk the reviewer through the decision points first, then revise language, then document why the committee chose that approach. Do not approve this section until each unresolved decision point has an owner or answer.`,
  };

  return [
    `Coach answer for ${section.doc}: ${section.title}`,
    "",
    focusAdvice[focus],
    "",
    `Decision points to answer now:\n- ${coach.decisionPoints.join("\n- ")}`,
    "",
    `Recommended next move: ${coach.strategy}`,
    "",
    `Questions to route to reviewers:\n- ${coach.reviewerQuestions.join("\n- ")}`,
  ].join("\n");
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: { "content-type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(await response.text());
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("json") ? response.json() : (response.text() as Promise<T>);
}

export default function NamingPolicyStudio() {
  const [state, setState] = useState<State | null>(null);
  const [selectedId, setSelectedId] = useState("bp-authority");
  const [name, setName] = useState(() => window.localStorage.getItem("namingPolicyReviewer") || "Scott Wayman");
  const [draftText, setDraftText] = useState("");
  const [rationale, setRationale] = useState("");
  const [status, setStatus] = useState("drafting");
  const [owner, setOwner] = useState("scott");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [contributionType, setContributionType] = useState("Language");
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalBody, setProposalBody] = useState("");
  const [coachQuestion, setCoachQuestion] = useState("");
  const [coachResponse, setCoachResponse] = useState("");
  const [coachOpen, setCoachOpen] = useState(false);
  const [statusReason, setStatusReason] = useState("");
  const [rightPanel, setRightPanel] = useState<"discussion" | "suggestions" | "audit">("discussion");
  const [auditFilter, setAuditFilter] = useState("All");
  const [notice, setNotice] = useState("");

  async function load() {
    const nextState = await api<State>("/state");
    setState(nextState);
  }

  useEffect(() => {
    document.title = "CCCD Naming Policy Studio";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex,nofollow,noarchive");
    load();
    const source = new EventSource(`${API}/events`);
    source.onmessage = () => load();
    return () => source.close();
  }, []);

  const selected = useMemo(
    () => state?.policySections.find((section) => section.id === selectedId) || state?.policySections[0],
    [selectedId, state],
  );

  useEffect(() => {
    if (!selected) return;
    setDraftText(selected.proposedText);
    setRationale(selected.rationale);
    setStatus(selected.status);
    setOwner(selected.owner);
    setCollaborators(selected.collaborators?.length ? selected.collaborators : [selected.owner].filter(Boolean));
    setCoachQuestion("");
    setCoachResponse("");
    setCoachOpen(false);
    setStatusReason("");
  }, [selected?.id, selected?.proposedText, selected?.rationale, selected?.status, selected?.owner, selected?.collaborators]);

  async function heartbeat(focus = "reviewing workspace") {
    window.localStorage.setItem("namingPolicyReviewer", name);
    await api("/presence", {
      method: "POST",
      body: JSON.stringify({ id: reviewerId, name, focus, color: "#006eb6" }),
    });
  }

  async function saveSection() {
    if (!selected) return;
    if (status !== selected.status && !statusReason.trim()) {
      setNotice("Add a status-change reason before saving.");
      return;
    }
    await api(`/sections/${selected.id}`, {
      method: "PATCH",
      body: JSON.stringify({ actor: name, proposedText: draftText, rationale, status, owner, collaborators, changeReason: statusReason.trim() }),
    });
    setStatusReason("");
    setNotice("Saved to the policy workspace.");
    await load();
  }

  async function changeLeadReviewer(nextOwner: string) {
    if (!selected) return;
    const nextCollaborators = Array.from(new Set([nextOwner, ...collaborators].filter(Boolean)));
    setOwner(nextOwner);
    setCollaborators(nextCollaborators);
    setNotice("Saving lead reviewer…");
    await api(`/sections/${selected.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        actor: name,
        owner: nextOwner,
        collaborators: nextCollaborators,
        changeReason: `Lead reviewer changed to ${userLabel(nextOwner)}`,
      }),
    });
    setNotice(`Lead reviewer saved: ${userLabel(nextOwner)}.`);
    await load();
  }

  async function postComment() {
    if (!selected || !comment.trim()) return;
    await api("/comments", {
      method: "POST",
      body: JSON.stringify({ sectionId: selected.id, author: name, body: comment.trim(), kind: contributionType }),
    });
    setComment("");
    setRightPanel("discussion");
    setNotice("Comment posted to this section.");
    await load();
  }

  async function createProposal() {
    if (!selected || !proposalTitle.trim() || !proposalBody.trim()) return;
    await api("/proposals", {
      method: "POST",
      body: JSON.stringify({ sectionId: selected.id, author: name, title: proposalTitle.trim(), body: proposalBody.trim() }),
    });
    setProposalTitle("");
    setProposalBody("");
    setNotice("Proposal created.");
    await load();
  }

  function askCoach(prompt?: string) {
    if (!selected || !coach) return;
    const question = (prompt || coachQuestion || "What should the editor focus on here?").trim();
    setCoachQuestion(question);
    setCoachResponse(coachAnswer(selected, coach, question));
  }

  function toggleCollaborator(userId: string) {
    setCollaborators((current) =>
      current.includes(userId) ? current.filter((id) => id !== userId) : [...current, userId],
    );
  }

  async function commitSnapshot() {
    await api("/snapshots", {
      method: "POST",
      body: JSON.stringify({ author: name, title: "Committee working snapshot" }),
    });
    setNotice("Snapshot committed.");
    await load();
  }

  const selectedComments = state?.comments.filter((item) => item.sectionId === selected?.id) || [];
  const openProposals = state?.proposals.filter((item) => item.sectionId === selected?.id) || [];
  const coach = selected ? sectionCoaches[selected.id] : undefined;
  const userLabel = (id: string) => state?.users.find((user) => user.id === id)?.name || id;
  const collaboratorLabels = collaborators.map(userLabel);
  const selectedEvents = state?.events.filter((event) => {
    const sectionId = event.detail?.sectionId;
    return !sectionId || sectionId === selected?.id;
  }) || [];
  const sectionContributors = Array.from(new Set([
    ...collaborators,
    owner,
    ...selectedComments.map((item) => (state?.users || []).find((user) => user.name === item.author)?.id || item.author),
    ...openProposals.map((item) => (state?.users || []).find((user) => user.name === item.author)?.id || item.author),
  ].filter(Boolean)));
  const auditFilters = ["All", "Comments", "Edits", "Suggestions", "Status"];
  const visibleAuditEvents = selectedEvents.filter((event) => {
    if (auditFilter === "Comments") return event.type === "comment.created";
    if (auditFilter === "Edits") return event.type === "section.updated";
    if (auditFilter === "Suggestions") return event.type === "proposal.created";
    if (auditFilter === "Status") return event.type === "section.updated" && Boolean((event.detail?.changes as Record<string, unknown> | undefined)?.status);
    return true;
  });
  const contributionConfidence = comment.trim().length > 120 ? "Strong" : comment.trim().length > 35 ? "Good start" : "Drafting";
  const contributionConfidenceCopy = contributionConfidence === "Strong"
    ? "Clear note"
    : contributionConfidence === "Good start"
      ? "Add context if helpful"
      : "Start with the policy point";

  if (!state || !selected) {
    return <div className="container py-24 text-slate-600">Loading naming policy studio…</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-8">
      <div className="container max-w-[1500px]">
        <div className="mb-5 rounded-3xl border border-sky-100 bg-white/90 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">
                <Radio size={13} /> Hidden working route · noindex
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-[#08324a] md:text-5xl">
                CCCD Naming Policy Studio
              </h1>
              <p className="mt-2 max-w-3xl text-slate-600">
                A private committee workspace for changing BP/AP 6620 together: shared section editing, parallel suggestions,
                proposed language, comments, snapshots, live audit trail, and Board-packet export.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl border border-sky-100 bg-white px-5 py-3"><b className="block text-3xl text-[#005f86]">{state.policySections.length}</b><span className="text-xs font-semibold text-slate-500">sections</span></div>
              <div className="rounded-2xl border border-sky-100 bg-white px-5 py-3"><b className="block text-3xl text-[#005f86]">{state.proposals.length}</b><span className="text-xs font-semibold text-slate-500">proposals</span></div>
              <div className="rounded-2xl border border-sky-100 bg-white px-5 py-3"><b className="block text-3xl text-[#005f86]">{state.events.length}</b><span className="text-xs font-semibold text-slate-500">events</span></div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(720px,1fr)_360px]">
          <aside className="rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-sm xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#005f86]">Reviewer</h2>
            <div className="flex gap-2">
              <input className="min-w-0 flex-1 rounded-2xl border border-sky-100 px-3 py-2 text-sm" value={name} onChange={(event) => setName(event.target.value)} />
              <button className="rounded-2xl bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-800" onClick={() => heartbeat("joined workspace")}>Join</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.presence.length ? state.presence.map((person) => (
                <span key={person.id} className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-slate-600">{person.name} · {person.focus}</span>
              )) : <span className="rounded-full border border-sky-100 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">No active reviewers yet</span>}
            </div>

            <h2 className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#005f86]">Policy sections</h2>
            <div className="space-y-2">
              {state.policySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => { setSelectedId(section.id); heartbeat(`reviewing ${section.title}`); }}
                  className={`w-full rounded-2xl border p-3 text-left transition ${section.id === selected.id ? "border-[#0096d6] bg-sky-50 shadow-sm" : "border-sky-100 bg-white hover:border-sky-200"}`}
                >
                  <b className="block text-sm text-[#08324a]">{section.doc}: {section.title}</b>
                  <span className="mt-1 block text-xs text-slate-500">{statusLabels[section.status]} · {(section.collaborators?.length ? section.collaborators : [section.owner]).map(userLabel).join(", ")} · {section.risk}</span>
                </button>
              ))}
            </div>

            <h2 className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#005f86]">Records</h2>
            <div className="grid gap-2">
              <button onClick={commitSnapshot} className="rounded-2xl bg-[#005f86] px-4 py-3 text-sm font-bold text-white">Commit Snapshot</button>
              <a href={`${API}/export.md`} target="_blank" rel="noreferrer" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-800">Board Packet Markdown</a>
            </div>
          </aside>

          <main className="rounded-3xl border border-sky-100 bg-white/95 shadow-sm">
            <div className="border-b border-sky-100 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusClass(status)}`}>{statusLabels[status] || status}</span>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-[#08324a]">{selected.doc}: {selected.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{selected.rationale}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Lead: {userLabel(owner)} · Working group: {collaboratorLabels.length ? collaboratorLabels.join(", ") : "open to all reviewers"}</p>
                </div>
                <button onClick={saveSection} className="rounded-full bg-[#005f86] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#084b67]">Save Proposed Text</button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <section className="grid gap-4 rounded-3xl border border-sky-100 bg-sky-50/40 p-4 md:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Status
                  <select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 block w-full rounded-2xl border border-sky-100 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900">
                    <option value="drafting">Drafting</option>
                    <option value="needs-review">Needs Review</option>
                    <option value="proposed">Proposed</option>
                    <option value="approved">Approved</option>
                  </select>
                </label>
                <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Lead reviewer
                  <select value={owner} onChange={(event) => changeLeadReviewer(event.target.value)} className="mt-2 block w-full rounded-2xl border border-sky-100 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900">
                    {state.users.map((user) => <option key={user.id} value={user.id}>{user.name} — {user.role}</option>)}
                  </select>
                  <span className="mt-2 block text-xs font-medium normal-case tracking-normal text-slate-500">Saves immediately and keeps the lead in the working group.</span>
                </label>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Status change reason {status !== selected.status && <span className="text-amber-700">· required</span>}
                    <input className="mt-2 block w-full rounded-2xl border border-sky-100 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900" placeholder="What prompted this status change?" value={statusReason} onChange={(event) => setStatusReason(event.target.value)} />
                  </label>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Working group — multiple reviewers can edit and suggest in tandem</h3>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {state.users.map((user) => (
                      <label key={user.id} className={`flex cursor-pointer items-start gap-2 rounded-2xl border p-3 text-sm transition ${collaborators.includes(user.id) ? "border-cyan-300 bg-white shadow-sm" : "border-sky-100 bg-white/60"}`}>
                        <input type="checkbox" className="mt-1" checked={collaborators.includes(user.id)} onChange={() => toggleCollaborator(user.id)} />
                        <span><b className="block text-[#08324a]">{user.name}</b><span className="text-xs text-slate-500">{user.role}</span></span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">People checked here can help edit, comment, or suggest changes for this section.</p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#08324a]">Review status</h3>
                    <p className="text-sm text-slate-500">Who is working here and what has already been added to this section.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">{sectionContributors.length} reviewers</span>
                    <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800">{openProposals.length} suggestions</span>
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{selectedComments.length} comments</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sectionContributors.map((id) => (
                    <span key={id} className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${avatarClass(id)}`}>{initials(userLabel(id))}</span>
                      {userLabel(id)}
                      {id === owner && <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-800">Lead</span>}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#08324a]">Edit this section</h3>
                    <p className="mt-1 text-sm text-slate-500">Read the current language, revise the proposed replacement, then save or ask for review.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setRightPanel("discussion")} className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-[#005f86] hover:bg-sky-50">Comment</button>
                    <button type="button" onClick={() => setRightPanel("suggestions")} className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-800 hover:bg-violet-50">Suggest edit</button>
                    <button type="button" onClick={() => setCoachOpen((open) => !open)} className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800 hover:bg-amber-100">Ask coach</button>
                  </div>
                </div>
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="border-b border-slate-100 p-5 lg:border-b-0 lg:border-r">
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"><FileText size={15} /> Current language</h4>
                    <div className="min-h-72 rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">{selected.currentText}</div>
                  </div>
                  <div className="p-5">
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]"><GitBranch size={15} /> Proposed replacement</h4>
                    <textarea aria-label="Proposed replacement language" className="min-h-72 w-full rounded-2xl border border-cyan-200 bg-white p-5 leading-7 outline-none focus:ring-2 focus:ring-cyan-200" value={draftText} onChange={(event) => setDraftText(event.target.value)} />
                  </div>
                </div>
                <div className="border-t border-slate-100 p-5">
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Reason for this revision
                    <textarea className="mt-2 min-h-24 w-full rounded-2xl border border-sky-100 p-4 text-base font-normal normal-case tracking-normal text-slate-900 outline-none focus:ring-2 focus:ring-sky-100" placeholder="Why is this change better for the policy?" value={rationale} onChange={(event) => setRationale(event.target.value)} />
                  </label>
                </div>
              </section>

              {coach && (
                <section className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-violet-800">
                        <Sparkles size={14} /> Section AI Coach
                      </span>
                      <h3 className="mt-3 font-heading text-xl font-bold text-[#08324a]">Decision support available</h3>
                      <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{coach.objective}</p>
                    </div>
                    <button type="button" onClick={() => setCoachOpen((open) => !open)} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-800 hover:bg-violet-100">
                      {coachOpen ? "Hide coach" : "Open coach"}
                    </button>
                  </div>

                  {coachOpen && (
                    <>
                      <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/60 px-4 py-3 text-sm text-slate-600">
                        <b className="block text-violet-800">Recommended strategy</b>
                        <span>{coach.strategy}</span>
                      </div>

                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    <div className="rounded-2xl border border-sky-100 bg-white p-4">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]"><Lightbulb size={15} /> Decision guide</h4>
                      <ol className="space-y-2 text-sm leading-6 text-slate-700">
                        {coach.decisionPoints.map((point) => <li key={point} className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-bold text-cyan-800">?</span><span>{point}</span></li>)}
                      </ol>
                    </div>

                    <div className="rounded-2xl border border-amber-100 bg-white p-4">
                      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700"><AlertTriangle size={15} /> Critical risk flags</h4>
                      <div className="flex flex-wrap gap-2">
                        {coach.riskFlags.map((risk) => <span key={risk} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{risk}</span>)}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-white p-4">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Suggested language moves</h4>
                      <ul className="space-y-2 text-sm leading-6 text-slate-700">
                        {coach.suggestedLanguage.map((language) => <li key={language} className="rounded-2xl bg-emerald-50/70 p-3">“{language}”</li>)}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-4">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">Reviewer questions</h4>
                      <ul className="space-y-2 text-sm leading-6 text-slate-700">
                        {coach.reviewerQuestions.map((question) => <li key={question} className="border-l-2 border-cyan-200 pl-3">{question}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-violet-200 bg-white p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-800"><MessageCircle size={15} /> Ask this section coach</h4>
                    <p className="mb-3 text-sm text-slate-600">Ask about best practices, BP/AP placement, donor implications, legal risk, Board authority, or suggested language for this section.</p>
                    <textarea
                      className="min-h-24 w-full rounded-2xl border border-violet-100 bg-violet-50/30 p-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-violet-200"
                      placeholder="Example: What should we watch out for legally in this section?"
                      value={coachQuestion}
                      onChange={(event) => setCoachQuestion(event.target.value)}
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" onClick={() => askCoach()} className="rounded-full bg-violet-700 px-4 py-2 text-sm font-bold text-white hover:bg-violet-800">Ask Coach</button>
                      <button type="button" onClick={() => askCoach("What are the best practices for this section?")} className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-800">Best practices</button>
                      <button type="button" onClick={() => askCoach("What should legal review here?")} className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">Legal lens</button>
                      <button type="button" onClick={() => askCoach("What belongs in BP versus AP?")} className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-800">BP vs AP</button>
                    </div>
                    {coachResponse && (
                      <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                        {coachResponse}
                      </div>
                    )}
                  </div>
                    </>
                  )}
                </section>
              )}

              <section className="rounded-3xl border border-sky-100 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]"><ShieldCheck size={15} /> Suggestions / proposed edits for this section</h3>
                <input className="mb-3 w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Suggestion title" value={proposalTitle} onChange={(event) => setProposalTitle(event.target.value)} />
                <textarea className="min-h-28 w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Suggest a revision, decision, or alternative language for this section. Multiple people can add competing suggestions." value={proposalBody} onChange={(event) => setProposalBody(event.target.value)} />
                <button onClick={createProposal} className="mt-3 rounded-full bg-[#005f86] px-5 py-3 text-sm font-bold text-white">Create Section Suggestion</button>
              </section>
            </div>
          </main>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-sm">
              <div className="grid grid-cols-3 gap-1">
                {(["discussion", "suggestions", "audit"] as const).map((panel) => (
                  <button key={panel} type="button" onClick={() => setRightPanel(panel)} className={`rounded-2xl px-3 py-2 text-xs font-bold transition ${rightPanel === panel ? "bg-[#005f86] text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}>
                    {panel === "discussion" ? "Comments" : panel === "audit" ? "Activity" : "Suggestions"}
                  </button>
                ))}
              </div>
            </div>
            {rightPanel === "discussion" && (
            <section className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><Users size={18} /> Comments</h2>
                  <p className="mt-1 text-sm text-slate-500">Add a note the team can read next to this section.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">{selectedComments.length}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {contributionTypes.map((type) => (
                  <button key={type} type="button" onClick={() => setContributionType(type)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${contributionType === type ? "border-[#005f86] bg-[#005f86] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-200"}`}>{type}</button>
                ))}
              </div>
              <textarea className="mt-3 min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 outline-none focus:bg-white focus:ring-2 focus:ring-cyan-100" placeholder="Add a comment, question, concern, decision, or evidence note…" value={comment} onChange={(event) => setComment(event.target.value)} />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>Posts to this section and appears in Activity with your name and time.</span>
                <span className="font-semibold text-slate-600">{contributionConfidenceCopy}</span>
              </div>
              <button onClick={postComment} disabled={!comment.trim()} className="mt-3 w-full rounded-full bg-[#005f86] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#084b67] disabled:cursor-not-allowed disabled:bg-slate-300">Post comment</button>
              <div className="mt-4 space-y-2">
                {selectedComments.length ? selectedComments.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${avatarClass(item.author)}`}>{initials(item.author)}</span><b className="text-[#005f86]">{item.author}</b></span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">{item.kind || "Note"}</span>
                    </div>
                    <p className="mt-2 leading-6 text-slate-600">{item.body}</p>
                  </div>
                )) : <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No contributions yet. Add the first language note, concern, decision, question, or evidence item for this section.</p>}
              </div>
            </section>
            )}

            {rightPanel === "suggestions" && (
            <section className="rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-[#08324a]">Suggestions</h2>
              <p className="mt-1 text-sm text-slate-500">Suggest a clearer phrase, alternate wording, or decision for this section.</p>
              <div className="mt-4 space-y-3">
                {openProposals.length ? openProposals.slice(0, 6).map((proposal) => (
                  <div key={proposal.id} className="rounded-2xl border border-sky-100 bg-sky-50/50 p-3">
                    <div className="flex items-start justify-between gap-2"><b className="text-sm text-[#08324a]">{proposal.title}</b><span className="rounded-full bg-cyan-50 px-2 py-1 text-xs font-bold text-cyan-800">{proposal.status}</span></div>
                    <p className="mt-2 text-sm text-slate-600">{proposal.body}</p>
                  </div>
                )) : <p className="rounded-2xl border border-sky-100 bg-slate-50 p-3 text-sm text-slate-500">No suggestions for this section yet.</p>}
              </div>
            </section>
            )}

            {rightPanel === "audit" && (
            <section className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><History size={18} /> Activity</h2>
                  <p className="mt-1 text-sm text-slate-500">Recent edits, comments, suggestions, and status changes for this section.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">{visibleAuditEvents.length}/{selectedEvents.length}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {auditFilters.map((filter) => (
                  <button key={filter} type="button" onClick={() => setAuditFilter(filter)} className={`rounded-full border px-3 py-1 text-xs font-bold transition ${auditFilter === filter ? "border-[#005f86] bg-[#005f86] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-200"}`}>{filter}</button>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {visibleAuditEvents.slice(0, 14).map((event) => (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarClass(event.actor)}`}>{initials(event.actor)}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <b className="text-sm text-[#005f86]">{event.actor}</b>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{event.type.replace(/\..*/, "")}</span>
                        </div>
                        <p className="mt-1 text-sm leading-5 text-slate-600">{eventSummary(event)}</p>
                        <div className="mt-2 text-xs text-slate-400">{new Date(event.at).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            )}
          </aside>
        </div>

        {notice && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#06263a] px-5 py-3 text-sm font-bold text-white shadow-xl" onAnimationComplete={() => setTimeout(() => setNotice(""), 1600)}>
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> {notice}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
