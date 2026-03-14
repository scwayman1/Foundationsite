import { CalendarDays, Clock3, MapPin, ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { featuredEvent, foundationEvents } from "@/data/events";

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

export default function Events() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7fbfe]">
      <section className="relative overflow-hidden bg-[#06263a] text-white py-28 md:py-36">
        <img
          src="/Scott Podium2.jpg"
          alt="Coastline Foundation event"
          className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,58,0.88)_0%,rgba(6,38,58,0.7)_42%,rgba(6,38,58,0.35)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />

        <motion.div className="container relative z-10" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div className="max-w-3xl" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md mb-6">
              <Ticket size={14} className="text-[#8fddff]" />
              <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white/90">Events</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] mb-6">
              Gatherings that strengthen Coastline’s community, visibility, and momentum.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-slate-200/90 leading-relaxed">
              Foundation events are where stewardship becomes visible — bringing together students, donors, partners, and community leaders around Coastline’s mission and impact.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative -mt-12 z-20 pb-8">
        <div className="container">
          <motion.div className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_18px_40px_rgba(6,38,58,0.08)]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] lg:min-h-full">
                <img src={featuredEvent.featuredImage} alt={featuredEvent.featuredAlt} className="absolute inset-0 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/80 via-[#06263a]/15 to-transparent" />
              </div>
              <div className="p-8 md:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass(featuredEvent.status)}`}>{featuredEvent.status}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">Featured event</span>
                </div>
                <h2 className="text-3xl font-heading font-bold text-[#08324a] leading-tight mb-4">{featuredEvent.title}</h2>
                <p className="text-slate-600 leading-8 text-[16px] mb-6">{featuredEvent.excerpt}</p>
                <div className="space-y-3 text-sm text-slate-600 mb-8">
                  <div className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-[#0b6fa4]" /> {featuredEvent.dateLabel}</div>
                  <div className="inline-flex items-center gap-2"><Clock3 size={15} className="text-[#0b6fa4]" /> {featuredEvent.timeLabel}</div>
                  <div className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#0b6fa4]" /> {featuredEvent.location}</div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href={`/events/${featuredEvent.slug}`}>
                    <Button className="bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl px-6 py-5 font-semibold btn-premium">View Event <ArrowRight size={15} className="ml-2" /></Button>
                  </Link>
                  <Link href={featuredEvent.ctaHref}>
                    <Button variant="outline" className="rounded-xl px-6 py-5 font-semibold border-sky-200 text-[#08324a] hover:bg-sky-50">{featuredEvent.ctaLabel}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">Upcoming & recent</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#08324a]">A visible calendar of Foundation activity</h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-600 leading-7">
              Events create natural entry points for stewardship, sponsorship, donor cultivation, community engagement, and post-event storytelling.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={staggerContainer}>
            {foundationEvents.map((event) => (
              <motion.article key={event.slug} variants={fadeInUp} className="overflow-hidden rounded-[24px] border border-sky-100 bg-white shadow-sm hover:shadow-[0_18px_34px_rgba(6,38,58,0.08)] transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img src={event.featuredImage} alt={event.featuredAlt} className="h-full w-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/45 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClass(event.status)}`}>{event.status}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#08324a] leading-tight mb-3">{event.title}</h3>
                  <p className="text-slate-600 leading-7 text-sm mb-5">{event.excerpt}</p>
                  <div className="space-y-2 text-xs text-slate-500 mb-5">
                    <div>{event.dateLabel}</div>
                    <div>{event.location}</div>
                  </div>
                  <Link href={`/events/${event.slug}`}>
                    <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6fa4] hover:text-[#08324a] transition-colors">View details <ArrowRight size={14} /></a>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
