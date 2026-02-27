import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, Briefcase, Target, Sparkles, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useCoastlinePhotos } from "@/contexts/PhotoContext";

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
  const { getHeroPhoto, getRandomPhoto, getCardPhotos, isReady } = useCoastlinePhotos();

  const heroPhoto = useMemo(
    () => getHeroPhoto() || getRandomPhoto(),
    [getHeroPhoto, getRandomPhoto]
  );

  const missionPhoto = useMemo(
    () => getRandomPhoto(),
    [getRandomPhoto]
  );

  const ctaPhoto = useMemo(
    () => getHeroPhoto() || getRandomPhoto(),
    [getHeroPhoto, getRandomPhoto]
  );

  const programPhotos = useMemo(() => {
    const cardPhotos = getCardPhotos("", 3);
    return {
      it: cardPhotos[0] || null,
      business: cardPhotos[1] || null,
      healthcare: cardPhotos[2] || null,
    };
  }, [getCardPhotos]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Cinematic, immersive, premium
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0A1628]">
        {/* Background Photo with premium overlay */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${heroPhoto?.fullUrl || "/coastline-speaker-close.jpg"}')`
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/75 to-[#0A1628]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/60 to-transparent" />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/[0.08] rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-teal-500/[0.06] rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />

        <div className="container relative z-10 py-20">
          <motion.div
            className="max-w-3xl space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">Coastline College Foundation</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold leading-[1.05] text-white"
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Investing in{" "}
              <span className="gradient-text-hero">
                Student Success
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 max-w-xl leading-relaxed"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Supporting students through scholarships, endowments, and innovative programs that expand Coastline's capacity to meet student and community needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4 pt-2"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 px-7 py-6 text-[15px] font-semibold rounded-xl btn-premium"
                onClick={() => setLocation("/strategic-plan")}
              >
                View Strategic Plan
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] px-7 py-6 text-[15px] font-semibold rounded-xl"
                onClick={() => setLocation("/dashboard")}
              >
                Board Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafbfd] to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          KPI SECTION — Premium metrics dashboard
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 pb-20">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {/* Total Assets */}
            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/[0.04] rounded-full blur-2xl group-hover:bg-blue-500/[0.08] transition-colors duration-500" />
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-3">Total Assets</p>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    <AnimatedNumber value={4.62} prefix="$" suffix="M" decimals={2} />
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} />
                    10.0%
                  </span>
                </div>
                <p className="text-xs text-slate-400">Growth from $4.2M previous year</p>
              </div>
            </motion.div>

            {/* Total Donations */}
            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 to-teal-500 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-teal-500/[0.04] rounded-full blur-2xl group-hover:bg-teal-500/[0.08] transition-colors duration-500" />
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-3">Total Donations</p>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    <AnimatedNumber value={362.0} prefix="$" suffix="K" decimals={1} />
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} />
                    30.4%
                  </span>
                </div>
                <p className="text-xs text-slate-400">From previous year</p>
              </div>
            </motion.div>

            {/* Scholarships Awarded */}
            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/[0.04] rounded-full blur-2xl group-hover:bg-amber-500/[0.08] transition-colors duration-500" />
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-3">Scholarships Awarded</p>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    <AnimatedNumber value={383.6} prefix="$" suffix="K" decimals={1} />
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} />
                    18.2%
                  </span>
                </div>
                <p className="text-xs text-slate-400">309 awards in FY24/25</p>
              </div>
            </motion.div>

            {/* Students Impacted */}
            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-400 to-purple-500 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-500/[0.04] rounded-full blur-2xl group-hover:bg-violet-500/[0.08] transition-colors duration-500" />
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-3">Students Impacted</p>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    <AnimatedNumber value={207} prefix="" suffix="" decimals={0} />
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={10} />
                    38.67%
                  </span>
                </div>
                <p className="text-xs text-slate-400">From previous year</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MISSION SECTION — Premium storytelling
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 ring-pattern" />
        <div className="container relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {/* Image */}
            <motion.div className="relative" variants={fadeInUp}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
                <img
                  src={missionPhoto?.fullUrl || "/Coastline Campus.jpg"}
                  alt="Coastline College campus"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-6 -right-4 md:right-8 glass-card rounded-2xl p-5 shadow-xl max-w-[200px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">1985</div>
                <p className="text-xs text-slate-500 font-medium">Established to support student success</p>
              </motion.div>
              {/* Decorative accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-blue-100 rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div>
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-3 block">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 leading-tight mb-5">
                  Bridging Resource Gaps for{" "}
                  <span className="gradient-text-blue">Student Success</span>
                </h2>
              </div>
              <p className="text-slate-500 text-[16px] leading-relaxed">
                The Coastline College Foundation embodies an entrepreneurial spirit as the college's charitable arm. Our mission is to support students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
              </p>
              <p className="text-slate-500 text-[16px] leading-relaxed">
                In alignment with Coastline's core values of accessibility and upward mobility, the Foundation's role is to bridge resource gaps — empowering students to become impactful contributors to society — and to foster the innovative, "no barriers" ethos of the college.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 font-semibold px-0 group">
                    Learn More About Us
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STRATEGIC OBJECTIVES — Dark section with premium cards
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0A1628] relative overflow-hidden">
        {/* Background textures */}
        <div className="absolute inset-0 root-pattern" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-[120px]" />

        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span
              className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.12em] mb-3 block"
              variants={fadeInUp}
            >
              2025-2028 Roadmap
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4"
              variants={fadeInUp}
            >
              Strategic Objectives
            </motion.h2>
            <motion.p
              className="text-slate-400 text-[16px] leading-relaxed"
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
                className="glass-card-dark rounded-2xl p-7 flex items-start gap-5 group cursor-default card-hover"
                variants={cardVariant}
              >
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROGRAM AREAS — Premium cards with images
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#fafbfd] relative overflow-hidden">
        <div className="absolute inset-0 ring-pattern" />
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
              <p className="text-slate-400 mt-2">Targeted initiatives aligned with industry needs</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/programs">
                <Button variant="ghost" className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 font-semibold group">
                  View All Programs <ArrowRight size={15} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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
                image: programPhotos.it?.fullUrl || "/coastline-classroom.jpg"
              },
              {
                title: "Business & Finance",
                desc: "Serving the Professional and Business Services sector with programs in management, marketing, and finance.",
                stat: "44% Economic Impact",
                image: programPhotos.business?.fullUrl || "/coastline-community.jpg"
              },
              {
                title: "Healthcare & Biotech",
                desc: "Aligning with the largest industry in Orange County through health sciences, allied health, and life sciences programs.",
                stat: "~195k Regional Jobs",
                image: programPhotos.healthcare?.fullUrl || "/coastline-speaker-close.jpg"
              }
            ].map((program, idx) => (
              <motion.div
                key={idx}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-500 card-hover"
                variants={cardVariant}
              >
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent z-10" />
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/[0.15] text-white text-xs font-medium">
                      {program.stat}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{program.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{program.desc}</p>
                  <Link href="/programs">
                    <span className="text-blue-600 text-sm font-semibold flex items-center cursor-pointer group/link">
                      Learn more <ChevronRight size={14} className="ml-0.5 group-hover/link:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 text-center md:hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/programs">
              <Button variant="outline" className="w-full rounded-xl">View All Programs</Button>
            </Link>
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
            backgroundImage: `url('${ctaPhoto?.fullUrl || "/coastline-speaker-wide.jpg"}')`
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
            <Link href="/get-involved">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-xl shadow-blue-950/20 px-8 py-6 rounded-xl text-[15px] btn-premium">
                Get Involved
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/[0.15] text-white hover:bg-white/[0.08] hover:border-white/[0.25] px-8 py-6 rounded-xl text-[15px] font-semibold">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
