import { Button } from "@/components/ui/button";
import { Heart, Handshake, Users, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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

export default function GetInvolved() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative py-28 md:py-36 bg-[#0A1628] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coastline-community.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/50 to-[#0A1628]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/40 to-transparent" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[120px]" />

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
              <span className="text-[13px] font-medium text-blue-200/90 tracking-wide">Join Our Mission</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.08]"
              variants={fadeInUp}
            >
              Make a{" "}
              <span className="gradient-text-hero">Lasting Impact</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              Your support creates opportunities for students, strengthens our workforce, and builds a more equitable community.
            </motion.p>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Ways to Give ── */}
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
              Ways to Contribute
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4" variants={fadeInUp}>
              How You Can Help
            </motion.h2>
            <motion.p className="text-slate-400 text-[16px]" variants={fadeInUp}>
              There are many ways to support the Coastline College Foundation and make a difference in students' lives.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Donate",
                desc: "Support our mission with a one-time or recurring donation to help students achieve their educational goals.",
                cta: "Donate Now",
                gradient: "from-blue-500 to-blue-600",
                bgLight: "bg-blue-50",
                textColor: "text-blue-600"
              },
              {
                icon: <Handshake className="w-6 h-6" />,
                title: "Partner",
                desc: "Become a corporate partner and help shape the future workforce while supporting educational excellence.",
                cta: "Partner With Us",
                gradient: "from-teal-400 to-teal-500",
                bgLight: "bg-teal-50",
                textColor: "text-teal-600"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Volunteer",
                desc: "Share your expertise and time to help with events, mentoring, and other foundation activities.",
                cta: "Volunteer",
                gradient: "from-amber-400 to-orange-500",
                bgLight: "bg-amber-50",
                textColor: "text-amber-600"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-white border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-500 card-hover overflow-hidden group"
                variants={cardVariant}
              >
                <div className={`h-1 bg-gradient-to-r ${item.gradient} w-full`} />
                <div className="p-8 text-center">
                  <div className={`w-14 h-14 ${item.bgLight} rounded-2xl flex items-center justify-center ${item.textColor} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed">{item.desc}</p>
                  <Button className={`w-full bg-gradient-to-r ${item.gradient} text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-5 font-semibold btn-premium`}>
                    {item.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="py-24 bg-[#fafbfd]">
        <div className="container">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl shadow-slate-200/30 border border-slate-100/60 flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Left: Contact Info */}
            <div className="md:w-5/12 p-10 md:p-14 bg-[#0A1628] text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute inset-0 root-pattern opacity-40" />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/[0.06] rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-teal-500/[0.04] rounded-full blur-[60px]" />

              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.12em] mb-3 block">Reach Out</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Get in Touch</h2>
                <p className="text-slate-400 mb-10 leading-relaxed">
                  Have questions about how you can support the Coastline College Foundation? We'd love to hear from you.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-blue-300">
                      <Phone size={18} />
                    </div>
                    <span className="text-slate-300">(714) 241-6154</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-blue-300">
                      <Mail size={18} />
                    </div>
                    <a href="mailto:foundation@coastline.edu" className="text-slate-300 hover:text-white transition-colors">
                      foundation@coastline.edu
                    </a>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-blue-300">
                      <MapPin size={18} />
                    </div>
                    <div className="text-slate-300">
                      <p>11460 Warner Avenue</p>
                      <p>Fountain Valley, CA 92708</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="md:w-7/12 p-10 md:p-14 bg-white">
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-[#fafbfd] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-[#fafbfd] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-[#fafbfd] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]">Message</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/80 bg-[#fafbfd] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all h-32 resize-none text-sm"
                    placeholder="How would you like to get involved?"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/15 py-6 rounded-xl text-[15px] font-semibold btn-premium">
                  Send Message <ArrowRight size={16} className="ml-2" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
