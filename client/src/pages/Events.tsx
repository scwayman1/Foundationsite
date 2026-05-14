import { CalendarDays, Clock3, MapPin, ArrowRight, Ticket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { foundationEvents } from "@/data/events";
import { photosByRole } from "@/data/photos";
import PhotoAcknowledgment from "@/components/PhotoAcknowledgment";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

function statusClass(status: string) {
  if (status === "Registration Open") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Upcoming") return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-slate-100 text-slate-600 border-slate-200";
}

const featuredEvent = foundationEvents[0];
const remainingEvents = foundationEvents.slice(1);
const eventGalleryPhotos = photosByRole("event-gallery");
const eventHeroPhotos = photosByRole("event-hero");
const eventFeaturePhotos = photosByRole("event-feature");
const eventCardPhotos = photosByRole("event-card");
const featuredPhoto = featuredEvent.useGenericPhotos === false ? undefined : eventHeroPhotos[0] ?? eventFeaturePhotos[0] ?? eventGalleryPhotos[0];
const featuredPanelPhoto = featuredEvent.useGenericPhotos === false ? undefined : eventFeaturePhotos[0] ?? featuredPhoto;

export default function Events() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6fbfd]">
      <section className="relative overflow-hidden bg-[#06263a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(143,221,255,0.18),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.14),transparent_26%)]" />
        <img
          src={featuredPhoto?.src}
          alt={featuredPhoto?.alt || "Coastline Foundation event setting"}
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"
          style={{ objectPosition: featuredPhoto?.objectPosition || "center 35%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,38,58,0.97)_0%,rgba(7,53,82,0.9)_48%,rgba(10,33,52,0.95)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="absolute -bottom-24 right-[-10%] h-72 w-72 rounded-full bg-[#8fddff]/10 blur-3xl" />

        <motion.div className="container relative z-10 py-24 md:py-28" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end" variants={staggerContainer}>
            <motion.div className="max-w-3xl" variants={fadeInUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                <Ticket size={14} className="text-[#8fddff]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90">Foundation Events</span>
              </div>
              <h1 className="mb-6 text-4xl font-heading font-bold leading-[1.02] md:text-6xl">
                Gatherings that bring Coastline’s mission to life.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200/92 md:text-xl">
                From scholarship celebrations to community gatherings, these events create visible moments of connection between students, supporters, and the Coastline community.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="rounded-xl bg-[#0096d6] px-6 py-5 font-semibold text-white btn-premium hover:bg-[#0284bc]">
                  <Link href={`/events/${featuredEvent.slug}`}>
                    View featured event <ArrowRight size={15} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl border-white/20 bg-white/5 px-6 py-5 font-semibold text-white hover:bg-white/10 hover:text-white">
                  <a href={featuredEvent.ctaHref} target="_blank" rel="noreferrer">
                    {featuredEvent.ctaLabel}
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href={`/events/${featuredEvent.slug}`}>
                <a className="group block rounded-[30px] border border-white/12 bg-white/8 p-6 backdrop-blur-xl shadow-[0_18px_50px_rgba(3,16,28,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_26px_60px_rgba(3,16,28,0.34)]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90">
                  <Sparkles size={12} className="text-[#8fddff]" /> Featured gathering
                </div>
                <h2 className="mb-3 text-2xl font-heading font-bold text-white">{featuredEvent.title}</h2>
                <p className="mb-6 text-sm leading-7 text-slate-200/88">{featuredEvent.excerpt}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">Date</p>
                    <p className="font-semibold text-white">{featuredEvent.dateLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">Time</p>
                    <p className="font-semibold text-white">{featuredEvent.timeLabel}</p>
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8fddff] transition-transform group-hover:translate-x-0.5">
                  Open event page <ArrowRight size={14} />
                </div>
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-20 -mt-4 pb-6 md:-mt-8">
        <div className="container">
          <motion.div
            className="overflow-hidden rounded-[30px] border border-sky-100 bg-white shadow-[0_24px_70px_rgba(6,38,58,0.10)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
                <img
                  src={featuredPanelPhoto?.src || featuredEvent.featuredImage}
                  alt={featuredPanelPhoto?.alt || featuredEvent.featuredAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: featuredPanelPhoto?.objectPosition || "center" }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,38,58,0.12)_0%,rgba(6,38,58,0.0)_38%,rgba(6,38,58,0.72)_100%)]" />
                <div className="absolute left-6 top-6 inline-flex items-center rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                  Featured invitation
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-start">
                  {featuredPanelPhoto?.caption ? <PhotoAcknowledgment caption={featuredPanelPhoto?.caption} /> : null}
                </div>
                <div className="absolute bottom-20 left-6 right-6 rounded-[24px] border border-white/12 bg-[#06263a]/48 p-5 backdrop-blur-xl">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass(featuredEvent.status)} bg-white/92`}>{featuredEvent.status}</span>
                  <p className="mt-4 text-lg font-heading font-bold text-white">{featuredEvent.title}</p>
                </div>
              </div>

              <div className="p-8 md:p-10 lg:p-12">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">Lead event</p>
                <h2 className="mb-4 text-3xl font-heading font-bold leading-tight text-[#08324a] md:text-4xl">Celebrate Coastline’s Class of 2026</h2>
                <p className="mb-8 max-w-2xl text-[16px] leading-8 text-slate-600">
                  Join graduates, families, faculty, and supporters for an evening that honors achievement, perseverance, and the Coastline community. Find the key ceremony details here and open the full commencement page for maps, livestream access, and event resources.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
                  <div className="rounded-[22px] border border-sky-100 bg-[#f7fbfe] p-5">
                    <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white text-[#0b6fa4] shadow-sm">
                      <CalendarDays size={16} />
                    </div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-400">Date</p>
                    <p className="font-semibold leading-6 text-[#08324a]">{featuredEvent.dateLabel}</p>
                  </div>
                  <div className="rounded-[22px] border border-sky-100 bg-[#f7fbfe] p-5">
                    <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white text-[#0b6fa4] shadow-sm">
                      <Clock3 size={16} />
                    </div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-400">Time</p>
                    <p className="font-semibold leading-6 text-[#08324a]">{featuredEvent.timeLabel}</p>
                  </div>
                  <div className="rounded-[22px] border border-sky-100 bg-[#f7fbfe] p-5">
                    <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-white text-[#0b6fa4] shadow-sm">
                      <MapPin size={16} />
                    </div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-slate-400">Location</p>
                    <p className="font-semibold leading-6 text-[#08324a]">{featuredEvent.location}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild className="rounded-xl bg-[#0096d6] px-6 py-5 font-semibold text-white btn-premium hover:bg-[#0284bc]">
                    <Link href={`/events/${featuredEvent.slug}`}>
                      View Event <ArrowRight size={15} className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl border-sky-200 px-6 py-5 font-semibold text-[#08324a] hover:bg-sky-50">
                    <a href={featuredEvent.ctaHref} target="_blank" rel="noreferrer">
                      {featuredEvent.ctaLabel}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <motion.div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">Calendar of moments</p>
              <h2 className="text-3xl font-heading font-bold text-[#08324a] md:text-4xl">Upcoming gatherings and recent events</h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-600 leading-7">
              Explore the Foundation’s event calendar, from milestone celebrations to community gatherings that bring students, supporters, and partners together.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-6 xl:grid-cols-2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={staggerContainer}>
            {remainingEvents.map((event, index) => {
              const galleryPhoto = eventCardPhotos[index % eventCardPhotos.length] ?? eventGalleryPhotos[(index + 1) % eventGalleryPhotos.length];
              return (
              <motion.article key={event.slug} variants={fadeInUp} className="group grid overflow-hidden rounded-[26px] border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(6,38,58,0.08)] md:grid-cols-[220px_1fr]">
                <div className="relative min-h-[220px] overflow-hidden">
                  <img
                    src={galleryPhoto?.src || event.featuredImage}
                    alt={galleryPhoto?.alt || event.featuredAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: galleryPhoto?.objectPosition || "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/42 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <PhotoAcknowledgment caption={galleryPhoto?.caption} className="bg-[#06263a]/64 text-white/90" />
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <div className="mb-3 flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass(event.status)}`}>{event.status}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-heading font-bold leading-tight text-[#08324a]">{event.title}</h3>
                  <p className="mb-5 text-sm leading-7 text-slate-600">{event.excerpt}</p>
                  <div className="grid grid-cols-1 gap-2 text-xs text-slate-500 sm:grid-cols-3 mb-6">
                    <div className="inline-flex items-center gap-2"><CalendarDays size={13} className="text-[#0b6fa4]" /> {event.dateLabel}</div>
                    <div className="inline-flex items-center gap-2"><Clock3 size={13} className="text-[#0b6fa4]" /> {event.timeLabel}</div>
                    <div className="inline-flex items-center gap-2"><MapPin size={13} className="text-[#0b6fa4]" /> {event.location}</div>
                  </div>
                  <Link href={`/events/${event.slug}`}>
                    <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6fa4] transition-colors hover:text-[#08324a]">
                      View details <ArrowRight size={14} />
                    </a>
                  </Link>
                </div>
              </motion.article>
            );})}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
