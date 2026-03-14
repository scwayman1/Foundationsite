import { ArrowLeft, CalendarDays, Clock3, MapPin, ArrowRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { foundationEvents } from "@/data/events";

function statusClass(status: string) {
  if (status === "Registration Open") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Upcoming") return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
}

export default function EventPost() {
  const [, params] = useRoute("/events/:slug");
  const event = foundationEvents.find((entry) => entry.slug === params?.slug);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f7fbfe] px-6">
        <div className="max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">Events</p>
          <h1 className="text-3xl font-heading font-bold text-[#08324a] mb-4">Event not found</h1>
          <p className="text-slate-600 leading-7 mb-6">This event may have moved, been renamed, or not been published yet.</p>
          <Link href="/events"><Button className="bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl">Back to Events</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7fbfe] min-h-screen">
      <section className="relative overflow-hidden bg-white border-b border-sky-100">
        <div className="container py-16 md:py-20">
          <Link href="/events">
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6fa4] hover:text-[#08324a] transition-colors mb-8"><ArrowLeft size={14} /> Back to Events</a>
          </Link>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass(event.status)}`}>{event.status}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#08324a] leading-[1.05] mb-5">{event.title}</h1>
            <p className="text-lg text-slate-600 leading-8 mb-6 max-w-3xl">{event.excerpt}</p>
            <div className="space-y-3 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2"><CalendarDays size={14} /> {event.dateLabel}</div>
              <div className="inline-flex items-center gap-2"><Clock3 size={14} /> {event.timeLabel}</div>
              <div className="inline-flex items-center gap-2"><MapPin size={14} /> {event.location}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_18px_34px_rgba(6,38,58,0.06)]">
            <img src={event.featuredImage} alt={event.featuredAlt} className="h-[360px] md:h-[460px] w-full object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
            <article className="rounded-[28px] border border-sky-100 bg-white px-7 py-8 md:px-10 md:py-12 shadow-sm">
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-8 prose-p:text-[16px] prose-headings:text-[#08324a]">
                {event.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
            <aside className="rounded-[24px] border border-sky-100 bg-[#eaf6fb] p-6 md:p-7 shadow-sm lg:sticky lg:top-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">Next step</p>
              <h2 className="text-2xl font-heading font-bold text-[#08324a] leading-tight mb-3">Stay connected to Foundation activity</h2>
              <p className="text-slate-600 leading-7 text-sm mb-6">Events give Coastline another durable surface for stewardship, participation, and follow-through beyond a one-time announcement.</p>
              <Link href={event.ctaHref}>
                <Button className="w-full bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl font-semibold btn-premium">{event.ctaLabel} <ArrowRight size={15} className="ml-2" /></Button>
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
