import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target, Heart, Globe, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

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

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-28 md:py-36 bg-[#0A1628] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-award-1.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/50 to-[#0A1628]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/40 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[120px]" />

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
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">About Us</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.08]"
              variants={fadeInUp}
            >
              Empowering Students since{" "}
              <span className="gradient-text-hero">1985</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              The Coastline College Foundation is dedicated to bridging the gap between student potential and financial reality through scholarships, endowments, and innovative programs.
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Our Journey ── */}
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
            <motion.div className="relative" variants={fadeInUp}>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-100/60 rounded-2xl z-0" />
              <img
                src="/coastline-award-2.jpg"
                alt="Coastline College student success"
                className="relative z-10 rounded-2xl shadow-2xl shadow-slate-900/10 w-full object-cover h-[500px]"
              />
              <motion.div
                className="absolute -bottom-6 -right-4 md:-right-6 glass-card rounded-2xl p-5 shadow-xl z-20 max-w-[220px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Award size={20} />
                  </div>
                  <span className="font-heading font-bold text-slate-900">Excellence</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Committed to the highest standards of educational support and integrity.</p>
              </motion.div>
            </motion.div>
            
            <motion.div className="space-y-8" variants={fadeInUp}>
              <div>
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-3 block">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">Our Journey</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">1985</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Foundation Established</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Founded as the charitable arm of Coastline College to support student success through philanthropy.</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-slate-200 ml-6" />
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-sm">2025</div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Expanding Impact</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Today, we manage over $4.6M in assets and award hundreds of scholarships annually, focusing on equity and innovation.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-heading font-bold text-slate-900 mb-4">Our Core Values</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Student-Centered",
                    "Integrity & Transparency",
                    "Innovation & Agility",
                    "Equity & Inclusion",
                    "Community Partnership",
                    "Stewardship"
                  ].map((value, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle size={15} className="text-teal-500 flex-shrink-0" />
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 bg-[#fafbfd]">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={cardVariant}>
              <Card className="border-none shadow-lg shadow-slate-200/50 overflow-hidden group h-full rounded-2xl">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 w-full" />
                <CardContent className="p-8 md:p-10">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target size={24} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Our Mission</h2>
                  <p className="text-slate-500 leading-relaxed">
                    To support students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs. We bridge resource gaps to empower students to become impactful contributors to society.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={cardVariant}>
              <Card className="border-none shadow-lg shadow-slate-200/50 overflow-hidden group h-full rounded-2xl">
                <div className="h-1 bg-gradient-to-r from-teal-400 to-teal-500 w-full" />
                <CardContent className="p-8 md:p-10">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe size={24} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Our Vision</h2>
                  <p className="text-slate-500 leading-relaxed">
                    To be a catalyst for educational innovation and social mobility, ensuring that every student has the resources to succeed regardless of their background or financial circumstances. We envision a community where education has no barriers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="py-24 bg-[#0A1628] text-white relative overflow-hidden">
        <div className="absolute inset-0 root-pattern" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[100px]" />

        <div className="container relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {[
              { number: "$4.6M+", label: "Total Assets", icon: <Award className="w-5 h-5" /> },
              { number: "200+", label: "Students Impacted", icon: <Users className="w-5 h-5" /> },
              { number: "$325K", label: "Scholarships Awarded", icon: <Heart className="w-5 h-5" /> },
              { number: "40+", label: "Corporate Partners", icon: <Globe className="w-5 h-5" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="glass-card-dark rounded-2xl p-6 text-center card-hover"
                variants={cardVariant}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] text-blue-300 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text-hero">{stat.number}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-24 bg-white relative overflow-hidden">
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
              Governance
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4" variants={fadeInUp}>
              Foundation Leadership
            </motion.h2>
            <motion.p className="text-slate-400 text-[16px]" variants={fadeInUp}>
              Guided by a dedicated Board of Directors committed to student success and fiscal responsibility.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="bg-[#fafbfd] rounded-2xl p-8 md:p-12 border border-slate-100/80"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200/60">Executive Committee</h3>
                <ul className="space-y-4">
                  {[
                    { role: "President", desc: "Community Leader" },
                    { role: "Vice President", desc: "Industry Partner" },
                    { role: "Treasurer", desc: "Financial Expert" },
                    { role: "Secretary", desc: "Education Advocate" },
                  ].map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center py-1">
                      <span className="font-medium text-slate-900 text-sm">{item.role}</span>
                      <span className="text-sm text-slate-400">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200/60">Board Oversight</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  The Foundation Board provides strategic direction, fiduciary oversight, and fundraising leadership. Members represent diverse industries including finance, technology, healthcare, and public service.
                </p>
                <Link href="/dashboard">
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10 font-semibold btn-premium">
                    Access Board Dashboard
                    <ArrowRight size={15} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
