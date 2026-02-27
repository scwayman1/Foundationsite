import { Button } from "@/components/ui/button";
import { BarChart3, DollarSign, TrendingUp, PieChart, ArrowUpRight, FileText } from "lucide-react";
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

export default function Budget() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-28 md:py-36 bg-[#0A1628] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-speaker-wide.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/75 to-[#0A1628]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/70 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px]" />

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
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">Fiscal Year 2024-25</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.08]"
              variants={fadeInUp}
            >
              Financial{" "}
              <span className="gradient-text-hero">Transparency</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl mb-8"
              variants={fadeInUp}
            >
              A clear overview of our revenue sources, strategic investments, and long-term sustainability goals.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 px-7 py-6 text-[15px] font-semibold rounded-xl btn-premium"
                onClick={() => window.open('https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:d9574f31-703b-4958-bfb3-52d45d1f522d', '_blank')}
              >
                <FileText className="mr-2 h-5 w-5" /> View FY 24-25 Budget Document
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbfd] to-transparent" />
      </section>

      {/* ── Financial Summary Cards ── */}
      <section className="relative -mt-12 z-20 pb-16">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/[0.04] rounded-full blur-2xl group-hover:bg-emerald-500/[0.08] transition-colors duration-500" />
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Total Donations</p>
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <TrendingUp size={18} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">$363.0K</h3>
                <p className="text-xs text-slate-400">Fiscal Year 2024-25</p>
              </div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/[0.04] rounded-full blur-2xl group-hover:bg-blue-500/[0.08] transition-colors duration-500" />
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Scholarships Awarded</p>
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <BarChart3 size={18} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">$384.6K</h3>
                <p className="text-xs text-slate-400">309 awards in FY24/25</p>
              </div>
            </motion.div>

            <motion.div variants={cardVariant}>
              <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 to-teal-500 rounded-t-2xl" />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-teal-500/[0.04] rounded-full blur-2xl group-hover:bg-teal-500/[0.08] transition-colors duration-500" />
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">Total Assets</p>
                  <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                    <PieChart size={18} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">$4.62M</h3>
                <p className="text-xs text-slate-400">+10.0% from prior year</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Revenue Strategy ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 ring-pattern" />
        <div className="container relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em] mb-3 block">Growth Strategy</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-5">Revenue Strategy</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Our strategy focuses on diversifying income streams to ensure long-term sustainability and independence.
              </p>

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "Financial Independence",
                    desc: "Generating $80,000 through our \"Indirect Cost\" revenue model, capturing 10% of all originated funding to support operations.",
                    gradient: "from-blue-500 to-blue-600"
                  },
                  {
                    num: "02",
                    title: "President's Circle Growth",
                    desc: "Expanding membership to increase revenue from $4,200 to $13,000, building a strong network of core supporters.",
                    gradient: "from-teal-400 to-teal-500"
                  },
                  {
                    num: "03",
                    title: "Strategic Events",
                    desc: "Targeting $75,000 from fundraising events designed to engage the community and showcase student success.",
                    gradient: "from-amber-400 to-orange-500"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-start group">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {item.num}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-[#fafbfd] rounded-2xl p-8 border border-slate-100/80 shadow-sm">
                <span className="text-[11px] font-semibold text-teal-600 uppercase tracking-[0.12em] mb-3 block">Future Planning</span>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-6">Planned Giving</h3>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-5 border border-slate-100/80 shadow-sm card-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                        <ArrowUpRight size={18} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Unrealized Assets Tracking</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Implementing a system to track Planned Giving and Legacy Gifts "below the line" to monitor future pipeline value without distorting current operating budgets.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-slate-100/80 shadow-sm card-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600">
                        <DollarSign size={18} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Portfolio Valuation</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Developing a standardized "rule set" for the "Mark Up Value" of our planned giving portfolio to ensure accurate long-term financial projections.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
