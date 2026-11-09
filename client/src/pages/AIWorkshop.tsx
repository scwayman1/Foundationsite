import { useEffect } from "react";
import { ArrowRight, CalendarDays, Clock3, MapPin, Laptop, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trackWorkshopRegistrationClick } from "@/lib/measurement";

const registrationUrl = "https://www.gradroots.com/tickets/3LR2tJbGcjFAbwo64CUiyvOuBTh";
const outcomes = [
  "Understand what AI agents are and how they can support everyday business work.",
  "Identify high-impact opportunities in your own repetitive workflows.",
  "Build your first agent in a Chief of Staff, Finance/CFO, or Sales track.",
  "See a live CFO-agent demonstration and explore an AI organization chart.",
  "Leave with a 30-day implementation plan to put your learning into practice.",
];
const agenda = [
  ["5:30–6:00 p.m.", "From ChatGPT to AI employee", "An introduction to AI agents and their role in a local business."],
  ["6:00–6:30 p.m.", "Find your first opportunity", "Identify a repetitive workflow you want to improve."],
  ["6:30–7:00 p.m.", "Build your first agent", "Hands-on work in a Chief of Staff, Finance/CFO, or Sales track."],
  ["7:00–7:30 p.m.", "Your AI org chart and next steps", "Connect the pieces and create your 30-day implementation plan."],
];

function RegisterLink({ placement }: { placement: string }) {
  return <Button asChild className="h-auto whitespace-normal rounded-xl bg-[#0096d6] px-6 py-4 font-semibold text-white hover:bg-[#0284bc]">
    <a href={registrationUrl} onClick={() => trackWorkshopRegistrationClick(placement)}>Register on GradRoots <ArrowRight className="ml-2 shrink-0" size={18} /></a>
  </Button>;
}

export default function AIWorkshop() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "AI Agents Workshop · December 2, 2026 | Coastline College Foundation";
    return () => { document.title = previousTitle; };
  }, []);
  return <div className="bg-[#f7fbfe] text-slate-700">
    <section className="relative overflow-hidden bg-[#06263a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,150,214,0.25),transparent_60%)]" />
      <div className="container relative py-14 md:py-20">
        <Link href="/events" className="mb-7 inline-block text-sm font-semibold text-[#8fddff] hover:underline">← Foundation events</Link>
        <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#8fddff]">Hands-on learning for local business owners</p>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">AI Agents Workshop for Business Owners</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">Turn repetitive work into an opportunity for growth. Explore practical AI tools, build your first agent, and plan your next 30 days.</p>
            <p className="mt-5 leading-7 text-slate-200">Co-presented by Coastline College Foundation and Fountain Valley Chamber of Commerce. Facilitated by Scott Wayman.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4"><RegisterLink placement="hero" /><a href="#registration" className="font-semibold text-[#8fddff] underline underline-offset-4">How to register for free</a></div>
            <p className="mt-4 text-sm leading-6 text-slate-200">Enter coupon <strong className="text-white">WORKSHOPFREE</strong> manually at checkout for free registration.</p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-7 shadow-lg">
            <h2 className="mb-6 font-heading text-2xl font-bold">Plan your evening</h2>
            <dl className="space-y-6">
              <div className="flex gap-4"><CalendarDays className="shrink-0 text-[#8fddff]" /><div><dt className="text-sm text-slate-300">Wednesday</dt><dd className="font-semibold">December 2, 2026</dd></div></div>
              <div className="flex gap-4"><Clock3 className="shrink-0 text-[#8fddff]" /><div><dt className="text-sm text-slate-300">Workshop · Pacific time</dt><dd className="font-semibold">5:30–7:30 p.m.</dd><dd className="mt-1 text-sm text-slate-200">Doors open at 5:00 p.m.</dd></div></div>
              <div className="flex gap-4"><MapPin className="shrink-0 text-[#8fddff]" /><div><dt className="text-sm text-slate-300">Coastline College · Fountain Valley campus</dt><dd className="font-semibold">Room 109</dd><dd className="mt-1 text-sm leading-6 text-slate-200">11460 Warner Ave.<br />Fountain Valley, CA 92708</dd></div></div>
              <div className="flex gap-4"><Laptop className="shrink-0 text-[#8fddff]" /><div><dt className="font-semibold">Bring your laptop</dt><dd className="mt-1 text-sm text-slate-200">48 seats · Registration required</dd></div></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <nav aria-label="Workshop sections" className="border-b border-sky-100 bg-white">
      <div className="container flex flex-wrap gap-x-7 gap-y-3 py-5 text-sm font-semibold text-[#0b6fa4]">
        <a className="hover:underline" href="#learn">What you’ll learn</a><a className="hover:underline" href="#agenda">Evening agenda</a><a className="hover:underline" href="#location">Location & preparation</a><a className="hover:underline" href="#registration">Free registration</a>
      </div>
    </nav>
    <div className="container grid gap-12 py-14 md:py-20 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-14">
        <section id="learn" className="scroll-mt-28">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#0b6fa4]">Practical tools. Your business.</p>
          <h2 className="font-heading text-3xl font-bold text-[#08324a]">Move from curiosity to a first agent</h2>
          <p className="mt-5 leading-8">This educational workshop is designed for local business owners who want to explore how AI agents can help with recurring tasks. Bring a workflow from your business and a laptop for the hands-on portion.</p>
          <ul className="mt-6 space-y-4">{outcomes.map(outcome => <li key={outcome} className="flex gap-3 leading-7"><CheckCircle2 size={21} className="mt-1 shrink-0 text-[#0b6fa4]" /><span>{outcome}</span></li>)}</ul>
        </section>
        <section id="agenda" className="scroll-mt-28">
          <h2 className="mb-6 font-heading text-3xl font-bold text-[#08324a]">Your evening agenda</h2>
          <ol className="overflow-hidden rounded-3xl border border-sky-100 bg-white">{agenda.map(([time, title, detail]) => <li key={time} className="border-b border-sky-100 p-6 last:border-0"><p className="text-sm font-semibold text-[#0b6fa4]">{time}</p><h3 className="mt-2 font-heading text-xl font-bold text-[#08324a]">{title}</h3><p className="mt-2 leading-7">{detail}</p></li>)}</ol>
          <p className="mt-5 text-sm leading-7">The evening also includes a brief introduction to planned giving and Foundation services.</p>
        </section>
        <section id="location" className="scroll-mt-28">
          <h2 className="font-heading text-3xl font-bold text-[#08324a]">Location & preparation</h2>
          <p className="mt-5 leading-8">Join us in <strong>Room 109</strong> at Coastline College’s Fountain Valley campus, <strong>11460 Warner Ave., Fountain Valley, CA 92708</strong>. Doors open at 5:00 p.m.; the workshop begins at 5:30 p.m. and ends at 7:30 p.m. Pacific.</p>
          <p className="mt-4 leading-8">Bring your laptop and an example of repetitive work from your business. For event questions or accessibility arrangements, contact <a href="mailto:foundation@coastline.edu" className="font-semibold text-[#0b6fa4] underline">foundation@coastline.edu</a> or <a href="tel:+17142416154" className="font-semibold text-[#0b6fa4] underline">(714) 241-6154</a>.</p>
        </section>
        <section className="rounded-3xl border border-sky-100 bg-white p-7">
          <h2 className="font-heading text-2xl font-bold text-[#08324a]">Learning that connects our community</h2>
          <p className="mt-4 leading-8">Coastline College Foundation supports student opportunity and connects community partners with Coastline’s educational mission. This workshop brings local business owners together for practical learning, alongside an introduction to the Foundation’s services and planned giving.</p>
          <Link href="/about" className="mt-4 inline-block font-semibold text-[#0b6fa4] underline">Learn about the Foundation</Link>
        </section>
      </div>
      <aside className="space-y-7">
        <section id="registration" className="scroll-mt-28 rounded-3xl border border-sky-100 bg-white p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0b6fa4]">Free with coupon</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-[#08324a]">Reserve your workshop seat</h2>
          <p className="mt-4 leading-7">Registration is handled by GradRoots. Use the code below to make your ticket free.</p>
          <div className="my-6 rounded-2xl border border-dashed border-sky-300 bg-sky-50 p-5"><p className="text-sm text-[#08324a]">Enter this coupon at checkout:</p><p className="mt-2 break-all font-mono text-2xl font-bold text-[#08324a]">WORKSHOPFREE</p></div>
          <ol className="mb-7 list-decimal space-y-3 pl-5 leading-7"><li>Open registration on GradRoots and select your ticket.</li><li>Manually enter <strong>WORKSHOPFREE</strong> in the coupon field and apply it.</li><li>Confirm your total is <strong>$0</strong> before submitting your registration.</li></ol>
          <RegisterLink placement="registration" />
          <p className="mt-4 text-sm leading-6">The coupon is not applied automatically. Capacity: 48 seats.</p>
          <p className="mt-4 text-xs leading-6 text-slate-500">You’ll leave the Foundation website to register. GradRoots handles the information you provide during registration.</p>
        </section>
        <a href="/ai-agents-workshop.png" className="block overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm"><img src="/ai-agents-workshop.png" alt="AI Agents Workshop event flyer. Event details and free registration instructions are provided on this page." className="h-auto w-full" loading="lazy" /><span className="block p-4 text-center text-sm font-semibold text-[#0b6fa4]">Open workshop flyer</span></a>
      </aside>
    </div>
  </div>;
}
