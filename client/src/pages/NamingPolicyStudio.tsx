import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, History, Lightbulb, MessageCircle, Radio, ShieldCheck, Users } from "lucide-react";

type User = { id: string; name: string; role: string };
type Comment = { id: string; sectionId: string; author: string; body: string; kind?: string; createdAt: string };
type Proposal = { id?: string; sectionId?: string; author?: string; title?: string; body?: string; status?: string; createdAt?: string };
type Event = { id: string; type: string; actor: string; at: string; detail?: Record<string, unknown> };
type Presence = { id: string; name: string; focus: string; color: string; at: string };
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

const statusLabels: Record<string, string> = {
  "not-started": "Not Started",
  drafting: "Drafting",
  proposed: "Proposed",
  "needs-evidence": "Needs Evidence",
  "needs-review": "Needs Review",
  ready: "Ready",
};

const statusStyles: Record<string, string> = {
  "not-started": "border-slate-200 bg-slate-50 text-slate-600",
  drafting: "border-sky-200 bg-sky-50 text-sky-800",
  proposed: "border-cyan-200 bg-cyan-50 text-cyan-800",
  "needs-evidence": "border-amber-200 bg-amber-50 text-amber-800",
  "needs-review": "border-violet-200 bg-violet-50 text-violet-800",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const policyRequirements = [
  "Board authority and Chancellor routing remain explicit.",
  "The proposed language distinguishes buildings, spaces, programs, collections, funds, and other naming opportunities where needed.",
  "Gift-based naming criteria are defensible without hard-coding every threshold into Board policy.",
  "Term limits, stewardship, records, and revocation/changed-circumstances are visible for review.",
  "Due diligence and reputational review are actionable before Board consideration.",
  "Current text, proposed text, and rationale stay together so reviewers can edit from the document itself.",
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

const avatarStyles = ["bg-cyan-700", "bg-violet-700", "bg-amber-700", "bg-emerald-700", "bg-rose-700", "bg-slate-700"];

function avatarClass(name: string) {
  const score = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatarStyles[score % avatarStyles.length];
}

function statusLabel(status: string) {
  return statusLabels[status] || status.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function eventSummary(event: Event) {
  const detail = event.detail || {};
  if (event.type === "section.updated") return `Updated ${String(detail.title || "document section")}`;
  if (event.type === "comment.created") return `Added ${String(detail.kind || "comment").toLowerCase()}`;
  if (event.type === "proposal.created") return `Created suggestion “${String(detail.title || "Untitled")}"`;
  if (event.type === "snapshot.created") return "Committed document snapshot";
  if (event.type === "presence") return `Joined ${String(detail.focus || "the workspace")}`;
  return event.type.replace(/\./g, " ");
}

export default function NamingPolicyStudio() {
  const [state, setState] = useState<State | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState(() => window.localStorage.getItem("namingPolicyReviewer") || "Scott Wayman");
  const [comment, setComment] = useState("");
  const [commentKind, setCommentKind] = useState("Question");
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState({ proposedText: "", rationale: "", status: "", owner: "", risk: "" });

  async function load() {
    const nextState = await api<State>("/state");
    setState(nextState);
    if (!selectedId && nextState.policySections[0]) setSelectedId(nextState.policySections[0].id);
  }

  useEffect(() => {
    document.title = "Naming Policy Document Studio";
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

  const sections = state?.policySections || [];
  const selected = sections.find((section) => section.id === selectedId) || sections[0];

  useEffect(() => {
    if (!selected) return;
    setDraft({
      proposedText: selected.proposedText || "",
      rationale: selected.rationale || "",
      status: selected.status || "drafting",
      owner: selected.owner || "scott",
      risk: selected.risk || "",
    });
  }, [selected?.id, selected?.proposedText, selected?.rationale, selected?.status, selected?.owner, selected?.risk]);

  const selectedComments = state?.comments.filter((item) => item.sectionId === selected?.id) || [];
  const selectedProposals = state?.proposals.filter((item) => item.sectionId === selected?.id) || [];
  const selectedEvents = state?.events.filter((event) => !event.detail?.sectionId || event.detail?.sectionId === selected?.id).slice(0, 8) || [];
  const openQuestions = state?.comments.filter((item) => item.kind === "Question") || [];
  const readyCount = sections.filter((section) => section.status === "ready").length;
  const needsReview = sections.filter((section) => section.status === "needs-review");
  const needsEvidence = sections.filter((section) => section.status === "needs-evidence");
  const readinessPercent = sections.length ? Math.round((readyCount / sections.length) * 100) : 0;
  const activePresence = state?.presence?.slice(0, 8) || [];

  const owner = useMemo(() => state?.users.find((user) => user.id === selected?.owner), [state?.users, selected?.owner]);
  const draftOwner = useMemo(() => state?.users.find((user) => user.id === draft.owner), [state?.users, draft.owner]);
  const collaborators = useMemo(() => {
    const ids = Array.from(new Set([draft.owner, ...(selected?.collaborators || [])].filter(Boolean)));
    return ids.map((id) => state?.users.find((user) => user.id === id)).filter(Boolean) as User[];
  }, [draft.owner, selected?.collaborators, state?.users]);
  const hasUnsavedChanges = Boolean(selected && (
    draft.proposedText !== selected.proposedText ||
    draft.rationale !== selected.rationale ||
    draft.status !== selected.status ||
    draft.owner !== selected.owner ||
    draft.risk !== selected.risk
  ));

  async function heartbeat(focus = "reviewing naming policy document") {
    window.localStorage.setItem("namingPolicyReviewer", name);
    await api("/presence", {
      method: "POST",
      body: JSON.stringify({ id: reviewerId, name, focus, color: "#006eb6" }),
    });
  }

  async function saveSection(reason = "Document section edited") {
    if (!selected) return;
    const collaboratorIds = Array.from(new Set([draft.owner, ...(selected.collaborators || [])].filter(Boolean)));
    await api(`/sections/${selected.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        actor: name,
        proposedText: draft.proposedText,
        rationale: draft.rationale,
        status: draft.status,
        owner: draft.owner,
        risk: draft.risk,
        collaborators: collaboratorIds,
        changeReason: reason,
      }),
    });
    setNotice(`Saved edits to ${selected.title}.`);
    await load();
  }

  async function postComment() {
    if (!selected || !comment.trim()) return;
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
      body: JSON.stringify({ author: name, title: "Naming policy document snapshot" }),
    });
    setNotice("Document snapshot committed.");
    await load();
  }

  if (!state || !selected) {
    return <div className="container py-24 text-slate-600">Loading naming policy document studio…</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 py-6">
      <div className="container max-w-[1560px]">
        <header className="mb-5 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">
                <Radio size={13} /> Hidden working route · document-backed AP/BP 6620 workspace
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-[#08324a] md:text-5xl">
                Naming Policy Document Studio
              </h1>
              <p className="mt-2 max-w-4xl text-base leading-7 text-slate-600">
                Review the actual BP/AP 6620 naming policy language section by section. Keep current text, proposed replacement text, rationale, lead reviewer, contributors, comments, and exportable record together.
              </p>
            </div>
            <div className="grid min-w-[320px] grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><b className="block text-3xl text-[#005f86]">{sections.length}</b><span className="text-xs font-semibold text-slate-500">doc sections</span></div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3"><b className="block text-3xl text-violet-700">{needsReview.length}</b><span className="text-xs font-semibold text-violet-700">need review</span></div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"><b className="block text-3xl text-amber-700">{needsEvidence.length}</b><span className="text-xs font-semibold text-amber-700">need evidence</span></div>
            </div>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[330px_minmax(720px,1fr)_360px]">
          <aside className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#005f86]">Document Sections</h2>
            <div className="mb-4 flex gap-2">
              <input className="min-w-0 flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-sm" value={name} onChange={(event) => setName(event.target.value)} />
              <button className="rounded-2xl bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-800" onClick={() => heartbeat()}>Join</button>
            </div>
            <div className="space-y-2">
              {sections.map((section, index) => {
                const sectionOwner = state.users.find((user) => user.id === section.owner);
                return (
                  <button
                    key={section.id}
                    onClick={() => { setSelectedId(section.id); heartbeat(`reviewing ${section.doc}: ${section.title}`); }}
                    className={`w-full rounded-2xl border p-3 text-left transition ${section.id === selected.id ? "border-[#0096d6] bg-sky-50 shadow-sm" : "border-slate-200 bg-white hover:border-sky-200"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">{index + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{section.doc}</span>
                        <b className="block text-sm text-[#08324a]">{section.title}</b>
                        <span className="mt-1 block text-xs text-slate-500">Lead: {sectionOwner?.name || section.owner}</span>
                        <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusStyles[section.status] || statusStyles.drafting}`}>{statusLabel(section.status)}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4">
              <button onClick={commitSnapshot} className="rounded-2xl bg-[#005f86] px-4 py-3 text-sm font-bold text-white">Commit Document Snapshot</button>
              <a href={`${API}/export.md`} target="_blank" rel="noreferrer" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-800">Export Current Record</a>
            </div>
          </aside>

          <main className="space-y-5">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">{selected.doc}</span>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[draft.status] || statusStyles.drafting}`}>{statusLabel(draft.status)}</span>
                    {hasUnsavedChanges && <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">Unsaved edits</span>}
                  </div>
                  <h2 className="mt-3 font-heading text-3xl font-bold text-[#08324a]">{selected.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Risk / review lens: {draft.risk || "Not classified"}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[420px]">
                  <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Status
                    <select value={draft.status} onChange={(event) => setDraft((next) => ({ ...next, status: event.target.value }))} className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900">
                      {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Lead reviewer
                    <select value={draft.owner} onChange={(event) => setDraft((next) => ({ ...next, owner: event.target.value }))} className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900">
                      {state.users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h3 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#08324a]"><FileText size={20} /> Document Editing Surface</h3>
                <p className="mt-1 text-sm text-slate-500">This is the actual document section: current language on top, editable proposed replacement below, with rationale preserved for reviewers.</p>
              </div>
              <div className="p-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Current document text</div>
                  <p className="whitespace-pre-wrap text-base leading-8 text-slate-800">{selected.currentText}</p>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Editable proposed replacement text</span>
                  <textarea
                    className="min-h-56 w-full rounded-3xl border border-slate-200 bg-white p-5 text-base leading-8 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-100"
                    value={draft.proposedText}
                    onChange={(event) => setDraft((next) => ({ ...next, proposedText: event.target.value }))}
                  />
                </label>

                <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Rationale / reviewer explanation</span>
                    <textarea
                      className="min-h-32 w-full rounded-3xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-100"
                      value={draft.rationale}
                      onChange={(event) => setDraft((next) => ({ ...next, rationale: event.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Risk / category</span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-100"
                      value={draft.risk}
                      onChange={(event) => setDraft((next) => ({ ...next, risk: event.target.value }))}
                    />
                    <button type="button" onClick={() => saveSection()} disabled={!hasUnsavedChanges} className="mt-4 w-full rounded-full bg-[#005f86] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#084b67] disabled:cursor-not-allowed disabled:bg-slate-300">Save Document Edits</button>
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><ShieldCheck size={19} /> Review Checklist</h3>
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
              <h2 className="font-heading text-xl font-bold text-[#08324a]">Document Progress</h2>
              <p className="mt-1 text-sm text-slate-500">Progress is based on actual document sections, not placeholder packet headings.</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-emerald-500" style={{ width: `${readinessPercent}%` }} /></div>
              <div className="mt-3 text-sm font-semibold text-slate-700">{readyCount} of {sections.length} document sections marked Ready</div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><Users size={18} /> Contributors</h2>
                  <p className="mt-1 text-sm text-slate-500">Lead reviewer, working group, live reviewers, and note authors.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{collaborators.length}</span>
              </div>
              <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-3">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-800">Lead reviewer</div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-800">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${avatarClass(draftOwner?.name || owner?.name || selected.owner)}`}>{initials(draftOwner?.name || owner?.name || selected.owner)}</span>
                  {draftOwner?.name || owner?.name || selected.owner}
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Working group</div>
                <div className="flex flex-wrap gap-2">
                  {collaborators.map((user) => (
                    <span key={user.id} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${avatarClass(user.name)}`}>{initials(user.name)}</span>
                      {user.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Active now</div>
                <div className="flex flex-wrap gap-2">
                  {activePresence.length ? activePresence.map((person) => (
                    <span key={person.id} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> {person.name}
                    </span>
                  )) : <span className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">No live presence yet. Use Join to show as active.</span>}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-amber-900"><AlertTriangle size={18} /> Needs Attention</h2>
              <div className="mt-4 space-y-3">
                {[...needsReview, ...needsEvidence].slice(0, 6).map((section) => (
                  <button key={section.id} onClick={() => setSelectedId(section.id)} className="w-full rounded-2xl border border-amber-200 bg-white/80 p-3 text-left text-sm text-amber-950">
                    <b>{section.doc}: {section.title}</b>
                    <span className="mt-1 block text-xs text-amber-800">{statusLabel(section.status)} · {section.risk}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-violet-100 bg-violet-50/40 p-5 shadow-sm">
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-violet-900"><Lightbulb size={18} /> Drafting Helper</h2>
                <p className="text-sm leading-6 text-slate-600">Use the current text as the source of truth. Edit the proposed replacement directly, then use comments for questions, evidence notes, concerns, and decisions.</p>
                <button type="button" onClick={() => setCommentKind("Question")} className="rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-800">Add reviewer question</button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><MessageCircle size={18} /> Review Notes</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Question", "Evidence", "Concern", "Decision"].map((kind) => <button key={kind} onClick={() => setCommentKind(kind)} className={`rounded-full border px-3 py-1 text-xs font-bold ${commentKind === kind ? "border-[#005f86] bg-[#005f86] text-white" : "border-slate-200 bg-white text-slate-600"}`}>{kind}</button>)}
              </div>
              <textarea className="mt-3 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 outline-none focus:bg-white focus:ring-2 focus:ring-cyan-100" placeholder="Add a section-specific question, evidence note, consultative review note, or decision…" value={comment} onChange={(event) => setComment(event.target.value)} />
              <button onClick={postComment} disabled={!comment.trim()} className="mt-3 w-full rounded-full bg-[#005f86] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#084b67] disabled:cursor-not-allowed disabled:bg-slate-300">Add Review Note</button>
              <div className="mt-4 space-y-3">
                {selectedComments.length ? selectedComments.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                    <div className="flex items-center justify-between gap-2"><b className="text-[#005f86]">{item.author}</b><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600">{item.kind || "Note"}</span></div>
                    <p className="mt-2 leading-6 text-slate-600">{item.body}</p>
                  </div>
                )) : <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No comments yet for this document section.</p>}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><History size={18} /> Activity</h2>
              <div className="mt-4 space-y-3">
                {selectedEvents.length ? selectedEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                    <b className="text-[#005f86]">{event.actor}</b>
                    <p className="mt-1 leading-5 text-slate-600">{eventSummary(event)}</p>
                    <div className="mt-2 text-xs text-slate-400">{new Date(event.at).toLocaleString()}</div>
                  </div>
                )) : <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No activity logged for this section yet.</p>}
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
