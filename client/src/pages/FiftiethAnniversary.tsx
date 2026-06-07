import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Download, HeartHandshake, MapPin, Sparkles, Trophy, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

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

const sponsorshipLevels = [
  {
    name: "Golden Dolphin Presenting Sponsor",
    amount: "$50,000",
    label: "Premier level",
    copy: "Anchor Coastline’s anniversary campaign with the highest visibility across the 50th season, Casino Night, donor recognition, and stewardship moments.",
  },
  {
    name: "Pacific Legacy Sponsor",
    amount: "$25,000",
    label: "Leadership level",
    copy: "Receive featured anniversary recognition and leadership-level visibility connected to signature events and campaign communications.",
  },
  {
    name: "Cresting Wave Sponsor",
    amount: "$5,000",
    label: "Community level",
    copy: "Support student opportunity while receiving sponsor recognition across event materials, digital touchpoints, and gratitude communications.",
  },
  {
    name: "Dolphin Pod Sponsor",
    amount: "$2,500",
    label: "Community partner",
    copy: "Join the anniversary celebration as a visible community partner helping Coastline students and programs move forward.",
  },
];

const moments = [
  {
    date: "October 17, 2026",
    title: "Casino Night",
    location: "Newport Beach",
    copy: "An anniversary celebration and sponsor visibility moment bringing supporters together around Coastline’s student-centered mission.",
  },
  {
    date: "February 2027",
    title: "Donor Wall Recognition",
    location: "Coastline College",
    copy: "A stewardship milestone recognizing the people and partners helping strengthen the Foundation’s next chapter.",
  },
  {
    date: "Spring 2027",
    title: "Student Showcase",
    location: "Fountain Valley",
    copy: "A student-centered celebration connecting anniversary support to real student work, achievement, and opportunity.",
  },
];

const reasons = [
  {
    icon: Sparkles,
    title: "Be seen with a respected public college.",
    copy: "Sponsor recognition is tied to a full anniversary season — not one isolated event — with visibility across gatherings, digital channels, and donor stewardship.",
  },
  {
    icon: HeartHandshake,
    title: "Connect support to student achievement.",
    copy: "The sponsorship story centers on access, persistence, transfer pathways, career readiness, and the students Coastline serves.",
  },
  {
    icon: Trophy,
    title: "Honor 50 years while shaping the next 50.",
    copy: "Partners help celebrate Coastline’s history while strengthening the Foundation’s continued work on behalf of students and programs.",
  },
  {
    icon: Users,
    title: "Create recognition that lasts beyond one night.",
    copy: "Anniversary sponsors receive event visibility plus recognition moments connected to the broader 50th Anniversary communications plan.",
  },
];

export default function FiftiethAnniversary() {
  return (
    <div className="min-h-screen bg-[#f6fbfd]">
      <section className="relative overflow-hidden bg-[#06263a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(143,221,255,0.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.14),transparent_24%)]" />
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="absolute -bottom-24 right-[-8%] h-80 w-80 rounded-full bg-[#8fddff]/10 blur-3xl" />

        <motion.div className="container relative z-10 py-24 md:py-32" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div className="max-w-4xl" variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Sparkles size={14} className="text-[#8fddff]" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90">Coastline College 50th Anniversary</span>
            </div>
            <h1 className="mb-6 text-4xl font-heading font-bold leading-[1.02] md:text-6xl lg:text-7xl">
              Turn a 50-year milestone into momentum for Coastline students.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
              Coastline’s 50th Anniversary is more than a celebration. It is a public moment to recognize partners who help students persist, transfer, prepare for careers, and build what comes next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="rounded-xl bg-[#0096d6] px-6 py-5 font-semibold text-white hover:bg-[#0284bc]">
                <a href="/Coastline_College_50th_Anniversary_Sponsorship_Packet.pdf" target="_blank" rel="noreferrer">
                  Download sponsorship packet <Download size={15} className="ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-white/20 bg-white/5 px-6 py-5 font-semibold text-white hover:bg-white/10 hover:text-white">
                <Link href="/get-involved">
                  Contact the Foundation <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-20 -mt-10 pb-14">
        <div className="container">
          <motion.div
            className="grid overflow-hidden rounded-[32px] border border-sky-100 bg-white shadow-[0_24px_70px_rgba(6,38,58,0.10)] lg:grid-cols-[0.9fr_1.1fr]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="bg-[#08324a] p-8 text-white md:p-10 lg:p-12">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fddff]">Anniversary sponsorship</p>
              <h2 className="mb-5 text-3xl font-heading font-bold leading-tight md:text-4xl">Visibility, gratitude, and student impact.</h2>
              <p className="leading-8 text-slate-200/92">
                Sponsorship places your organization inside a yearlong story: Casino Night, donor wall recognition, Student Showcase, digital visibility, and the student opportunity Coastline is building for the next 50 years.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-2 md:p-10">
              {reasons.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-[24px] border border-sky-100 bg-[#f7fbfe] p-6">
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-white text-[#0b6fa4] shadow-sm">
                    <Icon size={18} />
                  </div>
                  <h3 className="mb-2 text-lg font-heading font-bold text-[#08324a]">{title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b6fa4]">Signature moments</p>
            <h2 className="text-3xl font-heading font-bold text-[#08324a] md:text-4xl">A 50th Anniversary season with multiple recognition points.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {moments.map((moment) => (
              <article key={moment.title} className="rounded-[28px] border border-sky-100 bg-white p-7 shadow-sm">
                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-[#e9f8ff] text-[#0b6fa4]">
                  <CalendarDays size={19} />
                </div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">{moment.date}</p>
                <h3 className="mb-3 text-2xl font-heading font-bold text-[#08324a]">{moment.title}</h3>
                <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={14} className="text-[#0b6fa4]" /> {moment.location}
                </div>
                <p className="text-sm leading-7 text-slate-600">{moment.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b6fa4]">Sponsorship levels</p>
              <h2 className="text-3xl font-heading font-bold text-[#08324a] md:text-4xl">Choose the right level of visibility and impact.</h2>
            </div>
            <Button asChild className="w-fit rounded-xl bg-[#0096d6] px-6 py-5 font-semibold text-white hover:bg-[#0284bc]">
              <a href="/Coastline_College_50th_Anniversary_Sponsorship_Packet.pdf" target="_blank" rel="noreferrer">
                View full packet <Download size={15} className="ml-2" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {sponsorshipLevels.map((level) => (
              <article key={level.name} className="rounded-[28px] border border-sky-100 bg-[#f7fbfe] p-6 shadow-sm">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4]">{level.label}</p>
                <h3 className="mb-4 text-xl font-heading font-bold leading-tight text-[#08324a]">{level.name}</h3>
                <p className="mb-5 text-3xl font-heading font-bold text-[#0096d6]">{level.amount}</p>
                <p className="text-sm leading-7 text-slate-600">{level.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06263a] py-16 text-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fddff]">Premier partnership message</p>
              <h2 className="mb-4 text-3xl font-heading font-bold md:text-4xl">Place your organization at the center of Coastline’s next chapter.</h2>
              <p className="max-w-3xl leading-8 text-slate-200/92">
                Golden Dolphin sponsorship anchors the anniversary campaign: it connects your organization to Coastline’s 50-year celebration, student opportunity, donor recognition, and the College’s future.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button asChild className="rounded-xl bg-white px-6 py-5 font-semibold text-[#08324a] hover:bg-sky-50">
                <a href="/Coastline_College_50th_Anniversary_Sponsorship_Packet.pdf" target="_blank" rel="noreferrer">
                  Download packet <Download size={15} className="ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-white/20 bg-white/5 px-6 py-5 font-semibold text-white hover:bg-white/10 hover:text-white">
                <Link href="/get-involved">Start a conversation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
