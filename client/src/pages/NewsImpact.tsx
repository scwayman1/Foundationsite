import { ArrowRight, CalendarDays, Newspaper, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { featuredPost, newsPosts } from "@/data/news";

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

export default function NewsImpact() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7fbfe]">
      <section className="relative overflow-hidden bg-[#06263a] text-white py-28 md:py-36">
        <img
          src="/coastline-speaker-wide.jpg"
          alt="Coastline Foundation community event"
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,38,58,0.88)_0%,rgba(6,38,58,0.72)_40%,rgba(6,38,58,0.38)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />

        <motion.div
          className="container relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="max-w-3xl" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md mb-6">
              <Sparkles size={14} className="text-[#8fddff]" />
              <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white/90">
                News & Impact
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] mb-6">
              Stories of student success, community impact, and the people who help Coastline move forward.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-slate-200/90 leading-relaxed">
              Explore student stories, Foundation updates, and community partnerships that show how support for Coastline creates opportunity, momentum, and lasting local impact.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative -mt-12 z-20 pb-8">
        <div className="container">
          <motion.div
            className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_18px_40px_rgba(6,38,58,0.08)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[360px] lg:min-h-full">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.featuredAlt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/80 via-[#06263a]/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white backdrop-blur-sm border border-white/12">
                    <Newspaper size={12} /> Featured story
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 lg:p-12 bg-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">
                  {featuredPost.category}
                </p>
                <h2 className="text-3xl font-heading font-bold text-[#08324a] leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 leading-8 text-[16px] mb-6">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8">
                  <span>{featuredPost.author}</span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> {featuredPost.publishedAt}</span>
                  <span className="text-slate-300">•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <div className="space-y-4 mb-8">
                  {featuredPost.body.slice(0, 2).map((paragraph) => (
                    <p key={paragraph} className="text-slate-600 leading-8 text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl px-6 py-5 font-semibold btn-premium">
                    <Link href={`/news/${featuredPost.slug}`}>
                      Read Featured Story <ArrowRight size={15} className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl px-6 py-5 font-semibold border-sky-200 text-[#08324a] hover:bg-sky-50">
                    <Link href={featuredPost.ctaHref}>
                      {featuredPost.ctaLabel}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">News & Impact</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#08324a]">A closer look at Coastline’s students, programs, and community support</h2>
            </motion.div>
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-600 leading-7">
              This section highlights the stories, updates, and partnerships that help show what support for Coastline makes possible for students and the wider community.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {newsPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                className="group overflow-hidden rounded-[24px] border border-sky-100 bg-white shadow-sm hover:shadow-[0_18px_34px_rgba(6,38,58,0.08)] transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.featuredAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06263a]/45 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">{post.category}</p>
                  <h3 className="text-xl font-heading font-bold text-[#08324a] leading-tight mb-3">{post.title}</h3>
                  <p className="text-slate-600 leading-7 text-sm mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                    <span>{post.publishedAt}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/news/${post.slug}`}>
                    <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6fa4] hover:text-[#08324a] transition-colors">
                      Read more <ArrowRight size={14} />
                    </a>
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
