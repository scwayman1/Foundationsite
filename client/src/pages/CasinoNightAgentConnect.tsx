import { useEffect, useMemo, useState } from "react";
import { Bot, Check, Clipboard, ExternalLink, KeyRound, QrCode, ShieldCheck, Smartphone } from "lucide-react";

const endpoint = "https://www.coastlinecollegefoundation.com/mcp/casino-night-planning";

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return <button onClick={copy} className="inline-flex items-center gap-2 rounded-xl bg-[#0b6fa4] px-4 py-2.5 text-sm font-black text-white shadow-sm hover:bg-[#075e8d]">{copied ? <Check size={16}/> : <Clipboard size={16}/>} {copied ? "Copied" : label}</button>;
}

export default function CasinoNightAgentConnect() {
  const [token, setToken] = useState("");
  const [agentName, setAgentName] = useState("My planning agent");
  useEffect(() => {
    document.title = "Connect an Agent | Casino Night Planning Studio";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.setAttribute("name", "robots"); document.head.appendChild(robots); }
    robots.setAttribute("content", "noindex,nofollow,noarchive,nosnippet");
  }, []);
  const hermes = useMemo(() => `hermes mcp add casino-night --url ${endpoint} --header "Authorization: Bearer ${token || "YOUR_PRIVATE_TOKEN"}" --header "X-Agent-Name: ${agentName || "My planning agent"}"`, [token, agentName]);
  const json = useMemo(() => JSON.stringify({ mcpServers: { "casino-night": { url: endpoint, headers: { Authorization: `Bearer ${token || "YOUR_PRIVATE_TOKEN"}`, "X-Agent-Name": agentName || "My planning agent" } } } }, null, 2), [token, agentName]);

  return <main className="min-h-screen overflow-x-hidden bg-[#f4f8fa] text-[#17324d]">
    <header className="bg-[#082f49] text-white shadow-xl"><div className="mx-auto max-w-6xl px-4 py-8 sm:px-7"><div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f0c96b] text-[#082f49]"><Bot size={26}/></span><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#f0c96b]">Experimental private integration</p><h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Connect an agent to the planning board</h1><p className="mt-3 max-w-3xl leading-7 text-sky-100">Use the official MCP endpoint to read actions, update form fields, and complete work without browser or computer-use automation.</p></div></div></div></header>

    <div className="mx-auto grid min-w-0 max-w-6xl gap-6 px-4 py-7 sm:px-7 lg:grid-cols-[.85fr_1.15fr]">
      <section className="min-w-0 rounded-2xl border border-[#dbe6ec] bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3"><QrCode className="shrink-0 text-[#0b6fa4]"/><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[.14em] text-[#0b6fa4]">QR handoff</p><h2 className="break-words text-xl font-black">Open this setup page anywhere</h2></div></div><div className="mx-auto mt-5 grid aspect-square w-full max-w-[300px] place-items-center rounded-2xl border border-[#d9e8ef] bg-[#f7fbfd] p-5"><img src="/internal/casino-night-agent-connect/qr.svg" alt="QR code for this secure agent setup page" className="h-auto w-full"/></div><p className="mt-4 break-words text-sm leading-6 text-slate-600">The QR contains only this setup-page URL—never the private credential. Send the token separately and rotate it if it is exposed.</p><a href="/internal/casino-night-planning-studio" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0b6fa4]">Open the planning board <ExternalLink size={15}/></a></section>

      <section className="min-w-0 rounded-2xl border border-[#dbe6ec] bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3"><KeyRound className="shrink-0 text-[#0b6fa4]"/><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[.14em] text-[#0b6fa4]">Private configuration</p><h2 className="break-words text-xl font-black">Generate your client settings</h2></div></div><div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2"><label className="min-w-0"><span className="text-sm font-bold">Agent name for the activity log</span><input value={agentName} onChange={(event) => setAgentName(event.target.value)} maxLength={80} className="mt-2 h-12 w-full min-w-0 rounded-xl border border-[#a9cddd] px-4 outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10"/></label><label className="min-w-0"><span className="text-sm font-bold">Private MCP token</span><input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" placeholder="Paste locally—never uploaded by this page" className="mt-2 h-12 w-full min-w-0 rounded-xl border border-[#a9cddd] px-4 outline-none focus:border-[#0096d6] focus:ring-4 focus:ring-[#0096d6]/10"/></label></div><div className="mt-5 break-words rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>Local-only token handling:</strong> this page uses your entry only to assemble the snippets below. It is not sent to the Foundation server or stored in browser storage.</div>

        <div className="mt-6 min-w-0"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-black">Hermes Agent</h3><CopyButton value={hermes}/></div><pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-[#082f49] p-4 text-xs leading-6 text-sky-50"><code>{hermes}</code></pre></div>
        <div className="mt-6 min-w-0"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-black">Claude, Codex, or another HTTP MCP client</h3><CopyButton value={json}/></div><pre className="mt-3 max-w-full overflow-x-auto rounded-xl bg-[#082f49] p-4 text-xs leading-6 text-sky-50"><code>{json}</code></pre></div>
      </section>

      <section className="min-w-0 rounded-2xl border border-[#dbe6ec] bg-white p-5 shadow-sm sm:p-7 lg:col-span-2"><div className="grid min-w-0 gap-5 md:grid-cols-3"><div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-700"/><div><h3 className="font-black">Scoped operations</h3><p className="mt-1 text-sm leading-6 text-slate-600">Agents can read, create, update, and complete actions. Archive/delete is intentionally unavailable.</p></div></div><div className="flex gap-3"><Clipboard className="mt-0.5 shrink-0 text-[#0b6fa4]"/><div><h3 className="font-black">Revision-safe writes</h3><p className="mt-1 text-sm leading-6 text-slate-600">Every update requires the current record revision, preventing silent stale overwrites.</p></div></div><div className="flex gap-3"><Smartphone className="mt-0.5 shrink-0 text-[#0b6fa4]"/><div><h3 className="font-black">Activity attribution</h3><p className="mt-1 text-sm leading-6 text-slate-600">MCP changes are written into the existing append-only activity history with the supplied agent name.</p></div></div></div></section>
    </div>
  </main>;
}
