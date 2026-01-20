import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, Briefcase } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useCoastlinePhotos } from "@/contexts/PhotoContext";

// Animated counter component for KPIs
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

// Reusable fade-in animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export default function Home() {
  const [, setLocation] = useLocation();
  const { getHeroPhoto, getRandomPhoto, getCardPhotos, isReady } = useCoastlinePhotos();

  // Memoize photo selections so they stay stable during the session
  // Photos will change on page refresh, giving a fresh feel each visit
  // Uses category-agnostic approach: tries specific category first, falls back to any photo
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

  // Get photos for program cards - distribute unique photos across cards
  const programPhotos = useMemo(() => {
    // Use getCardPhotos to get 3 shuffled unique photos
    // Pass empty string to get from all categories
    const cardPhotos = getCardPhotos("", 3);

    return {
      it: cardPhotos[0] || null,
      business: cardPhotos[1] || null,
      healthcare: cardPhotos[2] || null,
    };
  }, [getCardPhotos]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Dynamic background from Photo Engine */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay transition-opacity duration-700"
          style={{
            backgroundImage: `url('${heroPhoto?.fullUrl || "/coastline-speaker-close.jpg"}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-4 backdrop-blur-sm"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Empowering Future Leaders
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold leading-tight tracking-tight"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Investing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Student Success</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Supporting students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                onClick={() => setLocation("/strategic-plan")}
              >
                View Strategic Plan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40"
                onClick={() => setLocation("/dashboard")}
              >
                Board Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated abstract shapes */}
        <motion.div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </section>

      {/* KPI Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white -mt-10 relative z-20">
        {/* Subtle floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-40 h-40 bg-teal-200/20 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Total Assets Card */}
            <motion.div variants={cardVariant}>
              <Card className="glass-card border-white/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group h-full relative">
                <motion.div
                  className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold gradient-text-blue">
                      <AnimatedNumber value={4.62} prefix="$" suffix="M" decimals={2} />
                    </span>
                    <motion.span
                      className="text-xs font-medium text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center border border-emerald-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <TrendingUp size={12} className="mr-1" />
                      10.0%
                    </motion.span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Growth from $4.2M previous year</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Donations Card */}
            <motion.div variants={cardVariant}>
              <Card className="glass-card border-white/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group h-full relative">
                <motion.div
                  className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full"
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      <AnimatedNumber value={363.0} prefix="$" suffix="K" decimals={1} />
                    </span>
                    <motion.span
                      className="text-xs font-medium text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center border border-emerald-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <TrendingUp size={12} className="mr-1" />
                      30.4%
                    </motion.span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">From previous year</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Scholarships Awarded Card */}
            <motion.div variants={cardVariant}>
              <Card className="glass-card border-white/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group h-full relative">
                <motion.div
                  className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Scholarships Awarded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold gradient-text-gold">
                      <AnimatedNumber value={384.6} prefix="$" suffix="K" decimals={1} />
                    </span>
                    <motion.span
                      className="text-xs font-medium text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center border border-emerald-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <TrendingUp size={12} className="mr-1" />
                      18.2%
                    </motion.span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">309 awards issued in FY24/25</p>
                  <p className="text-xs text-slate-400 mt-1">Internal: $323,362 • External: $61,215</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Students Impacted Card */}
            <motion.div variants={cardVariant}>
              <Card className="glass-card border-white/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group h-full relative">
                <motion.div
                  className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full"
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Students Impacted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      <AnimatedNumber value={208} decimals={0} />
                    </span>
                    <motion.span
                      className="text-xs font-medium text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center border border-emerald-100"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      <TrendingUp size={12} className="mr-1" />
                      38.67%
                    </motion.span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">From previous year</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white overflow-hidden relative">
        {/* Floating gradient orb */}
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-teal-100/40 rounded-full blur-3xl -z-10"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-50 rounded-full z-0"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.img
                src={missionPhoto?.fullUrl || "/coastline-community.jpg"}
                alt={missionPhoto?.description || "Coastline College community"}
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[400px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block border border-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="font-heading font-bold text-4xl text-blue-600 mb-1">
                  <AnimatedNumber value={1985} decimals={0} />
                </p>
                <p className="text-sm text-slate-600 font-medium">Established to support student success</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
                variants={fadeInUp}
              >
                Our Mission
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-heading font-bold text-slate-900"
                variants={fadeInUp}
              >
                Bridging Resource Gaps for <span className="gradient-text-blue">Student Success</span>
              </motion.h2>
              <motion.p
                className="text-slate-600 leading-relaxed text-lg"
                variants={fadeInUp}
              >
                The Coastline College Foundation embodies an entrepreneurial spirit as the college's charitable arm. Our mission is to support students through scholarships, endowments, and innovative financial programs that expand Coastline's capacity to meet student and community needs.
              </motion.p>
              <motion.p
                className="text-slate-600 leading-relaxed"
                variants={fadeInUp}
              >
                In alignment with Coastline's core values of accessibility and upward mobility, the Foundation's role is to bridge resource gaps – empowering students to become impactful contributors to society – and to foster the innovative, "no barriers" ethos of the college.
              </motion.p>
              <motion.div className="pt-4" variants={fadeInUp}>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 transition-all duration-300 hover:scale-105"
                  onClick={() => setLocation("/about")}
                >
                  Learn More About Us <ArrowRight size={16} className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="container relative">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4"
              variants={fadeInUp}
            >
              Strategic <span className="gradient-text">Objectives</span>
            </motion.h2>
            <motion.p
              className="text-slate-600 text-lg"
              variants={fadeInUp}
            >
              Our roadmap for the future focuses on four key pillars designed to maximize impact and sustainability.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              {
                id: 1,
                title: "Strengthen Fundraising and Resource Development",
                desc: "Diversify funding sources and expand partnerships to increase financial support.",
                icon: <DollarSign className="w-6 h-6 text-white" />,
                gradient: "from-blue-500 to-blue-700",
                glow: "group-hover:shadow-blue-500/25"
              },
              {
                id: 2,
                title: "Enhance Program Innovation and Student Success",
                desc: "Develop new programs in emerging fields and expand work-based learning opportunities.",
                icon: <GraduationCap className="w-6 h-6 text-white" />,
                gradient: "from-teal-400 to-teal-600",
                glow: "group-hover:shadow-teal-500/25"
              },
              {
                id: 3,
                title: "Strengthen Outreach and Community Engagement",
                desc: "Increase Coastline's visibility and forge stronger community connections.",
                icon: <Users className="w-6 h-6 text-white" />,
                gradient: "from-indigo-500 to-purple-600",
                glow: "group-hover:shadow-indigo-500/25"
              },
              {
                id: 4,
                title: "Enhance Industry Engagement and Workforce Impact",
                desc: "Deepen relationships with employers and align programs to labor market needs.",
                icon: <Briefcase className="w-6 h-6 text-white" />,
                gradient: "from-amber-400 to-orange-500",
                glow: "group-hover:shadow-amber-500/25"
              }
            ].map((item) => (
              <motion.div
                key={item.id}
                className={`glass-card p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border-white/60 flex items-start gap-6 group cursor-default ${item.glow}`}
                variants={cardVariant}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Program Areas */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            className="flex justify-between items-end mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">Program Areas</h2>
              <p className="text-slate-600">Targeted initiatives aligned with industry needs</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/programs">
                <Button variant="ghost" className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                  View All Programs <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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
                className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
                variants={cardVariant}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  <motion.img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 z-20"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium">
                      {program.stat}
                    </span>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{program.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{program.desc}</p>
                  <Link href="/programs">
                    <motion.span
                      className="text-blue-600 text-sm font-semibold flex items-center cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Learn more <ArrowRight size={14} className="ml-1" />
                    </motion.span>
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
              <Button variant="outline" className="w-full">View All Programs</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        {/* Dynamic background from Photo Engine */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay transition-opacity duration-700"
          style={{
            backgroundImage: `url('${ctaPhoto?.fullUrl || "/coastline-speaker-wide.jpg"}')`
          }}
        />

        {/* Animated background orbs */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-32 -right-32 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="container relative z-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold mb-6"
            variants={fadeInUp}
          >
            Ready to Make an Impact?
          </motion.h2>
          <motion.p
            className="text-blue-100 text-lg max-w-2xl mx-auto mb-10"
            variants={fadeInUp}
          >
            Join us in shaping the future of education and workforce development. Your support creates opportunities for students and strengthens our community.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={fadeInUp}
          >
            <Link href="/get-involved">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold shadow-lg shadow-blue-950/20 transition-all duration-300">
                  Get Involved
                </Button>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white hover:border-white transition-all duration-300">
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
