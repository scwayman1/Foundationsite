import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, GraduationCap, DollarSign, Briefcase } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ProgramAreaCard from "@/components/ProgramAreaCard";
import { featuredPost } from "@/data/news";

// Animated counter component for KPIs
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}${suffix}`
  );
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => setDisplayValue(latest));
  }, [display]);

  return <span ref={ref}>{displayValue}</span>;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function Home() {
  const [, setLocation] = useLocation();

  // Curated image map with student-centered storytelling
  const homeImages = {
    hero: "/Scholarship Recipients .jpg",
    mission: "/Tom and Student.jpg",
    cta: "/coastline-community.jpg",
    programs: {
      it: { src: "/Aeron Z.jpg", position: "object-[center_22%]" },
      business: { src: "/Meribeth and Student.jpg", position: "object-[center_35%]" },
      healthcare: { src: "/Michelle and Anna.jpg", position: "object-[center_20%]" },
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Cinematic, immersive, premium
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#06263a]">
        <div className="absolute inset-0">
          <motion.img
            src={homeImages.hero}
            alt="Coastline students and scholarship recipients"
            className="absolute inset-0 w-full h-full object-cover object-[center_58%] md:object-[center_62%]"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,58,0.82)_0%,rgba(6,38,58,0.7)_28%,rgba(6,38,58,0.28)_58%,rgba(6,38,58,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,38,58,0.18)_0%,rgba(6,38,58,0.03)_38%,rgba(6,38,58,0.42)_100%)]" />
        </div>

        <div className="absolute inset-0 dot-grid opacity-[0.035]" />
        <div className="absolute top-20 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container relative z-10 py-20 lg:py-28">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_320px] gap-8 items-end"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="max-w-3xl space-y-7 lg:pr-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md"
                variants={fadeInUp}
              >
                <span className="flex h-2 w-2 rounded-full bg-[#41c4ff]" />
                <span className="text-[13px] font-semibold text-white/90 tracking-[0.08em] uppercase">Coastline College Foundation</span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold leading-[1.02] text-white max-w-4xl"
                variants={fadeInUp}
              >
                Opening doors for <span className="text-[#7fdbff]">students</span>,
                strengthening the future of Coastline.
              </motion.h1>

              <motion.p
                className="text-lg md:text-[21px] text-slate-200 max-w-2xl leading-relaxed"
                variants={fadeInUp}
              >
                We invest in scholarships, student support, and community partnerships that expand access, mobility, and opportunity across Coastline College.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 pt-2"
                variants={fadeInUp}
              >
                <Button
                  size="lg"
                  className="bg-[#0096d6] hover:bg-[#0284bc] text-white border-none shadow-xl shadow-[#0096d6]/25 px-7 py-6 text-[15px] font-semibold rounded-xl btn-premium"
                  onClick={() => setLocation("/get-involved")}
                >
                  Support Students
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/6 hover:bg-white/10 text-white backdrop-blur-md px-7 py-6 text-[15px] font-semibold rounded-xl"
                  onClick={() => setLocation("/strategic-plan")}
                >
                  View Strategic Plan
                </Button>
              </motion.div>
            </div>

            <motion.div className="hidden lg:block" variants={fadeInUp}>
              <div className="rounded-3xl border border-white/12 bg-white/8 backdrop-blur-md p-5 shadow-xl shadow-black/10 max-w-[320px] ml-auto">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#b9ebff] mb-4">Focused impact</p>
                <div className="space-y-4">
                  {[
                    ["Scholarships", "Direct support that helps students stay enrolled and complete."],
                    ["Programs", "Targeted investment in innovation, workforce pathways, and access."],
                    ["Partnerships", "Community and industry relationships that expand opportunity."],
                  ].map(([label, copy]) => (
                    <div key={label} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                      <p className="text-white font-semibold mb-1">{label}</p>
                      <p className="text-sm leading-relaxed text-slate-200/85">{copy}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <Link href="/board">
                    <a className="inline-flex items-center text-sm font-semibold text-white hover:text-[#9adfff] transition-colors">
                      Meet Our Board <ArrowRight size={15} className="ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f7fbfe] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          KPI SECTION — Premium metrics dashboard
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-12 z-20 pb-20">
        <div className="container">
          <motion.div
            className="rounded-[28px] border border-sky-100 bg-white shadow-[0_12px_40px_rgba(6,38,58,0.08)] overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.2fr]">
              <div className="bg-[#08324a] px-8 py-10 md:px-10 md:py-12 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fddff] mb-4">Foundation impact</p>
                <h2 className="text-3xl md:text-[2.15rem] font-heading font-bold leading-tight mb-4">
                  Investing in access, completion, and long-term student opportunity.
                </h2>
                <p className="text-slate-200/90 leading-relaxed max-w-xl">
                  The Foundation helps close resource gaps through scholarships, donor support, and strategic partnerships that expand Coastline's ability to serve students and community needs.
                </p>
              </div>
              <div className="px-8 py-8 md:px-10 md:py-10 bg-[#f7fbfe]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                  {[
                    {
                      label: "Foundation Assets",
                      value: <AnimatedNumber value={4.62} prefix="$" suffix="M" decimals={2} />,
                      detail: "Current foundation asset base"
                    },
                    {
                      label: "Annual Donations",
                      value: <AnimatedNumber value={362.0} prefix="$" suffix="K" decimals={1} />,
                      detail: "Philanthropic support received"
                    },
                    {
                      label: "Scholarships Awarded",
                      value: <AnimatedNumber value={383.6} prefix="$" suffix="K" decimals={1} />,
                      detail: "309 awards in FY24/25"
                    },
                    {
                      label: "Students Impacted",
                      value: <AnimatedNumber value={207} decimals={0} />,
                      detail: "Measured year-over-year growth"
                    }
                  ].map((item) => (
                    <div key={item.label} className="border-l-2 border-[#cbeaf8] pl-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-2">{item.label}</p>
                      <div className="text-3xl font-bold text-[#08324a] tracking-tight mb-2">{item.value}</div>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MISSION SECTION — Premium storytelling
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-7" variants={fadeInUp}>
              <div>
                <span className="text-[11px] font-semibold text-[#0b6fa4] uppercase tracking-[0.12em] mb-3 block">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#08324a] leading-tight mb-5 max-w-2xl">
                  Advancing student success through philanthropy, stewardship, and community partnership.
                </h2>
              </div>
              <p className="text-slate-600 text-[16px] leading-8 max-w-2xl">
                The Coastline College Foundation supports scholarships, endowments, and strategic investments that expand Coastline's capacity to serve students and respond to community needs.
              </p>
              <p className="text-slate-600 text-[16px] leading-8 max-w-2xl">
                Our role is practical and mission-driven: close resource gaps, strengthen opportunity, and help students move forward through education, workforce pathways, and community support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-2xl">
                {[
                  ["Student-centered", "Support that helps students persist, complete, and thrive."],
                  ["Stewardship", "Responsible investment and transparent use of philanthropic resources."],
                  ["Partnership", "Strong relationships with donors, employers, and community leaders."],
                  ["Opportunity", "Expanding access to education, mobility, and workforce readiness."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-2xl border border-sky-100 bg-[#f8fcfe] p-5">
                    <p className="font-semibold text-[#08324a] mb-1.5">{title}</p>
                    <p className="text-sm leading-relaxed text-slate-500">{copy}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Button asChild variant="ghost" className="text-[#0b6fa4] hover:text-[#08324a] hover:bg-sky-50 font-semibold px-0 group">
                  <Link href="/about">
                    Learn More About the Foundation
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeInUp}>
              <div className="relative rounded-[28px] overflow-hidden border border-sky-100 shadow-[0_18px_45px_rgba(6,38,58,0.08)] bg-white">
                <img
                  src={homeImages.mission}
                  alt="Coastline students with foundation supporters"
                  className="w-full h-[520px] object-cover object-[center_35%]"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#06263a]/88 to-transparent">
                  <div className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white mb-3">
                    Established 1985
                  </div>
                  <p className="text-white text-lg font-semibold max-w-md">Focused on expanding opportunity for Coastline students through targeted philanthropic support.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STRATEGIC OBJECTIVES — Dark section with premium cards
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#eaf6fb] relative overflow-hidden border-y border-sky-100">
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span
              className="text-[11px] font-semibold text-[#0b6fa4] uppercase tracking-[0.12em] mb-3 block"
              variants={fadeInUp}
            >
              2025-2028 Roadmap
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-[#08324a] leading-tight mb-4"
              variants={fadeInUp}
            >
              Strategic Objectives
            </motion.h2>
            <motion.p
              className="text-slate-600 text-[16px] leading-relaxed"
              variants={fadeInUp}
            >
              Our roadmap for the future focuses on four key pillars designed to maximize impact and sustainability.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {[
              {
                id: 1,
                title: "Strengthen Fundraising & Resource Development",
                desc: "Diversify funding sources and expand partnerships to increase financial support.",
                icon: <DollarSign className="w-5 h-5" />,
                gradient: "from-blue-500 to-blue-600",
                glow: "bg-blue-500/[0.08]"
              },
              {
                id: 2,
                title: "Enhance Program Innovation & Student Success",
                desc: "Develop new programs in emerging fields and expand work-based learning opportunities.",
                icon: <GraduationCap className="w-5 h-5" />,
                gradient: "from-teal-400 to-teal-500",
                glow: "bg-teal-500/[0.08]"
              },
              {
                id: 3,
                title: "Strengthen Outreach & Community Engagement",
                desc: "Increase Coastline's visibility and forge stronger community connections.",
                icon: <Users className="w-5 h-5" />,
                gradient: "from-violet-400 to-purple-500",
                glow: "bg-violet-500/[0.08]"
              },
              {
                id: 4,
                title: "Enhance Industry Engagement & Workforce Impact",
                desc: "Deepen relationships with employers and align programs to labor market needs.",
                icon: <Briefcase className="w-5 h-5" />,
                gradient: "from-amber-400 to-orange-500",
                glow: "bg-amber-500/[0.08]"
              }
            ].map((item) => (
              <motion.div
                key={item.id}
                className="rounded-2xl p-7 flex items-start gap-5 group cursor-default border border-sky-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                variants={cardVariant}
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#08324a] mb-2 group-hover:text-[#0b6fa4] transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROGRAM AREAS — Premium cards with images
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f7fbfe] relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            className="flex justify-between items-end mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-3 block">Academic Excellence</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Program Areas</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Targeted initiatives that connect Coastline students to regional opportunity, workforce needs, and high-value learning pathways.</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button asChild variant="ghost" className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 font-semibold group">
                <Link href="/programs">
                  View All Programs <ArrowRight size={15} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "IT & Cybersecurity",
                desc: "Preparing talent for the booming digital economy with programs in Cybersecurity, Computer Networking, and Software Development.",
                stat: "33% Job Growth",
                image: homeImages.programs.it.src,
                imagePosition: homeImages.programs.it.position,
              },
              {
                title: "Business & Finance",
                desc: "Serving the Professional and Business Services sector with programs in management, marketing, and finance.",
                stat: "44% Economic Impact",
                image: homeImages.programs.business.src,
                imagePosition: homeImages.programs.business.position,
              },
              {
                title: "Healthcare & Biotech",
                desc: "Aligning with the largest industry in Orange County through health sciences, allied health, and life sciences programs.",
                stat: "~195k Regional Jobs",
                image: homeImages.programs.healthcare.src,
                imagePosition: homeImages.programs.healthcare.position,
              }
            ].map((program, idx) => (
              <motion.div key={idx} variants={cardVariant}>
                <ProgramAreaCard
                  title={program.title}
                  desc={program.desc}
                  stat={program.stat}
                  image={program.image}
                  imagePosition={program.imagePosition}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 text-center md:hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="w-full rounded-xl">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NEWS & IMPACT SECTION
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-sky-100">
        <div className="container relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div>
                <span className="text-[11px] font-semibold text-[#0b6fa4] uppercase tracking-[0.12em] mb-3 block">News & Impact</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#08324a] leading-tight mb-4 max-w-xl">
                  A publishing surface built for donor trust, search visibility, and momentum.
                </h2>
                <p className="text-slate-600 text-[16px] leading-8 max-w-xl">
                  Coastline’s content stream should do more than fill space. It should tell student-centered stories, explain the Foundation’s impact, and create strong entry points for donors, partners, and community supporters.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {[
                  ["Stories", "Student-centered proof that philanthropy changes real outcomes."],
                  ["Giving Insights", "Pages that answer donor questions and support search intent."],
                  ["Foundation Updates", "Institutional credibility, activity, and visible momentum."],
                  ["Conversion Paths", "Clear next steps into giving, engagement, and partnership."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-2xl border border-sky-100 bg-[#f8fcfe] p-5">
                    <p className="font-semibold text-[#08324a] mb-1.5">{title}</p>
                    <p className="text-sm leading-relaxed text-slate-500">{copy}</p>
                  </div>
                ))}
              </div>
              <div>
                <Button asChild className="bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl px-7 py-6 text-[15px] font-semibold btn-premium">
                  <Link href="/news">
                    Explore News & Impact
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_20px_42px_rgba(6,38,58,0.08)]">
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.featuredAlt}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/65 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/12 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-white">
                    Featured story
                  </div>
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">{featuredPost.category}</p>
                  <h3 className="text-2xl font-heading font-bold text-[#08324a] leading-tight mb-3">{featuredPost.title}</h3>
                  <p className="text-slate-600 leading-7 mb-5">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-sm text-slate-500">{featuredPost.publishedAt} • {featuredPost.readTime}</span>
                    <Link href={`/news/${featuredPost.slug}`}>
                      <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6fa4] hover:text-[#08324a] transition-colors">
                        Read story <ArrowRight size={14} />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA SECTION — Premium call to action
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-[#0A1628] text-white relative overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage: `url('${homeImages.cta}')`
          }}
        />
        {/* Ambient orbs */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400/[0.1] rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-400/[0.06] rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 root-pattern opacity-30" />

        <motion.div
          className="container relative z-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-bold mb-5 leading-tight"
            variants={fadeInUp}
          >
            Ready to Make an Impact?
          </motion.h2>
          <motion.p
            className="text-blue-100/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeInUp}
          >
            Join us in shaping the future of education and workforce development. Your support creates opportunities for students and strengthens our community.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeInUp}
          >
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-xl shadow-blue-950/20 px-8 py-6 rounded-xl text-[15px] btn-premium">
              <Link href="/get-involved">
                Get Involved
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/[0.15] text-white hover:bg-white/[0.08] hover:border-white/[0.25] px-8 py-6 rounded-xl text-[15px] font-semibold">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
