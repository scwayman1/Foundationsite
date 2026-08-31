import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardCopy, KeyRound, Loader2, ShieldCheck, UserPlus, Users } from "lucide-react";

type User = { id: string; email: string; name: string; role: "owner" | "editor" | "viewer"; orientationComplete: boolean };
type Session = { authenticated: boolean; user?: User; mode: "observe" | "enforced" };

function cookie(name: string) {
  return document.cookie.split(";").map((value) => value.trim()).find((value) => value.startsWith(`${name}=`))?.slice(name.length + 1) || "";
}
async function mutation(url: string, body: unknown) {
  return fetch(url, { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json", "x-csrf-token": decodeURIComponent(cookie("casino_planning_csrf")) }, body: JSON.stringify(body) });
}

export default function CasinoNightPlanningAccess() {
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(true);
  const [notice, setNotice] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [members, setMembers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", role: "editor" });

  async function refresh() {
    const response = await fetch("/api/casino-night-auth/session", { cache: "no-store", credentials: "same-origin" });
    const next = await response.json() as Session; setSession(next);
    if (next.authenticated && next.user?.role === "owner") {
      const admin = await fetch("/api/casino-night-auth/users", { cache: "no-store", credentials: "same-origin" });
      if (admin.ok) setMembers((await admin.json()).users);
    }
    setBusy(false);
  }
  useEffect(() => {
    document.title = "Casino Night Committee Access | Coastline College Foundation";
    const token = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("invite");
    if (!token) { refresh(); return; }
    fetch("/api/casino-night-auth/redeem", { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ token }) })
      .then(async (response) => {
        history.replaceState({}, "", "/internal/casino-night-planning-access");
        if (!response.ok) throw new Error("That invitation is invalid, expired, or already used.");
        await refresh();
      }).catch((error) => { history.replaceState({}, "", "/internal/casino-night-planning-access"); setNotice(error.message); setBusy(false); });
  }, []);

  async function completeOrientation() {
    setBusy(true); const response = await mutation("/api/casino-night-auth/orientation", {});
    if (!response.ok) setNotice("Your orientation could not be saved. Please try again.");
    await refresh();
  }
  async function createInvite() {
    setBusy(true); setNotice(""); setInviteUrl("");
    const response = await mutation("/api/casino-night-auth/invites", form);
    const body = await response.json();
    if (!response.ok) setNotice(body.error || "The invitation could not be created.");
    else { setInviteUrl(body.invite.url); setForm({ name: "", email: "", role: "editor" }); }
    setBusy(false);
  }
  async function signOut() { await mutation("/api/casino-night-auth/logout", {}); location.href = "/internal/casino-night-planning-access"; }

  if (busy && !session) return <main className="grid min-h-screen place-items-center bg-[#f4f8fa]"><Loader2 className="animate-spin text-[#0b6fa4]" size={38}/></main>;
  const user = session?.user;
  return <main className="min-h-screen bg-[#f4f8fa] px-4 py-8 text-[#17324d] sm:py-14">
    <div className="mx-auto max-w-4xl">
      <header className="overflow-hidden rounded-3xl bg-[#082f49] p-6 text-white shadow-xl sm:p-10">
        <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f0c96b] text-[#082f49]"><KeyRound size={25}/></span><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#f0c96b]">Coastline College Foundation</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Casino Night committee access</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100">Invitation-only access with clear roles, attributable updates, and a two-minute orientation.</p></div></div>
      </header>

      {notice && <div role="alert" className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-semibold text-rose-800">{notice}</div>}

      {!user && <section className="mt-6 rounded-3xl border border-[#dbe6ec] bg-white p-6 shadow-sm sm:p-9"><ShieldCheck className="text-[#0b6fa4]" size={34}/><h2 className="mt-4 text-2xl font-black">An invitation is required</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600">Open the private invitation link sent by a committee owner. Each link is single-use and expires automatically. If you expected an invitation, ask the Foundation team to resend it.</p><p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">No password is required. Your secure session remains on this device, and you can sign out at any time.</p></section>}

      {user && !user.orientationComplete && <section className="mt-6 rounded-3xl border border-[#dbe6ec] bg-white p-6 shadow-sm sm:p-9"><p className="text-xs font-black uppercase tracking-[.16em] text-[#0b6fa4]">Welcome, {user.name}</p><h2 className="mt-2 text-2xl font-black">Three things before you enter</h2><div className="mt-6 grid gap-4 sm:grid-cols-3">{[
        ["Follow the next move", "Use each action’s owner, deadline, blocker, and next step to keep work moving."],
        ["Leave a clear trail", "Add concrete updates and evidence. Changes are attributed to your signed-in identity."],
        ["Keep sensitive data out", "Do not enter donor, payment, student, personnel, or other confidential information."],
      ].map(([title, copy]) => <div key={title} className="rounded-2xl border bg-[#f8fdff] p-5"><CheckCircle2 className="text-emerald-600"/><h3 className="mt-3 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div>)}</div><button onClick={completeOrientation} disabled={busy} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-5 py-3 font-black text-white">I understand—enter the workspace <ArrowRight size={17}/></button></section>}

      {user?.orientationComplete && <section className="mt-6 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-9"><div className="flex flex-wrap items-center justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Signed in as {user.role}</p><h2 className="mt-2 text-2xl font-black">You’re ready to work</h2><p className="mt-2 text-slate-600">Your changes will appear under {user.name}.</p></div><a href="/internal/casino-night-planning-studio" className="inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-5 py-3 font-black text-white">Open planning studio <ArrowRight size={17}/></a></div></section>}

      {user?.role === "owner" && user.orientationComplete && <section className="mt-6 rounded-3xl border border-[#dbe6ec] bg-white p-6 shadow-sm sm:p-9"><div className="flex items-start gap-3"><UserPlus className="text-[#0b6fa4]"/><div><h2 className="text-xl font-black">Invite a committee member</h2><p className="mt-1 text-sm text-slate-600">Editor is the simple default. Viewer is read-only. Owner can manage access.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><input aria-label="Name" placeholder="Full name" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} className="h-12 rounded-xl border px-4"/><input aria-label="Email" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} className="h-12 rounded-xl border px-4"/><select aria-label="Role" value={form.role} onChange={(e) => setForm({...form,role:e.target.value})} className="h-12 rounded-xl border bg-white px-3"><option value="editor">Editor</option><option value="viewer">Viewer</option><option value="owner">Owner</option></select></div><button onClick={createInvite} disabled={busy || !form.name || !form.email} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-5 py-3 font-black text-white disabled:opacity-50"><UserPlus size={17}/> Create private invitation</button>{inviteUrl && <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-black text-amber-900">Copy this link now—it is shown only once.</p><div className="mt-2 flex gap-2"><input readOnly value={inviteUrl} className="min-w-0 flex-1 rounded-lg border bg-white px-3 text-xs"/><button onClick={() => navigator.clipboard.writeText(inviteUrl)} className="rounded-lg bg-[#082f49] p-3 text-white" aria-label="Copy invitation link"><ClipboardCopy size={17}/></button></div></div>}<div className="mt-7 border-t pt-5"><div className="flex items-center gap-2"><Users size={18}/><h3 className="font-black">Current members ({members.length})</h3></div><div className="mt-3 grid gap-2">{members.map((member) => <div key={member.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm"><span><strong>{member.name}</strong> · {member.email}</span><span className="rounded-full bg-white px-2.5 py-1 text-xs font-black uppercase">{member.role}</span></div>)}</div></div></section>}

      {user && <div className="mt-6 text-center"><button onClick={signOut} className="text-sm font-bold text-slate-500 underline">Sign out of this device</button></div>}
    </div>
  </main>;
}
