import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, GitBranch, History, Radio, ShieldCheck, Users } from "lucide-react";

type User = { id: string; name: string; role: string };
type PolicySection = {
  id: string;
  doc: string;
  title: string;
  status: string;
  owner: string;
  risk: string;
  currentText: string;
  proposedText: string;
  rationale: string;
};
type Comment = { id: string; sectionId: string; author: string; body: string; createdAt: string };
type Proposal = { id: string; sectionId: string; author: string; title: string; body: string; status: string; createdAt: string };
type Event = { id: string; type: string; actor: string; at: string };
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

const statusLabels: Record<string, string> = {
  drafting: "Drafting",
  "needs-review": "Needs Review",
  proposed: "Proposed",
  approved: "Approved",
};

function statusClass(status: string) {
  if (status === "approved") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "proposed") return "bg-violet-50 text-violet-700 border-violet-200";
  if (status === "needs-review") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-sky-50 text-sky-700 border-sky-200";
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
  const [comment, setComment] = useState("");
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalBody, setProposalBody] = useState("");
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
  }, [selected?.id, selected?.proposedText, selected?.rationale, selected?.status, selected?.owner]);

  async function heartbeat(focus = "reviewing workspace") {
    window.localStorage.setItem("namingPolicyReviewer", name);
    await api("/presence", {
      method: "POST",
      body: JSON.stringify({ id: reviewerId, name, focus, color: "#006eb6" }),
    });
  }

  async function saveSection() {
    if (!selected) return;
    await api(`/sections/${selected.id}`, {
      method: "PATCH",
      body: JSON.stringify({ actor: name, proposedText: draftText, rationale, status, owner }),
    });
    setNotice("Saved to the policy workspace.");
    await load();
  }

  async function postComment() {
    if (!selected || !comment.trim()) return;
    await api("/comments", {
      method: "POST",
      body: JSON.stringify({ sectionId: selected.id, author: name, body: comment.trim() }),
    });
    setComment("");
    setNotice("Comment posted.");
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

  async function commitSnapshot() {
    await api("/snapshots", {
      method: "POST",
      body: JSON.stringify({ author: name, title: "Committee working snapshot" }),
    });
    setNotice("Snapshot committed.");
    await load();
  }

  const selectedComments = state?.comments.filter((item) => item.sectionId === selected?.id) || [];
  const openProposals = state?.proposals.filter((item) => item.sectionId === selected?.id || item.status === "open") || [];

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
                A private committee workspace for changing BP/AP 6620 together: proposed language, rationale, owners, comments,
                proposals, snapshots, live audit trail, and Board-packet export.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl border border-sky-100 bg-white px-5 py-3"><b className="block text-3xl text-[#005f86]">{state.policySections.length}</b><span className="text-xs font-semibold text-slate-500">sections</span></div>
              <div className="rounded-2xl border border-sky-100 bg-white px-5 py-3"><b className="block text-3xl text-[#005f86]">{state.proposals.length}</b><span className="text-xs font-semibold text-slate-500">proposals</span></div>
              <div className="rounded-2xl border border-sky-100 bg-white px-5 py-3"><b className="block text-3xl text-[#005f86]">{state.events.length}</b><span className="text-xs font-semibold text-slate-500">events</span></div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_380px]">
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
                  <span className="mt-1 block text-xs text-slate-500">{statusLabels[section.status]} · {section.owner} · {section.risk}</span>
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
                <label className="text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Owner
                  <select value={owner} onChange={(event) => setOwner(event.target.value)} className="mt-2 block w-full rounded-2xl border border-sky-100 bg-white px-3 py-3 text-base font-normal normal-case tracking-normal text-slate-900">
                    {state.users.map((user) => <option key={user.id} value={user.id}>{user.name} — {user.role}</option>)}
                  </select>
                </label>
              </section>

              <section className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]"><FileText size={15} /> Current policy language</h3>
                  <div className="min-h-64 rounded-3xl border border-sky-100 bg-slate-50 p-5 leading-7 text-slate-700">{selected.currentText}</div>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]"><GitBranch size={15} /> Proposed replacement</h3>
                  <textarea className="min-h-64 w-full rounded-3xl border border-cyan-200 bg-cyan-50/20 p-5 leading-7 outline-none focus:ring-2 focus:ring-cyan-200" value={draftText} onChange={(event) => setDraftText(event.target.value)} />
                </div>
              </section>

              <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]">Rationale
                <textarea className="mt-2 min-h-28 w-full rounded-3xl border border-sky-100 p-4 text-base font-normal normal-case tracking-normal text-slate-900 outline-none focus:ring-2 focus:ring-sky-100" value={rationale} onChange={(event) => setRationale(event.target.value)} />
              </label>

              <section className="rounded-3xl border border-sky-100 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#005f86]"><ShieldCheck size={15} /> Proposal builder</h3>
                <input className="mb-3 w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="Proposal title" value={proposalTitle} onChange={(event) => setProposalTitle(event.target.value)} />
                <textarea className="min-h-28 w-full rounded-2xl border border-sky-100 px-4 py-3" placeholder="What should the committee decide and why?" value={proposalBody} onChange={(event) => setProposalBody(event.target.value)} />
                <button onClick={createProposal} className="mt-3 rounded-full bg-[#005f86] px-5 py-3 text-sm font-bold text-white">Create Proposal</button>
              </section>
            </div>
          </main>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-auto">
            <section className="rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><Users size={18} /> Committee thread</h2>
              <textarea className="mt-4 min-h-28 w-full rounded-2xl border border-sky-100 p-3" placeholder="Add a legal, advancement, or governance note…" value={comment} onChange={(event) => setComment(event.target.value)} />
              <button onClick={postComment} className="mt-2 w-full rounded-full bg-[#005f86] px-4 py-3 text-sm font-bold text-white">Post Comment</button>
              <div className="mt-4 space-y-2">
                {selectedComments.length ? selectedComments.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-sky-100 bg-slate-50 p-3 text-sm"><b className="text-[#005f86]">{item.author}</b><p className="mt-1 text-slate-600">{item.body}</p></div>
                )) : <p className="rounded-2xl border border-sky-100 bg-slate-50 p-3 text-sm text-slate-500">No comments on this section yet.</p>}
              </div>
            </section>

            <section className="rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-[#08324a]">Open proposals</h2>
              <div className="mt-4 space-y-3">
                {openProposals.slice(0, 6).map((proposal) => (
                  <div key={proposal.id} className="rounded-2xl border border-sky-100 bg-sky-50/50 p-3">
                    <div className="flex items-start justify-between gap-2"><b className="text-sm text-[#08324a]">{proposal.title}</b><span className="rounded-full bg-cyan-50 px-2 py-1 text-xs font-bold text-cyan-800">{proposal.status}</span></div>
                    <p className="mt-2 text-sm text-slate-600">{proposal.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-[#08324a]"><History size={18} /> Live audit trail</h2>
              <div className="mt-4 space-y-3 border-l-2 border-sky-100 pl-4">
                {state.events.slice(0, 14).map((event) => (
                  <div key={event.id} className="relative text-sm text-slate-600 before:absolute before:-left-[22px] before:top-1.5 before:h-3 before:w-3 before:rounded-full before:bg-cyan-500">
                    <b className="text-[#005f86]">{event.actor}</b> {event.type}
                    <div className="text-xs text-slate-400">{new Date(event.at).toLocaleString()}</div>
                  </div>
                ))}
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
