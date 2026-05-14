import { ArrowLeft, CalendarDays, Clock3, MapPin, ArrowRight, Sparkles, ExternalLink, Video, FileText, CarFront } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { foundationEvents } from "@/data/events";
import { photosByRole } from "@/data/photos";

function statusClass(status: string) {
  if (status === "Registration Open") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Upcoming") return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
}

export default function EventPost() {
  const [, params] = useRoute("/events/:slug");
  const event = foundationEvents.find((entry) => entry.slug === params?.slug);
  const eventHeroPhotos = photosByRole("event-hero");
  const eventDetailPhotos = photosByRole("event-detail");
  const useGenericPhotos = event?.useGenericPhotos !== false;
  const heroPhoto = useGenericPhotos ? eventHeroPhotos[0] ?? eventDetailPhotos[0] : undefined;
  const detailPhoto = useGenericPhotos ? eventDetailPhotos[0] ?? heroPhoto : undefined;

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f7fbfe] px-6">
        <div className="max-w-xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">Events</p>
          <h1 className="mb-4 text-3xl font-heading font-bold text-[#08324a]">Event not found</h1>
          <p className="mb-6 leading-7 text-slate-600">This event may have moved, been renamed, or not been published yet.</p>
          <Button asChild className="rounded-xl bg-[#0096d6] text-white hover:bg-[#0284bc]">
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fbfe]">
      <section className="relative overflow-hidden bg-[#06263a] text-white">
        <img
          src={heroPhoto?.src || event.featuredImage}
          alt={heroPhoto?.alt || event.featuredAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
          style={{ objectPosition: heroPhoto?.objectPosition || "center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,38,58,0.97)_0%,rgba(7,53,82,0.9)_48%,rgba(10,33,52,0.95)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-[0.05]" />
        <div className="container relative z-10 py-18 md:py-22">
          <Link href="/events">
            <a className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-200/90 transition-colors hover:text-white"><ArrowLeft size={14} /> Back to Events</a>
          </Link>
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass(event.status)} bg-white/92`}>{event.status}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-md"><Sparkles size={12} className="text-[#8fddff]" /> Foundation Event</span>
            </div>
            <h1 className="mb-5 text-4xl font-heading font-bold leading-[1.02] md:text-6xl">{event.title}</h1>
            <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-200/92 md:text-xl">{event.excerpt}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-[#8fddff]"><CalendarDays size={16} /></div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">Date</p>
                <p className="font-semibold text-white">{event.dateLabel}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-[#8fddff]"><Clock3 size={16} /></div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">Time</p>
                <p className="font-semibold text-white">{event.timeLabel}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-[#8fddff]"><MapPin size={16} /></div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">Location</p>
                <p className="font-semibold text-white">{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-12 z-20 pb-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
            <article className="overflow-hidden rounded-[30px] border border-sky-100 bg-white shadow-[0_20px_48px_rgba(6,38,58,0.08)]">
              <div className="relative h-[320px] overflow-hidden md:h-[420px]">
                <img
                  src={detailPhoto?.src || event.featuredImage}
                  alt={detailPhoto?.alt || event.featuredAlt}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: detailPhoto?.objectPosition || "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/55 via-transparent to-transparent" />
              </div>
              <div className="px-7 py-8 md:px-10 md:py-12">
                <div className="prose prose-slate max-w-none prose-p:text-[16px] prose-p:leading-8 prose-p:text-slate-600 prose-headings:text-[#08324a]">
                  {event.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {event.livestreamEmbed ? (
                  <div className="mt-10 rounded-[28px] border border-sky-100 bg-[#f7fbfe] p-5 md:p-6">
                    <div className="mb-4 flex items-center gap-2 text-[#08324a]">
                      <Video size={18} className="text-[#0b6fa4]" />
                      <h2 className="text-2xl font-heading font-bold">Livestream</h2>
                    </div>
                    <div className="overflow-hidden rounded-[22px] border border-sky-100 bg-white shadow-sm">
                      <div className="aspect-video">
                        <iframe
                          className="h-full w-full"
                          src={event.livestreamEmbed}
                          title={`${event.title} livestream`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {event.resources?.length ? (
                  <div className="mt-10">
                    <div className="mb-5 flex items-center gap-2 text-[#08324a]">
                      <FileText size={18} className="text-[#0b6fa4]" />
                      <h2 className="text-2xl font-heading font-bold">Planning resources</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {event.resources.map((resource, index) => {
                        const Icon = index === 0 ? CarFront : index === 3 ? Video : FileText;
                        return (
                          <a
                            key={resource.href}
                            href={resource.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-[24px] border border-sky-100 bg-[#f7fbfe] p-5 transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-[0_16px_30px_rgba(6,38,58,0.06)]"
                          >
                            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-white text-[#0b6fa4] shadow-sm">
                              <Icon size={18} />
                            </div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-heading font-bold text-[#08324a]">{resource.label}</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-600">{resource.description}</p>
                              </div>
                              <ExternalLink size={16} className="mt-1 text-[#0b6fa4] transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {event.etiquette?.length ? (
                  <div className="mt-10 rounded-[28px] border border-sky-100 bg-white p-6 md:p-7 shadow-sm">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">Ceremony etiquette</p>
                    <h2 className="mb-4 text-2xl font-heading font-bold text-[#08324a]">Help us keep the ceremony joyful and respectful</h2>
                    <p className="mb-5 text-sm leading-7 text-slate-600">A few simple expectations help every graduate and family enjoy the moment.</p>
                    <ul className="space-y-3">
                      {event.etiquette.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-slate-600">
                          <span className="mt-2 size-2 rounded-full bg-[#0b6fa4]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>

            <aside className="rounded-[28px] border border-sky-100 bg-white p-6 md:p-7 shadow-[0_16px_34px_rgba(6,38,58,0.06)] lg:sticky lg:top-24">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">Attend this event</p>
              <h2 className="mb-3 text-2xl font-heading font-bold leading-tight text-[#08324a]">Watch live or prepare for the evening</h2>
              <p className="mb-6 text-sm leading-7 text-slate-600">
                Use the key resources on this page to watch the livestream, review the program, plan arrival, and share the ceremony with family and friends.
              </p>
              <Button asChild className="mb-4 w-full rounded-xl bg-[#0096d6] font-semibold text-white btn-premium hover:bg-[#0284bc]">
                <a href={event.ctaHref} target="_blank" rel="noreferrer">
                  {event.ctaLabel} <ArrowRight size={15} className="ml-2" />
                </a>
              </Button>
              <div className="rounded-[20px] border border-sky-100 bg-[#f7fbfe] p-5 text-sm text-slate-600">
                <p className="mb-2 font-semibold text-[#08324a]">Questions?</p>
                <p className="leading-7">
                  For ceremony questions, guests can contact Student Life at <a className="font-semibold text-[#0b6fa4] hover:underline" href="mailto:studentlife@coastline.edu">studentlife@coastline.edu</a>.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
