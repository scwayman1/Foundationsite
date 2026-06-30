import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, GitBranch, History, Lightbulb, MessageCircle, Radio, ShieldCheck, Sparkles, Users } from "lucide-react";

type User = { id: string; name: string; role: string };
type Comment = { id: string; sectionId: string; author: string; body: string; kind?: string; createdAt: string };
type Event = { id: string; type: string; actor: string; at: string; detail?: Record<string, unknown> };
type Presence = { id: string; name: string; focus: string; color: string; at: string };
type LegacyPolicySection = {
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
type State = {
  meta: { project: string; updatedAt: string };
  users: User[];
  policySections: LegacyPolicySection[];
  comments: Comment[];
  proposals: Array<Record<string, unknown>>;
  events: Event[];
  snapshots: unknown[];
  presence: Presence[];
};

type ReadinessState = "not-started" | "drafting" | "needs-evidence" | "needs-review" | "ready";
type PacketSection = {
  id: string;
  title: string;
  purpose: string;
  draft: string;
  requiredInputs: string[];
  evidence: string[];
  policyFlags: string[];
  reviewer: string;
  status: ReadinessState;
};

const API = "/api/naming-policy";
const reviewerId = `reviewer-${Math.random().toString(36).slice(2)}`;

const statusLabels: Record<ReadinessState, string> = {
  "not-started": "Not Started",
  drafting: "Drafting",
  "needs-evidence": "Needs Evidence",
  "needs-review": "Needs Review",
  ready: "Ready",
};

const statusStyles: Record<ReadinessState, string> = {
  "not-started": "border-slate-200 bg-slate-50 text-slate-600",
  drafting: "border-sky-200 bg-sky-50 text-sky-800",
  "needs-evidence": "border-amber-200 bg-amber-50 text-amber-800",
  "needs-review": "border-violet-200 bg-violet-50 text-violet-800",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const packetSections: PacketSection[] = [
  {
    id: "proposal-overview",
    title: "Proposal Overview",
    purpose: "Frame the naming request in one executive-ready narrative: what is being named, why now, and what decision is requested.",
    draft: "Prepare a concise overview of the proposed naming action, the institutional context, and the requested path toward President, Chancellor, and Board consideration.",
    requiredInputs: ["Proposed action", "Origin of the request", "Requested approval path", "Primary contact"],
    evidence: ["Initial proposal brief", "Internal sponsor notes"],
    policyFlags: ["Board retains final naming authority", "Do not imply approval before Chancellor/Board review"],
    reviewer: "Scott Wayman",
    status: "drafting",
  },
  {
    id: "proposed-name",
    title: "Proposed Name / Recognition",
    purpose: "Capture the exact proposed name and the recognition form being requested.",
    draft: "State the proposed name exactly as it should appear in Board materials, signage, plaque language, and institutional records.",
    requiredInputs: ["Exact proposed name", "Recognition type", "Permanent or term-limited assumption", "Spelling/format confirmation"],
    evidence: ["Name confirmation", "Naming request form"],
    policyFlags: ["Recognition language must match the approved Board action"],
    reviewer: "Ryan Cook",
    status: "needs-evidence",
  },
  {
    id: "facility-description",
    title: "Facility or Property Description",
    purpose: "Describe the building, facility, space, property, program, collection, or other naming opportunity.",
    draft: "Describe the asset proposed for naming, including location, visibility, current use, affected programs, and whether the asset is new, renovated, existing, or temporary.",
    requiredInputs: ["Asset/location", "Current use", "Campus impact", "Facilities contact"],
    evidence: ["Space description", "Map/photo/facilities reference"],
    policyFlags: ["Highly visible facilities require careful routing", "Facilities changes can affect future stewardship obligations"],
    reviewer: "Julie Clevenger",
    status: "drafting",
  },
  {
    id: "basis-for-naming",
    title: "Basis for Naming",
    purpose: "Identify whether the naming is based on extraordinary distinction, extraordinary service, or significant material donation.",
    draft: "Select and explain the policy basis for naming. If no gift is involved, the narrative must establish unique distinction, extraordinary contribution, or significant service.",
    requiredInputs: ["Basis category", "Summary rationale", "Gift involved?", "Honorary/service rationale if no gift"],
    evidence: ["Contribution summary", "Service/distinction documentation"],
    policyFlags: ["AP 6620 recognizes extraordinary distinction, extraordinary service, or significant material donation", "No-gift proposals need especially strong rationale"],
    reviewer: "Scott Wayman",
    status: "needs-review",
  },
  {
    id: "gift-rationale",
    title: "Gift, Endowment, or Service Rationale",
    purpose: "Document the material gift or the service/distinction rationale supporting the proposed naming.",
    draft: "For gift-based naming, capture gift amount, intended use, restrictions, stewardship commitments, and relationship to the naming opportunity. For non-gift naming, document the extraordinary contribution or service record.",
    requiredInputs: ["Gift amount or service basis", "Use of funds", "Restrictions", "Significance relative to opportunity"],
    evidence: ["Gift agreement or pledge summary", "Service record / distinction evidence"],
    policyFlags: ["Gift significance should be defensible relative to the asset", "Restrictions and stewardship terms must be visible before advancement"],
    reviewer: "Patricia Falzon",
    status: "needs-evidence",
  },
  {
    id: "policy-alignment",
    title: "Policy Alignment with AP 6620",
    purpose: "Show how the proposal satisfies the governing policy requirements and where additional review is needed.",
    draft: "Summarize alignment with AP 6620, including basis for naming, approval routing, gift/service rationale, due diligence, consultative review, and final Board authority.",
    requiredInputs: ["AP 6620 basis", "Approval route", "Known exceptions", "Policy questions"],
    evidence: ["AP 6620 reference", "Policy compliance notes"],
    policyFlags: ["Final authority rests with the Board", "President/Chancellor consultation should be visible before Board materials"],
    reviewer: "Julie Clevenger",
    status: "needs-review",
  },
  {
    id: "background",
    title: "Donor / Honoree Background",
    purpose: "Assemble a respectful and factual background profile for the donor or honoree.",
    draft: "Provide a brief biography, relationship to Coastline or the District, relevant service, philanthropic history, and rationale for why recognition is institutionally appropriate.",
    requiredInputs: ["Biography", "Relationship to institution", "Relevant service/giving history", "Preferred public description"],
    evidence: ["Bio/profile", "Giving or service history", "Public-facing description approval"],
    policyFlags: ["Public claims should be evidence-backed", "Avoid unsupported reputational or philanthropic claims"],
    reviewer: "Ryan Cook",
    status: "drafting",
  },
  {
    id: "due-diligence",
    title: "Due Diligence & Reputational Review",
    purpose: "Make reputation, conflict, and mission-alignment review explicit before the packet advances.",
    draft: "Document reasonable due diligence, including public reputation, conflicts, donor intent, source-of-funds concerns where relevant, legal restrictions, and alignment with District values.",
    requiredInputs: ["Due diligence owner", "Review summary", "Material concerns", "Escalation needed?"],
    evidence: ["Due diligence memo", "Conflict/reputational review notes"],
    policyFlags: ["Material concerns should be summarized for Chancellor review", "Sensitive issues may require legal/executive handling"],
    reviewer: "Julie Clevenger",
    status: "needs-evidence",
  },
  {
    id: "consultative-review",
    title: "Consultative Review",
    purpose: "Show that the right people have seen the proposal before it becomes a Board packet item.",
    draft: "Record consultation with Foundation leadership, College leadership, District/Chancellor representatives, facilities/stewardship contacts, and any required legal or Board office reviewers.",
    requiredInputs: ["Foundation review", "College/President review", "District/Chancellor review", "Facilities/stewardship review"],
    evidence: ["Review notes", "Email approvals", "Meeting summary"],
    policyFlags: ["Consultative review should precede Board advancement", "Open objections or missing reviewers should block readiness"],
    reviewer: "Scott Wayman",
    status: "needs-review",
  },
  {
    id: "financial-terms",
    title: "Financial / Stewardship Terms",
    purpose: "Capture gift, endowment, restriction, term, signage, and stewardship obligations.",
    draft: "Document gift or endowment terms, pledge schedule, restrictions, recognition duration, renewal assumptions, signage obligations, stewardship responsibilities, and recordkeeping needs.",
    requiredInputs: ["Gift/endowment terms", "Restrictions", "Term length", "Signage/stewardship obligations"],
    evidence: ["Gift agreement", "Endowment terms", "Signage/stewardship estimate"],
    policyFlags: ["Term-limited naming should state duration and end-of-term handling", "Stewardship obligations must be tracked"],
    reviewer: "Patricia Falzon",
    status: "needs-evidence",
  },
  {
    id: "recognition-language",
    title: "Recognition Language / Plaque Draft",
    purpose: "Draft public-facing language that is accurate, dignified, and aligned with the requested Board action.",
    draft: "Prepare draft plaque or recognition language, including exact name, short rationale, and any donor/honoree-approved wording needed for public display.",
    requiredInputs: ["Plaque/signage draft", "Tone approval", "Name formatting", "Installation assumptions"],
    evidence: ["Draft plaque copy", "Design/signage notes"],
    policyFlags: ["Plaque language should not exceed the approved scope", "Donor/honoree wording should be confirmed"],
    reviewer: "Ryan Cook",
    status: "not-started",
  },
  {
    id: "open-questions",
    title: "Open Questions",
    purpose: "Keep unresolved issues visible so the packet does not look complete when required information is missing.",
    draft: "List questions that must be answered before the recommendation can be marked board-ready.",
    requiredInputs: ["Policy questions", "Evidence gaps", "Reviewer blockers", "Decision owner"],
    evidence: ["Question log", "Assigned follow-up notes"],
    policyFlags: ["Unresolved evidence or policy questions should prevent Ready status"],
    reviewer: "Julie Clevenger",
    status: "needs-review",
  },
  {
    id: "final-recommendation",
    title: "Final Recommendation",
    purpose: "Assemble the final board-ready recommendation memo once evidence, review, and policy alignment are sufficient.",
    draft: "Draft the final recommendation memo only after required evidence is attached, AP 6620 alignment is clear, consultative review is documented, and open questions are resolved.",
    requiredInputs: ["Recommendation language", "Approving route", "Board action requested", "Packet attachments"],
    evidence: ["Final memo draft", "Attachment list", "Approval routing notes"],
    policyFlags: ["Do not mark Ready until evidence and consultative review are complete", "Board authority must remain explicit"],
    reviewer: "Julie Clevenger",
    status: "not-started",
  },
];

const policyRequirements = [
  "Naming basis identified: extraordinary distinction, extraordinary service, or significant material donation.",
  "Final Board authority remains explicit; no language implies pre-approval.",
  "Gift-based requests capture amount, use, restrictions, stewardship, and relationship to opportunity.",
  "No-gift requests establish unique distinction, extraordinary contribution, or significant service.",
  "Current/former employee timing issue is surfaced for review when applicable.",
  "Consultative review is visible before advancement to Board consideration.",
];

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: { "content-type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(await response.text());
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("json") ? response.json() : (response.text() as Promise<T>);
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

function eventSummary(event: Event) {
  const detail = event.detail || {};
  if (event.type === "section.updated") return `Updated ${String(detail.title || "packet section")}`;
  if (event.type === "comment.created") return `Added ${String(detail.kind || "comment").toLowerCase()}`;
  if (event.type === "proposal.created") return `Created suggestion “${String(detail.title || "Untitled")}"`;
  if (event.type === "snapshot.created") return `Committed packet snapshot`;
  if (event.type === "presence") return `Joined ${String(detail.focus || "the workspace")}`;
  return event.type.replace(/\./g, " ");
}

export default function NamingPolicyStudio() {
  const [state, setState] = useState<State | null>(null);
  const [selectedId, setSelectedId] = useState(packetSections[0].id);
  const [name, setName] = useState(() => window.localStorage.getItem("namingPolicyReviewer") || "Scott Wayman");
  const [comment, setComment] = useState("");
  const [commentKind, setCommentKind] = useState("Question");
  const [localStatuses, setLocalStatuses] = useState<Record<string, ReadinessState>>(() => {
    try {
      return JSON.parse(window.localStorage.getItem("namingPacketReadiness") || "{}");
    } catch {
      return {};
    }
  });
  const [notice, setNotice] = useState("");

  async function load() {
    const nextState = await api<State>("/state");
    setState(nextState);
  }

  useEffect(() => {
    document.title = "Naming Proposal Packet Studio";
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

  const sections = useMemo(
    () => packetSections.map((section) => ({ ...section, status: localStatuses[section.id] || section.status })),
    [localStatuses],
  );
  const selected = sections.find((section) => section.id === selectedId) || sections[0];
  const selectedComments = state?.comments.filter((item) => item.sectionId === selected.id) || [];
  const selectedEvents = state?.events.filter((event) => !event.detail?.sectionId || event.detail?.sectionId === selected.id).slice(0, 8) || [];
  const missingEvidence = sections.filter((section) => section.status === "needs-evidence");
  const openQuestions = state?.comments.filter((item) => item.kind === "Question" || item.sectionId === "open-questions") || [];
  const readyCount = sections.filter((section) => section.status === "ready").length;
  const blockers = sections.filter((section) => ["not-started", "needs-evidence", "needs-review"].includes(section.status));
  const readinessPercent = Math.round((readyCount / sections.length) * 100);

  function updateStatus(sectionId: string, nextStatus: ReadinessState) {
    const next = { ...localStatuses, [sectionId]: nextStatus };
    setLocalStatuses(next);
    window.localStorage.setItem("namingPacketReadiness", JSON.stringify(next));
    setNotice(`${statusLabels[nextStatus]} saved for this packet section.`);
  }

  async function heartbeat(focus = "reviewing naming packet") {
    window.localStorage.setItem("namingPolicyReviewer", name);
    await api("/presence", {
      method: "POST",
      body: JSON.stringify({ id: reviewerId, name, focus, color: "#006eb6" }),
    });
  }

  async function postComment() {
    if (!comment.trim()) return;
    await api("/comments", {
      method: "POST",
      body: JSON.stringify({ sectionId: selected.id, author: name, body: comment.trim(), kind: commentKind }),
    });
    setComment("");
    setNotice(`${commentKind} added to ${selected.title}.`);
    await load();
  }

  async function commitSnapshot() {
    await api("/snapshots", {
      method: "POST",
      body: JSON.stringify({ author: name, title: "Naming proposal packet snapshot" }),
    });
    setNotice("Packet snapshot committed.");
    await load();
  }

  if (!state) {
    return <div className="container py-24 text-slate-600">Loading naming proposal packet studio…</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-6">
      <div className="container max-w-[1560px]">
        <header className="mb-5 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">
                <Radio size={13} /> Hidden working route · AP 6620 packet workspace
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-[#08324a] md:text-5xl">
                Naming Proposal Packet Studio
              </h1>
              <p className="mt-2 max-w-4xl text-base leading-7 text-slate-600">
                Assemble a defensible facility/property naming recommendation for Coastline College Foundation: narrative,
                AP 6620 policy alignment, gift or service rationale, evidence, consultative review, and board-ready memo.
              </p>
            </div>
            <div className="grid min-w-[320px] grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><b className="block text-3xl text-[#005f86]">{readinessPercent}%</b><span className="text-xs font-semibold text-slate-500">ready</span></div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"><b className="block text-3xl text-amber-700">{missingEvidence.length}</b><span className="text-xs font-semibold text-amber-700">evidence gaps</span></div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3"><b className="block text-3xl text-violet-700">{openQuestions.length}</b><span className="text-xs font-semibold text-violet-700">questions</span></div>
            </div>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[310px_minmax(680px,1fr)_380px]">
          <aside className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#005f86]">Proposal Architecture</h2>
            <div className="mb-4 flex gap-2">
              <input className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-sm" value={name} onChange={(event) => setName(event.target.value)} />
              <button className="rounded-2xl bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-800" onClick={() => heartbeat()}>Join</button>
            </div>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => { setSelectedId(section.id); heartbeat(`reviewing ${section.title}`); }}
                  className={`w-full rounded-2xl border p-3 text-left transition ${section.id === selected.id ? "border-[#0096d6] bg-sky-50 shadow-sm" : "border-slate-200 bg-white hover:border-sky-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-sm text-[#08324a]">{section.title}</b>
                      <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyles[section.status]}`}>{statusLabels[section.status]}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4">
              <button onClick={commitSnapshot} className="rounded-2xl bg-[#005f86] px-4 py-3 text-sm font-bold text-white">Commit Packet Snapshot</button>
              <a href={`${API}/export.md`} target="_blank" rel="noreferrer" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-800">Export Current Record</a>
            </div>
          </aside>

          <main className="space-y-5">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[selected.status]}`}>{statusLabels[selected.status]}</span>
                  <h2 className="mt-3 font-heading text-3xl font-bold text-[#08324a]">{selected.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{selected.purpose}</p>
                </div>
                <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Readiness
                  <select value={selected.status} onChange={(event) => updateStatus(selected.id, event.target.value as ReadinessState)} className="mt-2 block min-w-[190px] rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900">
                    {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h3 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#08324a]"><FileText size={20} /> Document Assembly Canvas</h3>
                <p className="mt-1 text-sm text-slate-500">This is the board-packet section being assembled. Draft claims should be backed by evidence or marked as assumptions.</p>
              </div>
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="p-6">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Recommendation Draft</div>
                    <p className="text-base leading-8 text-slate-800">{selected.draft}</p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Required Inputs</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {selected.requiredInputs.map((input) => <li key={input} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-slate-400" /><span>{input}</span></li>)}
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-4">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Evidence / References</h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {selected.evidence.map((item) => <li key={item} className="flex gap-2"><AlertTriangle size={16} className="mt-0.5 text-amber-600" /><span>{item}</span></li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl border border-violet-100 bg-violet-50/40 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-800"><Sparkles size={15} /> Drafting Helper</h4>
                        <p className="mt-1 text-sm text-slate-600">Check whether this section states a claim, identifies the needed evidence, and preserves Board authority.</p>
                      </div>
                      <button type="button" onClick={() => setCommentKind("Question")} className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-800">Add reviewer question</button>
                    </div>
                  </div>
                </div>

                <aside className="border-t border-slate-100 p-5 lg:border-l lg:border-t-0">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Section Comments</h4>
                  <div className="space-y-3">
                    {selectedComments.length ? selectedComments.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                        <div className="flex items-center justify-between gap-2"><b className="text-[#005f86]">{item.author}</b><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">{item.kind || "Note"}</span></div>
                        <p className="mt-2 leading-6 text-slate-600">{item.body}</p>
                      </div>
                    )) : <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No comments yet. Add questions, evidence notes, or consultative review comments for this packet section.</p>}
                  </div>
                </aside>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><ShieldCheck size={19} /> Policy Alignment Checklist</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {policyRequirements.map((requirement) => (
                  <div key={requirement} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 size={16} className="mr-2 inline text-emerald-600" />{requirement}
                  </div>
                ))}
              </div>
            </section>
          </main>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-[#08324a]">Board Packet Readiness</h2>
              <p className="mt-1 text-sm text-slate-500">What is blocking this from becoming a board-ready recommendation?</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-emerald-500" style={{ width: `${readinessPercent}%` }} /></div>
              <div className="mt-3 text-sm font-semibold text-slate-700">{readyCount} of {sections.length} sections marked Ready</div>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-amber-900"><AlertTriangle size={18} /> Missing Evidence</h2>
              <div className="mt-4 space-y-3">
                {missingEvidence.length ? missingEvidence.map((section) => (
                  <button key={section.id} onClick={() => setSelectedId(section.id)} className="w-full rounded-2xl border border-amber-200 bg-white/80 p-3 text-left text-sm text-amber-950">
                    <b>{section.title}</b>
                    <span className="mt-1 block text-xs text-amber-800">Needs: {section.evidence.slice(0, 2).join(", ")}</span>
                  </button>
                )) : <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">No evidence gaps marked right now.</p>}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><Lightbulb size={18} /> Policy Flags</h2>
              <div className="mt-4 space-y-2">
                {selected.policyFlags.map((flag) => <div key={flag} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">{flag}</div>)}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><Users size={18} /> Assigned Reviewers</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#005f86] text-xs font-bold text-white">{initials(selected.reviewer)}</span>{selected.reviewer}</span>
                {state.users.slice(0, 3).map((user) => <span key={user.id} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">{user.name}</span>)}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><MessageCircle size={18} /> Review Notes</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Question", "Evidence", "Concern", "Decision"].map((kind) => <button key={kind} onClick={() => setCommentKind(kind)} className={`rounded-full border px-3 py-1 text-xs font-bold ${commentKind === kind ? "border-[#005f86] bg-[#005f86] text-white" : "border-slate-200 bg-white text-slate-600"}`}>{kind}</button>)}
              </div>
              <textarea className="mt-3 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 outline-none focus:bg-white focus:ring-2 focus:ring-cyan-100" placeholder="Add a section-specific question, evidence note, consultative review note, or decision…" value={comment} onChange={(event) => setComment(event.target.value)} />
              <button onClick={postComment} disabled={!comment.trim()} className="mt-3 w-full rounded-full bg-[#005f86] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#084b67] disabled:cursor-not-allowed disabled:bg-slate-300">Add Review Note</button>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><History size={18} /> Decision Log</h2>
              <div className="mt-4 space-y-3">
                {selectedEvents.length ? selectedEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                    <b className="text-[#005f86]">{event.actor}</b>
                    <p className="mt-1 leading-5 text-slate-600">{eventSummary(event)}</p>
                    <div className="mt-2 text-xs text-slate-400">{new Date(event.at).toLocaleString()}</div>
                  </div>
                )) : <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No decisions logged for this section yet. Use Review Notes to capture decisions, blockers, or evidence assumptions.</p>}
              </div>
            </section>
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
