import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Briefcase, Building2, Cpu, HeartPulse, Wrench, Leaf, Globe } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import ProgramAreaCard from "@/components/ProgramAreaCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function Programs() {
  const programs = [
    {
      title: "IT & Cybersecurity",
      desc: "Preparing talent for the booming digital economy with programs in Cybersecurity, Computer Networking, and Software Development.",
      stat: "33% Job Growth",
      statDetail: "Projected growth in cybersecurity roles by 2032",
      icon: <Cpu className="w-5 h-5" />,
      gradient: "from-blue-500 to-blue-600",
      photo: "/Aeron Z.jpg",
      imagePosition: "object-[center_22%]"
    },
    {
      title: "Business & Finance",
      desc: "Serving the Professional and Business Services sector with programs in management, marketing, and finance.",
      stat: "44% Economic Impact",
      statDetail: "Contribution to Orange County's service economy",
      icon: <Building2 className="w-5 h-5" />,
      gradient: "from-teal-400 to-teal-500",
      photo: "/Meribeth and Student.jpg",
      imagePosition: "object-[center_35%]"
    },
    {
      title: "Healthcare & Biotech",
      desc: "Aligning with the largest industry in Orange County through health sciences, allied health, and life sciences programs.",
      stat: "~195k Regional Jobs",
      statDetail: "Healthcare sector employment in Orange County",
      icon: <HeartPulse className="w-5 h-5" />,
      gradient: "from-rose-400 to-rose-500",
      photo: "/Michelle and Anna.jpg",
      imagePosition: "object-[center_20%]"
    },
    {
      title: "Advanced Manufacturing",
      desc: "Supporting the manufacturing sector with programs in process technology, supply chain management, and quality assurance.",
      stat: "High Demand",
      statDetail: "Critical workforce pipeline for regional manufacturers",
      icon: <Wrench className="w-5 h-5" />,
      gradient: "from-amber-400 to-orange-500",
      photo: "/coastline-classroom.jpg",
      imagePosition: "object-[center_30%]"
    },
    {
      title: "Sustainability & Green Tech",
      desc: "Preparing students for the growing green economy with programs in environmental science and sustainable practices.",
      stat: "Emerging Field",
      statDetail: "Growing demand for sustainability professionals",
      icon: <Leaf className="w-5 h-5" />,
      gradient: "from-emerald-400 to-emerald-500",
      photo: "/Tom and Student.jpg",
      imagePosition: "object-[center_42%]"
    },
    {
      title: "Global Trade & Logistics",
      desc: "Leveraging Orange County's position as a trade hub with programs in international business and supply chain logistics.",
      stat: "Strategic Location",
      statDetail: "Proximity to major ports and international markets",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-violet-400 to-purple-500",
      photo: "/Scott Speaking.jpg",
      imagePosition: "object-[center_30%]"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-28 md:py-36 bg-[#0A1628] text-white overflow-hidden">
        <img
          src="/coastline-classroom.jpg"
          alt="Students in classroom and workforce training environment"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/50 to-[#0A1628]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/40 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-teal-500/[0.05] rounded-full blur-[120px]" />

        <motion.div
          className="container relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-3xl">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl mb-6"
              variants={fadeInUp}
            >
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">Academic Excellence</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.08]"
              variants={fadeInUp}
            >
              Program Areas &{" "}
              <span className="gradient-text-hero">Industry Alignment</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              Our programs are strategically aligned with Orange County's key industry sectors, ensuring students graduate with skills that match workforce demands.
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbfd] to-transparent" />
      </section>

      {/* ── Industry Alignment Stats ── */}
      <section className="relative -mt-12 z-20 pb-16">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {[
              { icon: <TrendingUp className="w-5 h-5" />, label: "Industry-Aligned Programs", value: "6+", color: "from-blue-500 to-blue-600" },
              { icon: <Users className="w-5 h-5" />, label: "Students Enrolled", value: "200+", color: "from-teal-400 to-teal-500" },
              { icon: <Briefcase className="w-5 h-5" />, label: "Corporate Partners", value: "40+", color: "from-amber-400 to-orange-500" }
            ].map((stat, idx) => (
              <motion.div key={idx} variants={cardVariant}>
                <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${stat.color} rounded-t-2xl`} />
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Program Cards ── */}
      <section className="py-16 bg-[#fafbfd] relative overflow-hidden">
        <div className="absolute inset-0 ring-pattern" />
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-3 block" variants={fadeInUp}>
              Our Programs
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4" variants={fadeInUp}>
              Workforce-Ready Education
            </motion.h2>
            <motion.p className="text-slate-400 text-[16px]" variants={fadeInUp}>
              Each program area is designed to address specific industry needs in Orange County and beyond.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {programs.map((program, idx) => (
              <motion.div key={idx} variants={cardVariant}>
                <ProgramAreaCard
                  title={program.title}
                  desc={program.desc}
                  stat={program.stat}
                  image={program.photo}
                  imagePosition={program.imagePosition}
                  statDetail={program.statDetail}
                  icon={program.icon}
                  gradient={program.gradient}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-[#0A1628] text-white relative overflow-hidden">
        <div className="absolute inset-0 root-pattern opacity-30" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400/[0.1] rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-400/[0.06] rounded-full blur-[120px]" />

        <motion.div
          className="container relative z-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl md:text-5xl font-heading font-bold mb-5" variants={fadeInUp}>
            Support Our Programs
          </motion.h2>
          <motion.p className="text-blue-100/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed" variants={fadeInUp}>
            Your investment in our programs directly impacts student success and workforce readiness in Orange County.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={fadeInUp}>
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-xl shadow-blue-950/20 px-8 py-6 rounded-xl text-[15px] btn-premium">
              <Link href="/get-involved">
                Get Involved <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/[0.15] text-white hover:bg-white/[0.08] hover:border-white/[0.25] px-8 py-6 rounded-xl text-[15px] font-semibold">
              <Link href="/budget">
                View Budget
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
