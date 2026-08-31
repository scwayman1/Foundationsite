import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock3,
  Columns3,
  Database,
  Download,
  Filter,
  Loader2,
  List,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Users,
  UserRound,
  X,
} from "lucide-react";

type PlanningRecord = {
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
type PlanningActivity = {
  id: string;
  action: string;
  description: string;
  recordKind: string | null;
  recordId: number | null;
  actor: string;
  createdAt: string;
};
type Snapshot = {
  records: PlanningRecord[];
  activity: PlanningActivity[];
  meta: { storage: string; durability: string; generatedAt: string };
};
type AuthSession = {
  authenticated: boolean;
  mode: "observe" | "enforced";
  user?: { id: string; email: string; name: string; role: "owner" | "editor" | "viewer"; orientationComplete: boolean };
};
type Tab = "overview" | "actions" | "completed" | "workstreams" | "activity";
type ActionView = "list" | "kanban";

type FieldDefinition = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "status" | "number";
  aliases?: string[];
};

const statusOptions = ["Not started", "In progress", "Blocked", "Done"];
const actionFields: FieldDefinition[] = [
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status" },
  { key: "dueDate", label: "Due date", aliases: ["due_date"] },
  { key: "priority", label: "Priority" },
  { key: "blocker", label: "Blocker", type: "textarea" },
  { key: "dependency", label: "Dependency", type: "textarea" },
  { key: "next_step", label: "Next step", type: "textarea" },
  { key: "evidence", label: "Evidence / source", type: "textarea" },
  { key: "latestUpdate", label: "Latest update", type: "textarea", aliases: ["latest_update"] },
];
const accomplishmentFields: FieldDefinition[] = [
  { key: "milestone", label: "Milestone", type: "textarea" },
  { key: "date", label: "Date" },
  { key: "owner", label: "Owner" },
  { key: "workstream", label: "Workstream" },
  { key: "source", label: "Evidence / source", type: "textarea" },
  { key: "notes", label: "Notes", type: "textarea" },
];
const workstreamFields: FieldDefinition[] = [
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status", type: "status" },
  { key: "completion", label: "Completion percent", type: "number" },
  { key: "milestone", label: "Milestone", type: "textarea" },
  { key: "risk", label: "Risk", type: "textarea" },
  { key: "actions", label: "Actions", type: "textarea" },
  { key: "decisions", label: "Decisions", type: "textarea" },
  { key: "dependencies", label: "Dependencies", type: "textarea" },
  { key: "questions", label: "Questions", type: "textarea" },
  { key: "output", label: "Required output", type: "textarea" },
  { key: "evidence", label: "Evidence", type: "textarea" },
  { key: "notes", label: "Notes", type: "textarea" },
];

function text(value: unknown) { return value == null ? "" : String(value); }
function planningCsrf() {
  const value = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("casino_planning_csrf="));
  return value ? decodeURIComponent(value.slice("casino_planning_csrf=".length)) : "";
}
function planningMutation(url: string, method: "POST" | "PATCH" | "DELETE", body: unknown) {
  return fetch(url, { method, credentials: "same-origin", headers: { "content-type": "application/json", "x-csrf-token": planningCsrf() }, body: JSON.stringify(body) });
}
function valueFor(record: PlanningRecord, field: FieldDefinition) {
  const direct = record.data[field.key];
  if (direct !== undefined && direct !== "") return text(direct);
  for (const alias of field.aliases || []) {
    const candidate = record.data[alias];
    if (candidate !== undefined && candidate !== "") return text(candidate);
  }
  return "";
}
function display(value: unknown, fallback = "TBD") { return text(value).trim() || fallback; }
function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (["done", "complete", "completed"].includes(normalized)) return "bg-emerald-50 text-emerald-800 ring-emerald-200";
  if (normalized === "blocked") return "bg-rose-50 text-rose-800 ring-rose-200";
  if (normalized === "in progress") return "bg-amber-50 text-amber-900 ring-amber-200";
  return "bg-slate-100 text-slate-700 ring-slate-200";
}
function humanize(key: string) {
  return key.replaceAll("_", " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());
}
function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}
function fieldsFor(record: PlanningRecord) {
  const base = record.kind === "action" ? actionFields : record.kind === "accomplishment" ? accomplishmentFields : record.kind === "workstream" ? workstreamFields : [];
  const known = new Set(base.flatMap((field) => [field.key, ...(field.aliases || [])]));
  const extras = Object.keys(record.data)
    .filter((key) => !known.has(key))
    .map((key): FieldDefinition => ({ key, label: humanize(key), type: text(record.data[key]).length > 70 ? "textarea" : "text" }));
  return [...base, ...extras];
}

function Metric({ label, value, detail, tone = "navy" }: { label: string; value: string | number; detail: string; tone?: "navy" | "gold" | "blue" | "green" }) {
  const tones = {
    navy: "border-[#dbe6ec] bg-white text-[#08324a]",
    gold: "border-[#ead9ad] bg-[#fffaf0] text-[#735918]",
    blue: "border-[#cbe8f5] bg-[#f2fbff] text-[#0b6fa4]",
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };
  return <div className={`rounded-2xl border p-4 shadow-sm ${tones[tone]}`}><p className="text-xs font-bold uppercase tracking-[.14em] opacity-70">{label}</p><p className="mt-1 text-3xl font-black tracking-tight">{value}</p><p className="mt-1 text-xs opacity-75">{detail}</p></div>;
}

function RecordEditor({ record, onClose, onSaved }: { record: PlanningRecord; onClose: () => void; onSaved: (record: PlanningRecord) => void }) {
  const definitions = fieldsFor(record);
  const [title, setTitle] = useState(record.title);
  const [data, setData] = useState<Record<string, unknown>>(() => ({ ...record.data }));
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  async function save() {
    setSaving(true); setNotice("");
    const response = await planningMutation(`/api/casino-night-planning/records/${record.id}`, "PATCH", { title, data, revision: record.revision });
    if (response.status === 409) setNotice("Someone else updated this record. Refresh the workspace and review the newest version before saving again.");
    else if (!response.ok) setNotice("This update could not be saved. Your text is still here; please try again.");
    else { onSaved(await response.json()); onClose(); }
    setSaving(false);
  }

  return <div className="mt-5 rounded-2xl border-2 border-[#8bccea] bg-[#f8fdff] p-4 shadow-inner sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Expanded editor</p><p className="mt-1 text-sm text-slate-600">Large fields are vertically resizable. Nothing saves until you select Save changes.</p></div>
      <button onClick={onClose} className="rounded-full border bg-white p-2 text-slate-500 hover:text-slate-900" aria-label="Close editor"><X size={18}/></button>
    </div>
    <label className="mt-5 block"><span className="text-sm font-bold text-[#17324d]">Action / record title</span><textarea value={title} onChange={(event) => setTitle(event.target.value)} rows={2} className="mt-2 min-h-20 w-full resize-y rounded-xl border border-[#a9cddd] bg-white px-4 py-3 text-base leading-6 shadow-sm outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10" /></label>
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      {definitions.map((field) => {
        const current = valueFor({ ...record, data }, field);
        const update = (value: string) => setData((existing) => ({ ...existing, [field.key]: field.type === "number" ? Number(value) : value }));
        return <label key={field.key} className={field.type === "textarea" ? "lg:col-span-2" : ""}><span className="text-sm font-bold text-[#17324d]">{field.label}</span>
          {field.type === "textarea" ? <textarea value={current} onChange={(event) => update(event.target.value)} rows={5} className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#a9cddd] bg-white px-4 py-3 leading-6 shadow-sm outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10" />
            : field.type === "status" ? <select value={current || "Not started"} onChange={(event) => update(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#a9cddd] bg-white px-3 shadow-sm outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10">{statusOptions.map((option) => <option key={option}>{option}</option>)}</select>
            : <input type={field.type === "number" ? "number" : "text"} value={current} onChange={(event) => update(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#a9cddd] bg-white px-4 shadow-sm outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10" />}
        </label>;
      })}
    </div>
    {notice && <p role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{notice}</p>}
    <div className="mt-5 flex flex-wrap justify-end gap-3"><button onClick={onClose} className="rounded-xl border bg-white px-4 py-2.5 font-bold text-slate-700">Cancel</button><button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-5 py-2.5 font-bold text-white shadow-sm disabled:opacity-60">{saving ? <Loader2 className="animate-spin" size={17}/> : <Save size={17}/>} Save changes</button></div>
  </div>;
}

function ActionCard({ record, onSaved, canEdit }: { record: PlanningRecord; onSaved: (record: PlanningRecord) => void; canEdit: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const status = display(record.data.status, "Not started");
  const blocker = display(record.data.blocker, "No blocker recorded");
  const latest = display(record.data.latestUpdate ?? record.data.latest_update, "No update recorded");
  return <article className={`min-w-0 rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 ${status === "Blocked" ? "border-rose-200" : "border-[#dbe6ec]"}`}>
    <div className="flex min-w-0 items-start gap-3">
      <button onClick={() => setExpanded((value) => !value)} className="mt-0.5 rounded-lg border bg-slate-50 p-2 text-[#0b6fa4]" aria-expanded={expanded} aria-label={expanded ? "Collapse action" : "Expand action"}>{expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</button>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClass(status)}`}>{status}</span><span className="text-xs font-semibold text-slate-500">{display(record.data.owner, "Unassigned")}</span></div><h3 className="mt-2 break-words text-lg font-extrabold leading-6 text-[#132746]">{record.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{latest}</p></div>
      {canEdit && <button onClick={() => { setExpanded(true); setEditing((value) => !value); }} className="rounded-lg border bg-white p-2 text-slate-500 hover:border-[#8bccea] hover:text-[#0b6fa4]" aria-label="Edit action"><Pencil size={17}/></button>}
    </div>
    {expanded && <div className="mt-5 border-t border-slate-100 pt-5">
      <dl className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div><dt className="text-xs font-black uppercase tracking-[.12em] text-slate-400">Due</dt><dd className="mt-1 text-sm font-semibold text-slate-700">{display(record.data.dueDate ?? record.data.due_date)}</dd></div>
        <div><dt className="text-xs font-black uppercase tracking-[.12em] text-slate-400">Priority</dt><dd className="mt-1 text-sm font-semibold text-slate-700">{display(record.data.priority)}</dd></div>
        <div className="md:col-span-2"><dt className="text-xs font-black uppercase tracking-[.12em] text-slate-400">Blocker</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{blocker}</dd></div>
        <div className="md:col-span-2"><dt className="text-xs font-black uppercase tracking-[.12em] text-slate-400">Dependency</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{display(record.data.dependency)}</dd></div>
        <div className="md:col-span-2"><dt className="text-xs font-black uppercase tracking-[.12em] text-slate-400">Evidence / latest update</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{display(record.data.evidence, latest)}</dd></div>
      </dl>
      {canEdit && (editing ? <RecordEditor record={record} onClose={() => setEditing(false)} onSaved={onSaved}/> : <button onClick={() => setEditing(true)} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#8bccea] bg-[#f2fbff] px-4 py-2.5 text-sm font-bold text-[#0b6fa4]"><Pencil size={16}/> Open large editor</button>)}
    </div>}
  </article>;
}

const kanbanColumns = [
  { id: "not-started", label: "Needs direction", helper: "Clarify the next move", tone: "border-slate-300 bg-slate-50", dot: "bg-slate-400" },
  { id: "in-progress", label: "In motion", helper: "Work actively moving", tone: "border-amber-300 bg-amber-50/60", dot: "bg-amber-500" },
  { id: "blocked", label: "Blocked", helper: "Intervention required", tone: "border-rose-300 bg-rose-50/60", dot: "bg-rose-500" },
  { id: "done", label: "Done", helper: "Closed with evidence", tone: "border-emerald-300 bg-emerald-50/60", dot: "bg-emerald-500" },
] as const;

function kanbanStatus(record: PlanningRecord) {
  const status = text(record.data.status).trim().toLowerCase();
  if (status === "done" || status === "complete" || status === "completed") return "done";
  if (status === "blocked") return "blocked";
  if (status === "in progress" || status === "in-progress") return "in-progress";
  return "not-started";
}

function KanbanCard({ record, onOpen, canEdit }: { record: PlanningRecord; onOpen: () => void; canEdit: boolean }) {
  const status = display(record.data.status, "Not started");
  const owner = display(record.data.owner, "Unassigned");
  const due = display(record.data.dueDate ?? record.data.due_date, "No due date");
  const priority = display(record.data.priority, "Standard");
  const next = display(record.data.next_step ?? record.data.nextStep ?? record.data.latestUpdate ?? record.data.latest_update, "Define the next concrete step.");
  const blocker = text(record.data.blocker).trim();
  const hasBlocker = Boolean(blocker) && !/^(none|no blocker|n\/a|not applicable)/i.test(blocker);
  return <article className={`rounded-2xl border bg-white p-4 shadow-sm ${kanbanStatus(record) === "blocked" ? "border-rose-200" : "border-[#dbe6ec]"}`}>
    <div className="flex items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[.08em] ring-1 ${statusClass(status)}`}>{status}</span><span className="text-[11px] font-bold uppercase tracking-[.1em] text-slate-400">{priority}</span></div>
    <p className="mt-3 text-[11px] font-black uppercase tracking-[.12em] text-[#0b6fa4]">{display(record.workstream || record.data.workstream, "General")}</p>
    <h3 className="mt-1 break-words text-base font-black leading-6 text-[#132746]">{record.title}</h3>
    <div className="mt-4 rounded-xl border border-[#d9e8ef] bg-[#f7fbfd] p-3"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#0b6fa4]">Next move</p><p className="mt-1 line-clamp-3 text-sm font-semibold leading-5 text-slate-700">{next}</p></div>
    {hasBlocker && <div className="mt-3 flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold leading-5 text-rose-800"><AlertTriangle className="mt-0.5 shrink-0" size={14}/><span className="line-clamp-2">{blocker}</span></div>}
    <dl className="mt-4 grid gap-2 text-xs text-slate-600"><div className="flex items-center gap-2"><UserRound size={14} className="text-slate-400"/><dt className="sr-only">Owner</dt><dd className="font-semibold">{owner}</dd></div><div className="flex items-center gap-2"><CalendarDays size={14} className="text-slate-400"/><dt className="sr-only">Due date</dt><dd>{due}</dd></div></dl>
    {canEdit && <button onClick={onOpen} className="mt-4 inline-flex w-full items-center justify-between rounded-xl border border-[#8bccea] bg-[#f2fbff] px-3.5 py-2.5 text-sm font-black text-[#0b6fa4] hover:bg-[#e8f7fd]">Review and update <ArrowRight size={16}/></button>}
  </article>;
}

function KanbanBoard({ records, selectedId, onSelect, onSaved, canEdit }: { records: PlanningRecord[]; selectedId: number | null; onSelect: (id: number | null) => void; onSaved: (record: PlanningRecord) => void; canEdit: boolean }) {
  const selected = selectedId == null ? null : records.find((record) => record.id === selectedId) || null;
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 0);
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onSelect(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected, onSelect]);
  return <div className="mt-4 min-w-0 max-w-full">
    {selected && <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-[2px] sm:p-8" onMouseDown={(event) => { if (event.target === event.currentTarget) onSelect(null); }}><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={`kanban-action-${selected.id}`} tabIndex={-1} className="mx-auto max-w-5xl rounded-2xl border border-[#8bccea] bg-white p-4 shadow-2xl outline-none sm:p-6"><div><p className="text-xs font-black uppercase tracking-[.14em] text-[#0b6fa4]">Selected action</p><h3 id={`kanban-action-${selected.id}`} className="mt-1 text-xl font-black text-[#132746]">{selected.title}</h3><p className="mt-2 text-sm text-slate-600">Update the owner, status, deadline, blocker, and next concrete move. Press Escape to close without saving.</p></div><RecordEditor record={selected} onClose={() => onSelect(null)} onSaved={(record) => { onSaved(record); onSelect(null); }}/></div></div>}
    <div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-3" style={{ contain: "inline-size" }}><div className="grid min-w-[1160px] grid-cols-4 gap-4 xl:min-w-0">{kanbanColumns.map((column) => {
      const columnRecords = records.filter((record) => kanbanStatus(record) === column.id);
      return <section key={column.id} className={`min-w-0 rounded-2xl border-t-4 p-3 ${column.tone}`}><header className="flex items-start justify-between gap-3 px-1 pb-3"><div><div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${column.dot}`}/><h3 className="font-black text-[#132746]">{column.label}</h3></div><p className="mt-1 text-xs text-slate-500">{column.helper}</p></div><span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-slate-600 shadow-sm">{columnRecords.length}</span></header><div className="grid gap-3">{columnRecords.map((record) => <KanbanCard key={record.id} record={record} canEdit={canEdit} onOpen={() => onSelect(record.id)}/>)}{!columnRecords.length && <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-5 text-center text-xs font-semibold text-slate-400">No actions in this lane</div>}</div></section>;
    })}</div></div>
  </div>;
}

function GenericRecordCard({ record, onSaved, canEdit }: { record: PlanningRecord; onSaved: (record: PlanningRecord) => void; canEdit: boolean }) {
  const [editing, setEditing] = useState(false);
  const status = display(record.data.status, record.kind === "accomplishment" ? "Confirmed" : "Not started");
  return <article className="min-w-0 rounded-2xl border border-[#dbe6ec] bg-white p-5 shadow-sm"><div className="flex min-w-0 items-start justify-between gap-4"><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[.14em] text-[#0b6fa4]">{humanize(record.kind)}</p><h3 className="mt-1 break-words text-xl font-extrabold text-[#132746]">{record.title}</h3><div className="mt-3 flex flex-wrap gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClass(status === "Confirmed" ? "Done" : status)}`}>{status}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{display(record.data.owner, "Unassigned")}</span></div></div>{canEdit && <button onClick={() => setEditing((value) => !value)} className="rounded-lg border p-2 text-slate-500 hover:text-[#0b6fa4]" aria-label={`Edit ${record.title}`}><Pencil size={17}/></button>}</div>
    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">{display(record.data.milestone ?? record.data.notes ?? record.data.latestUpdate, "Open this record to review the full detail.")}</p>
    {canEdit && editing && <RecordEditor record={record} onClose={() => setEditing(false)} onSaved={onSaved}/>}</article>;
}

function NewActionForm({ onClose, onCreated }: { onClose: () => void; onCreated: (record: PlanningRecord) => void }) {
  const [title, setTitle] = useState("");
  const [workstream, setWorkstream] = useState("");
  const [owner, setOwner] = useState("Unassigned");
  const [status, setStatus] = useState("Not started");
  const [latestUpdate, setLatestUpdate] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  async function create() {
    if (!title.trim()) { setNotice("Add the action item before saving."); return; }
    setSaving(true); setNotice("");
    const response = await planningMutation("/api/casino-night-planning/records", "POST", { kind: "action", title, workstream, data: { owner, status, latestUpdate, blocker: "", dependency: "", evidence: "", dueDate: "" } });
    if (!response.ok) setNotice("The action could not be saved. Your text is still here; please try again.");
    else { onCreated(await response.json()); onClose(); }
    setSaving(false);
  }
  return <div className="mt-4 rounded-2xl border-2 border-[#8bccea] bg-[#f8fdff] p-4 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">New shared action</p><h3 className="mt-1 text-xl font-black text-[#132746]">Add an item to the committee register</h3></div><button onClick={onClose} className="rounded-full border bg-white p-2 text-slate-500" aria-label="Close new action form"><X size={18}/></button></div>
    <div className="mt-4 grid gap-4 lg:grid-cols-2"><label className="lg:col-span-2"><span className="text-sm font-bold">Action item</span><textarea rows={3} value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#a9cddd] bg-white px-4 py-3 text-base leading-6 outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10"/></label><label><span className="text-sm font-bold">Workstream</span><input value={workstream} onChange={(event) => setWorkstream(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#a9cddd] bg-white px-4"/></label><label><span className="text-sm font-bold">Owner</span><input value={owner} onChange={(event) => setOwner(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#a9cddd] bg-white px-4"/></label><label><span className="text-sm font-bold">Status</span><select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-[#a9cddd] bg-white px-3">{statusOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label className="lg:col-span-2"><span className="text-sm font-bold">Latest update / context</span><textarea rows={4} value={latestUpdate} onChange={(event) => setLatestUpdate(event.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-xl border border-[#a9cddd] bg-white px-4 py-3 leading-6"/></label></div>
    {notice && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-800">{notice}</p>}<div className="mt-5 flex justify-end gap-3"><button onClick={onClose} className="rounded-xl border bg-white px-4 py-2.5 font-bold text-slate-700">Cancel</button><button onClick={create} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-5 py-2.5 font-bold text-white disabled:opacity-60">{saving ? <Loader2 className="animate-spin" size={17}/> : <Plus size={17}/>} Add action</button></div>
  </div>;
}

export default function CasinoNightPlanningStudio() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [auth, setAuth] = useState<AuthSession | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [workstream, setWorkstream] = useState("All");
  const [owner, setOwner] = useState("All");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [showNewAction, setShowNewAction] = useState(false);
  const [actionView, setActionView] = useState<ActionView>("kanban");
  const [selectedKanbanAction, setSelectedKanbanAction] = useState<number | null>(null);

  async function load() {
    setLoading(true); setNotice("");
    const response = await fetch("/api/casino-night-planning/snapshot", { cache: "no-store", credentials: "same-origin" });
    if (response.ok) setSnapshot(await response.json());
    else if (response.status === 401) setNotice("Your committee session has expired. Sign in again without closing any open work.");
    else if (response.status === 403) setNotice("Your role does not permit this action.");
    else setNotice("The shared planning database could not be loaded. No local data was substituted.");
    setLoading(false);
  }
  useEffect(() => {
    document.title = "Casino Night Planning Studio | Coastline College Foundation";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.setAttribute("name", "robots"); document.head.appendChild(robots); }
    robots.setAttribute("content", "noindex,nofollow,noarchive,nosnippet");
    fetch("/api/casino-night-auth/session", { cache: "no-store", credentials: "same-origin" })
      .then(async (response) => {
        const next = await response.json() as AuthSession; setAuth(next);
        if (next.authenticated || next.mode === "observe") await load(); else setLoading(false);
      })
      .catch(() => { setNotice("Committee access could not be verified."); setLoading(false); });
  }, []);

  const canEdit = auth?.mode === "observe" || auth?.user?.role === "owner" || auth?.user?.role === "editor";
  const records = snapshot?.records || [];
  const actions = records.filter((record) => record.kind === "action");
  const accomplishments = records.filter((record) => record.kind === "accomplishment");
  const workstreams = records.filter((record) => record.kind === "workstream" || record.kind === "contract");
  const done = actions.filter((record) => text(record.data.status).toLowerCase() === "done");
  const blocked = actions.filter((record) => text(record.data.status).toLowerCase() === "blocked");
  const inProgress = actions.filter((record) => text(record.data.status).toLowerCase() === "in progress");
  const readiness = actions.length ? Math.round((done.length / actions.length) * 100) : 0;
  const owners = useMemo(() => Array.from(new Set(actions.map((record) => display(record.data.owner, "Unassigned")))).sort(), [actions]);
  const workstreamOptions = useMemo(() => Array.from(new Set(actions.map((record) => display(record.workstream || record.data.workstream, "Unassigned")))).sort(), [actions]);
  const filteredActions = actions.filter((record) => {
    const haystack = `${record.title} ${JSON.stringify(record.data)}`.toLowerCase();
    return (!search || haystack.includes(search.toLowerCase()))
      && (status === "All" || display(record.data.status, "Not started") === status)
      && (owner === "All" || display(record.data.owner, "Unassigned") === owner)
      && (workstream === "All" || display(record.workstream || record.data.workstream, "Unassigned") === workstream);
  });
  const replaceRecord = (updated: PlanningRecord) => setSnapshot((current) => current ? { ...current, records: current.records.map((record) => record.id === updated.id ? updated : record) } : current);
  const addRecord = (created: PlanningRecord) => setSnapshot((current) => current ? { ...current, records: [...current.records, created] } : current);
  const eventDate = new Date("2026-10-17T18:00:00-07:00");
  const daysRemaining = Math.max(0, Math.ceil((eventDate.valueOf() - Date.now()) / 86_400_000));

  function exportJson() {
    if (!snapshot) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `casino-night-planning-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url);
  }

  const tabs: Array<{ id: Tab; label: string; count?: number }> = [
    { id: "overview", label: "Command center" },
    { id: "actions", label: "All actions", count: actions.length },
    { id: "completed", label: "Completed", count: done.length + accomplishments.length },
    { id: "workstreams", label: "Workstreams", count: workstreams.length },
    { id: "activity", label: "Activity", count: snapshot?.activity.length },
  ];

  if (auth && !auth.authenticated && auth.mode === "enforced") return <main className="grid min-h-screen place-items-center bg-[#f4f8fa] px-4 text-[#17324d]"><section className="w-full max-w-xl rounded-3xl border bg-white p-8 text-center shadow-xl"><ShieldCheck className="mx-auto text-[#0b6fa4]" size={42}/><h1 className="mt-5 text-3xl font-black">Committee sign-in required</h1><p className="mt-3 leading-7 text-slate-600">Open your private invitation link, or return to committee access if you already joined.</p><a href="/internal/casino-night-planning-access" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-5 py-3 font-black text-white">Go to committee access <ArrowRight size={17}/></a></section></main>;

  return <main className="min-h-screen overflow-x-hidden bg-[#f4f8fa] text-[#17324d]">
    <header className="border-b border-white/10 bg-[#082f49] text-white shadow-xl">
      <div className="mx-auto max-w-[1480px] px-4 py-6 sm:px-7 lg:px-10">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-5"><div className="min-w-0 max-w-3xl"><div className="flex min-w-0 items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f0c96b] text-[#082f49]"><ClipboardCheck size={24}/></span><div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#f0c96b] sm:text-xs sm:tracking-[.2em]">Coastline College Foundation</p><h1 className="mt-1 break-words text-2xl font-black leading-tight tracking-tight sm:text-4xl">Casino Night Planning Studio</h1></div></div><p className="mt-4 max-w-2xl text-sm leading-6 text-sky-100">A standalone committee workspace for actions, decisions, evidence, and follow-through through October 17. Operational planning only—do not enter confidential donor, payment, student, or personnel data.</p></div>
          <div className="flex flex-wrap gap-2"><a href="/internal/casino-night-planning-access" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15"><Users size={16}/> Committee access</a><button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15"><RefreshCw size={16}/> Refresh</button><button onClick={exportJson} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#082f49]"><Download size={16}/> Export snapshot</button></div></div>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs font-semibold text-sky-100"><span className="inline-flex items-center gap-2"><Database size={15} className="text-[#f0c96b]"/> Persistent SQLite database</span><span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#f0c96b]"/> Append-only activity history</span><span>Last synchronized: {snapshot?.meta?.generatedAt ? formatDate(snapshot.meta.generatedAt) : "Loading…"}</span></div>
      </div>
    </header>

    <div className="mx-auto min-w-0 max-w-[1480px] px-4 py-6 sm:px-7 lg:px-10">
      <section className="grid min-w-0 max-w-full gap-3 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Event date" value="Oct 17" detail={`${daysRemaining} days remaining`} tone="navy"/><Metric label="Readiness" value={`${readiness}%`} detail={`${done.length} of ${actions.length} actions done`} tone="blue"/><Metric label="In progress" value={inProgress.length} detail="Active action items" tone="gold"/><Metric label="Blocked" value={blocked.length} detail="Needs intervention" tone={blocked.length ? "gold" : "green"}/><Metric label="Confirmed wins" value={accomplishments.length} detail="Accomplishments recorded" tone="green"/></section>

      <nav className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-[#dbe6ec] bg-white p-2 shadow-sm" aria-label="Planning workspace sections">{tabs.map((item) => <button key={item.id} onClick={() => setTab(item.id)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${tab === item.id ? "bg-[#0b6fa4] text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}>{item.label}{item.count !== undefined && <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${tab === item.id ? "bg-white/20" : "bg-slate-100"}`}>{item.count}</span>}</button>)}</nav>

      {notice && <div role="alert" className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-semibold text-rose-800">{notice}</div>}
      {loading && !snapshot ? <div className="grid min-h-[45vh] place-items-center"><div className="text-center"><Loader2 className="mx-auto animate-spin text-[#0b6fa4]" size={38}/><p className="mt-3 font-bold text-slate-600">Loading the shared database…</p></div></div> : null}

      {snapshot && tab === "overview" && <section className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="min-w-0"><div className="flex min-w-0 flex-wrap items-end justify-between gap-4"><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Immediate focus</p><h2 className="mt-1 break-words text-2xl font-black text-[#132746]">Blocked and active actions</h2></div><button onClick={() => setTab("actions")} className="shrink-0 text-sm font-bold text-[#0b6fa4]">View all {actions.length} actions</button></div><div className="mt-4 grid min-w-0 gap-3">{[...blocked, ...inProgress].slice(0, 8).map((record) => <ActionCard key={record.id} record={record} canEdit={Boolean(canEdit)} onSaved={replaceRecord}/>)}{!blocked.length && !inProgress.length && <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">No blocked or in-progress actions are recorded.</div>}</div></div>
        <aside className="min-w-0"><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Recent movement</p><h2 className="mt-1 text-2xl font-black text-[#132746]">Committee activity</h2><div className="mt-4 rounded-2xl border border-[#dbe6ec] bg-white p-5 shadow-sm"><ol className="space-y-5">{snapshot.activity.slice(0, 10).map((event) => <li key={event.id} className="relative border-l-2 border-[#cbe8f5] pl-5"><span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#0096d6]"/><p className="text-sm font-bold text-[#17324d]">{event.description}</p><p className="mt-1 text-xs text-slate-500">{event.actor} · {formatDate(event.createdAt)}</p></li>)}</ol></div></aside>
      </section>}

      {snapshot && tab === "actions" && <section className="mt-6 min-w-0 max-w-full"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Madness checklist</p><h2 className="mt-1 text-2xl font-black text-[#132746]">Action command board</h2><p className="mt-1 text-sm text-slate-600">Switch between a complete register and a status board built around owners, deadlines, blockers, and the next move.</p></div><div className="flex flex-wrap items-center gap-2"><div role="group" aria-label="Action view" className="inline-flex rounded-xl border border-[#c8dce6] bg-white p-1 shadow-sm"><button onClick={() => { setActionView("kanban"); setSelectedKanbanAction(null); }} aria-pressed={actionView === "kanban"} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-black ${actionView === "kanban" ? "bg-[#0b6fa4] text-white" : "text-slate-600 hover:bg-slate-50"}`}><Columns3 size={16}/> Kanban</button><button onClick={() => { setActionView("list"); setSelectedKanbanAction(null); }} aria-pressed={actionView === "list"} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-black ${actionView === "list" ? "bg-[#0b6fa4] text-white" : "text-slate-600 hover:bg-slate-50"}`}><List size={16}/> List</button></div><div className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-bold text-slate-500"><Filter size={15}/>{filteredActions.length} shown</div>{canEdit && <button onClick={() => setShowNewAction((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-4 py-2.5 text-sm font-bold text-white"><Plus size={16}/> Add action</button>}</div></div>
        {canEdit && showNewAction && <NewActionForm onClose={() => setShowNewAction(false)} onCreated={addRecord}/>}
        <div className="mt-4 grid gap-3 rounded-2xl border border-[#dbe6ec] bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-5"><label className="relative sm:col-span-2"><Search className="absolute left-3 top-3.5 text-slate-400" size={17}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search actions, evidence, blockers…" className="h-11 w-full rounded-xl border pl-10 pr-3 outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10"/></label><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border bg-white px-3"><option value="All">All statuses</option>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select><select aria-label="Filter by owner" value={owner} onChange={(event) => setOwner(event.target.value)} className="h-11 rounded-xl border bg-white px-3"><option value="All">All owners</option>{owners.map((option) => <option key={option}>{option}</option>)}</select><select aria-label="Filter by workstream" value={workstream} onChange={(event) => setWorkstream(event.target.value)} className="h-11 rounded-xl border bg-white px-3"><option value="All">All workstreams</option>{workstreamOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
        {actionView === "kanban" ? <KanbanBoard records={filteredActions} selectedId={selectedKanbanAction} onSelect={setSelectedKanbanAction} onSaved={replaceRecord} canEdit={Boolean(canEdit)}/> : <div className="mt-4 grid gap-3">{filteredActions.map((record) => <ActionCard key={record.id} record={record} canEdit={Boolean(canEdit)} onSaved={replaceRecord}/>)}{!filteredActions.length && <div className="rounded-2xl border bg-white p-10 text-center"><Search className="mx-auto text-slate-300" size={34}/><p className="mt-3 font-bold text-slate-600">No actions match those filters.</p></div>}</div>}
        {actionView === "kanban" && !filteredActions.length && <div className="mt-4 rounded-2xl border bg-white p-10 text-center"><Search className="mx-auto text-slate-300" size={34}/><p className="mt-3 font-bold text-slate-600">No actions match those filters.</p></div>}
      </section>}

      {snapshot && tab === "completed" && <section className="mt-6"><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">What is already moving</p><h2 className="mt-1 text-2xl font-black text-[#132746]">Completed actions and confirmed accomplishments</h2></div><div className="mt-4 grid gap-4 xl:grid-cols-2">{[...accomplishments, ...done].map((record) => record.kind === "action" ? <ActionCard key={record.id} record={record} canEdit={Boolean(canEdit)} onSaved={replaceRecord}/> : <GenericRecordCard key={record.id} record={record} canEdit={Boolean(canEdit)} onSaved={replaceRecord}/>)}</div></section>}

      {snapshot && tab === "workstreams" && <section className="mt-6"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Planning lanes</p><h2 className="mt-1 text-2xl font-black text-[#132746]">Workstreams and procurement record</h2></div><div className="mt-4 grid gap-4 xl:grid-cols-2">{workstreams.map((record) => <GenericRecordCard key={record.id} record={record} canEdit={Boolean(canEdit)} onSaved={replaceRecord}/>)}</div></section>}

      {snapshot && tab === "activity" && <section className="mt-6"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Audit trail</p><h2 className="mt-1 text-2xl font-black text-[#132746]">Append-only activity history</h2><p className="mt-1 text-sm text-slate-600">Imported Manus history is preserved alongside every new change on the Foundation site.</p></div><div className="mt-4 overflow-hidden rounded-2xl border border-[#dbe6ec] bg-white shadow-sm"><ol className="divide-y">{snapshot.activity.map((event) => <li key={event.id} className="grid gap-2 p-4 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:px-5"><span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"><Activity size={13}/>{humanize(event.action)}</span><div><p className="text-sm font-bold text-[#17324d]">{event.description}</p><p className="mt-1 text-xs text-slate-500">{event.actor}</p></div><time className="text-xs font-semibold text-slate-400">{formatDate(event.createdAt)}</time></li>)}</ol></div></section>}

      <footer className="mt-10 border-t border-[#dbe6ec] py-6 text-xs leading-5 text-slate-500"><p><strong>{auth?.mode === "enforced" ? "Invitation-only workspace." : "Authentication rollout in progress."}</strong> Use only approved operational planning information; never enter confidential donor, payment, student, or personnel data.</p></footer>
    </div>
  </main>;
}
