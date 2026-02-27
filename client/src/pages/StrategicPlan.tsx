import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
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

export default function StrategicPlan() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-28 md:py-36 bg-[#0A1628] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-award-3.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/75 to-[#0A1628]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/70 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-teal-500/[0.05] rounded-full blur-[120px]" />

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
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">2025-2028 Roadmap</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.08]"
              variants={fadeInUp}
            >
              Strategic Plan:{" "}
              <span className="gradient-text-hero">Goals & Objectives</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              A comprehensive framework designed to expand philanthropic support, broaden stewardship, increase community outreach, and strengthen our advancement team.
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Strategic Table Section ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 ring-pattern" />
        <div className="container relative z-10">
          <motion.div
            className="rounded-2xl overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-200/30"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="bg-[#0A1628] p-7 md:p-9 relative overflow-hidden">
              <div className="absolute inset-0 root-pattern opacity-40" />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/[0.06] rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-white">2025-2028 Coastline College Foundation Strategic Plan</h2>
                <p className="text-blue-300/70 mt-1.5 text-sm">Key Goals & Objectives for Sustainable Growth</p>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {/* Goal 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-blue-50/30">
                <div className="md:col-span-4 p-7 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">Expand Philanthropic Support</h3>
                      <p className="text-xs text-slate-400">Driving financial growth through diversified funding streams.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-7 md:p-8">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center text-sm">
                    <Target size={15} className="mr-2 text-blue-600" /> Key Objectives & Initiatives
                  </h4>
                  <div className="space-y-5">
                    <div className="bg-white p-5 rounded-xl border border-blue-100/60 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-2 text-sm">Achieve Campaign Goals</h5>
                      <p className="text-xs text-slate-500 mb-3">Reach annual goals for each campaign:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Naming Opportunities", "Grants", "Scholarships", "President's Circle", "Giving Tuesday"].map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-medium rounded-lg border border-blue-100/60">{item}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-blue-100/60 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-2 text-sm">Always Carry a Pipeline of $5M in Grant Funding Opportunities</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Strategic Focus Areas</p>
                          <ul className="space-y-2">
                            <li className="text-xs text-slate-600 flex items-start gap-2">
                              <CheckCircle size={13} className="mt-0.5 text-teal-500 flex-shrink-0" />
                              <span><strong>Changing Workforce:</strong> Preparing students for emerging industries</span>
                            </li>
                            <li className="text-xs text-slate-600 flex items-start gap-2">
                              <CheckCircle size={13} className="mt-0.5 text-teal-500 flex-shrink-0" />
                              <span><strong>AI Literacy:</strong> Research powerhouse potential & labor assist initiatives</span>
                            </li>
                            <li className="text-xs text-slate-600 flex items-start gap-2">
                              <CheckCircle size={13} className="mt-0.5 text-teal-500 flex-shrink-0" />
                              <span><strong>Systemic Inequality:</strong> Addressing basic needs for equity</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Current Pipeline Partners</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["US Bank", "Samueli Fund", "Doyle Foundation", "Lumina Foundation", "Howmet Aerospace", "Ascendium Foundation"].map((partner, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-500 text-[11px] rounded-lg border border-slate-200/60">{partner}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-blue-100/60 shadow-sm">
                        <h5 className="font-bold text-slate-800 mb-1 text-sm">Broaden Donor Base</h5>
                        <p className="text-xs text-slate-500">Expand annual appeals emphasizing stewardship for mid-level donors.</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-blue-100/60 shadow-sm">
                        <h5 className="font-bold text-slate-800 mb-1 text-sm">Enhance Donor Stewardship</h5>
                        <p className="text-xs text-slate-500">Annual donor events, improve/increase donor interaction.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                <div className="md:col-span-4 p-7 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">Broaden Stewardship & Cultivation</h3>
                      <p className="text-xs text-slate-400">Deepening relationships with our supporters.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-7 md:p-8">
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#fafbfd] border border-slate-100/80 hover:border-teal-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1 text-sm">Strengthen Donor Relationships</h5>
                      <p className="text-xs text-slate-500">Annual donor appreciation events and personalized stewardship plans.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#fafbfd] border border-slate-100/80 hover:border-teal-200 transition-colors">
                      <h5 className="font-bold text-slate-800 mb-1 text-sm">Cultivate Mid-Level Donors</h5>
                      <p className="text-xs text-slate-500">Tailored stewardship activities to grow mid-tier donor support and engagement.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-blue-50/30">
                <div className="md:col-span-4 p-7 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white shadow-lg">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">Increase Community Outreach</h3>
                      <p className="text-xs text-slate-400">Expanding visibility and impact in the community.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-7 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Partnership with PR & Marketing", desc: "Increase Foundation and College visibility within the community." },
                      { title: "Amplify Coastline's Story", desc: "Increase community members sharing Coastline's Impact." },
                      { title: "Social Responsibility Initiatives", desc: "Engage with local organizations, alumni, and staff in community-driven causes." },
                      { title: "In-reach and Service Orientation", desc: "Establish internal service-oriented processes to collaborate with college departments." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100/60 shadow-sm hover:shadow-md transition-shadow">
                        <h5 className="font-bold text-slate-800 mb-1 text-sm">{item.title}</h5>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goal 4 */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                <div className="md:col-span-4 p-7 md:p-8 border-b md:border-b-0 md:border-r border-slate-200/60">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">Build, Support & Strengthen Team</h3>
                      <p className="text-xs text-slate-400">Investing in our people and capabilities.</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 p-7 md:p-8">
                  <div className="space-y-3">
                    {[
                      { title: "Assess Foundation Engagement", desc: "Regular surveys to align Foundation support with departmental needs." },
                      { title: "Develop Foundation Ambassadors", desc: "Train college staff as fundraisers and community advocates; onboard new Deans and Managers." },
                      { title: "Invest in Professional Development", desc: "Provide resources and technology to boost employee efficiency and effectiveness." },
                      { title: "Employee Recognition", desc: "Expand opportunities to acknowledge and celebrate team achievements." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#fafbfd] border border-slate-100/80 hover:border-amber-200 transition-colors">
                        <h5 className="font-bold text-slate-800 mb-1 text-sm">{item.title}</h5>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
