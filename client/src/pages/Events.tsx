import { CalendarDays, Clock3, MapPin, ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { foundationEvents } from "@/data/events";

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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,58,0.88)_0%,rgba(6,38,58,0.72)_38%,rgba(6,38,58,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,38,58,0.18)_0%,rgba(6,38,58,0.04)_40%,rgba(6,38,58,0.46)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7fbfe] to-transparent" />

        <motion.div className="container relative z-10" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div className="max-w-3xl" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md mb-6">
              <Ticket size={14} className="text-[#8fddff]" />
              <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white/90">Events</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] mb-6">
              Events that make Coastline’s work visible and bring partners into the story.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-slate-200/90 leading-relaxed">
              A clear calendar of Foundation activity gives donors, partners, students, and community supporters another way to engage with Coastline’s mission.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="container">
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">Upcoming & recent</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#08324a]">A practical events hub for the Foundation</h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-600 leading-7">
              This section is designed to support stewardship, sponsorship, donor cultivation, community participation, and post-event storytelling.
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
                    <div className="inline-flex items-center gap-2"><CalendarDays size={13} className="text-[#0b6fa4]" /> {event.dateLabel}</div>
                    <div className="inline-flex items-center gap-2"><Clock3 size={13} className="text-[#0b6fa4]" /> {event.timeLabel}</div>
                    <div className="inline-flex items-center gap-2"><MapPin size={13} className="text-[#0b6fa4]" /> {event.location}</div>
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
