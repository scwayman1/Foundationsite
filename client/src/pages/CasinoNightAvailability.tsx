import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, PartyPopper, Users } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = Array.from({ length: 17 }, (_, index) => {
  const hour = 8 + Math.floor(index / 2); const minutes = index % 2 ? 30 : 0;
  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});
const label = (time: string) => new Date(`2026-01-01T${time}:00`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const slot = (day: number, time: string) => `${day}-${time}`;

export default function CasinoNightAvailability() {
  const resultsMode = window.location.pathname.endsWith("/results");
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]); const [notice, setNotice] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const [results, setResults] = useState<{ responseCount: number; counts: Record<string, number> } | null>(null);
  const toggle = (value: string) => setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  async function submit() {
    setNotice("");
    const response = await fetch("/api/casino-night-availability/responses", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, email, slots: selected }) });
    if (response.ok) {
      setNotice("Thank you — your availability has been saved.");
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 2400);
    } else setNotice("Please add your name, email, and at least one available time.");
  }
  async function loadResults() { const response = await fetch("/api/casino-night-availability/results"); if (response.ok) setResults(await response.json()); }
  useEffect(() => {
    document.title = resultsMode ? "Casino Night Availability Results" : "Casino Night Planning Availability";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.setAttribute("name", "robots"); document.head.appendChild(robots); }
    robots.setAttribute("content", "noindex,nofollow,noarchive,nosnippet");
    if (resultsMode) loadResults();
  }, [resultsMode]);
  const best = useMemo(() => Object.entries(results?.counts || {}).sort((a, b) => b[1] - a[1]).slice(0, 8), [results]);
  if (resultsMode) return <main className="min-h-screen bg-slate-50 py-10"><section className="container max-w-5xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#0b6fa4]">Coastline College Foundation</p><h1 className="mt-2 text-4xl text-[#08324a]">Casino Night planning availability</h1><div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm"><div className="flex items-center gap-3 text-lg font-semibold text-slate-700"><Users className="text-[#0096d6]" /> {results?.responseCount ?? 0} responses</div><div className="mt-5 grid gap-3 md:grid-cols-2">{best.map(([value, count]) => { const [day, time] = value.split("-"); return <div key={value} className="rounded-xl bg-sky-50 p-4 text-slate-800"><b>{days[Number(day)]} · {label(time)}</b><span className="float-right rounded-full bg-[#08324a] px-3 py-1 text-sm text-white">{count} available</span></div>; })}</div><button onClick={loadResults} className="mt-6 rounded-lg bg-[#08324a] px-4 py-2 text-white">Refresh results</button></div></section></main>;
  return <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 py-8"><section className="container max-w-6xl"><div className="rounded-3xl bg-[#08324a] px-7 py-8 text-white shadow-xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#f7d47a]">Coastline College Foundation · 50th Anniversary</p><h1 className="mt-3 text-4xl">Casino Night planning availability</h1><p className="mt-3 max-w-2xl text-sky-100">Help us select a recurring 30-minute weekly planning meeting through October. Mark every time that typically works for you. All times are Pacific.</p></div><div className="mt-6 grid gap-6 lg:grid-cols-[.8fr_2fr]"><aside className="relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm"><h2 className="font-bold text-[#08324a]">Your details</h2><label className="mt-4 block text-sm font-semibold">Name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border p-2.5" /></label><label className="mt-4 block text-sm font-semibold">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border p-2.5" /></label><p className="mt-5 text-sm text-slate-600">Your individual selections are used only to coordinate this planning group.</p><button onClick={submit} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0096d6] px-4 py-3 font-bold text-white"><CheckCircle2 size={18} /> Save availability</button>{notice && <p className="mt-3 text-sm font-semibold text-[#0b6fa4]">{notice}</p>}{celebrating && <div role="status" className="absolute inset-0 grid place-items-center bg-[#08324a]/95 p-6 text-center text-white animate-in fade-in duration-200"><div className="rounded-2xl bg-white/10 p-6"><PartyPopper className="mx-auto mb-3 text-[#f7d47a]" size={42}/><p className="text-xl font-bold">You’re on the board.</p><p className="mt-1 text-sm text-sky-100">Your availability is in — thank you for helping us find the best time.</p></div></div>}</aside><div className="overflow-x-auto rounded-2xl border bg-white p-4 shadow-sm"><div className="mb-4 flex items-center gap-2 text-[#08324a]"><CalendarDays /> <h2 className="font-bold">Select the times that work</h2></div><div className="min-w-[760px] grid grid-cols-[95px_repeat(17,minmax(42px,1fr))] gap-1 text-center text-xs"><div></div>{times.map((time) => <div key={time} className="pb-2 text-slate-500"><Clock3 className="mx-auto mb-1" size={13}/>{label(time)}</div>)}{days.map((day, dayIndex) => <><div key={`${day}-label`} className="flex items-center font-bold text-[#08324a]">{day}</div>{times.map((time) => { const value = slot(dayIndex, time); const active = selected.includes(value); return <button key={value} onClick={() => toggle(value)} aria-pressed={active} className={`h-11 rounded-md border transition ${active ? "border-[#006eb6] bg-[#0096d6] text-white" : "border-sky-100 bg-sky-50 hover:bg-sky-100"}`}><span className="sr-only">{day} {label(time)}</span>{active ? "✓" : ""}</button>; })}</>)}</div><p className="mt-4 text-sm text-slate-600">Selected: {selected.length} time{selected.length === 1 ? "" : "s"}. You can update your response later using the same email address.</p></div></div></section></main>;
}
