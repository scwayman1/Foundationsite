import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { newsPosts } from "@/data/news";

export default function NewsPost() {
  const [, params] = useRoute("/news/:slug");
  const post = newsPosts.find((entry) => entry.slug === params?.slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f7fbfe] px-6">
        <div className="max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">News & Impact</p>
          <h1 className="text-3xl font-heading font-bold text-[#08324a] mb-4">Story not found</h1>
          <p className="text-slate-600 leading-7 mb-6">This article may have moved, been renamed, or not been published yet.</p>
          <Button asChild className="bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl">
            <Link href="/news">Back to News & Impact</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7fbfe] min-h-screen">
      <section className="relative overflow-hidden bg-white border-b border-sky-100">
        <div className="container py-16 md:py-20">
          <Link href="/news">
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b6fa4] hover:text-[#08324a] transition-colors mb-8">
              <ArrowLeft size={14} /> Back to News & Impact
            </a>
          </Link>
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">{post.category}</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#08324a] leading-[1.05] mb-5">{post.title}</h1>
            <p className="text-lg text-slate-600 leading-8 mb-6 max-w-3xl">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>{post.author}</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> {post.publishedAt}</span>
              <span className="text-slate-300">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-white shadow-[0_18px_34px_rgba(6,38,58,0.06)]">
            {post.embedUrl ? (
              <div className="aspect-video w-full bg-slate-950">
                <iframe
                  src={post.embedUrl}
                  title={post.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={post.featuredImage}
                alt={post.featuredAlt}
                className="h-[360px] md:h-[460px] w-full object-cover"
                style={{ objectPosition: post.imagePosition ?? "center" }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
            <article className="rounded-[28px] border border-sky-100 bg-white px-7 py-8 md:px-10 md:py-12 shadow-sm">
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-8 prose-p:text-[16px] prose-headings:text-[#08324a]">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {post.galleryImages?.length ? (
                <div className="mt-10 border-t border-sky-100 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {post.galleryImages.map((image) => (
                      <figure key={image.src} className="overflow-hidden rounded-[20px] border border-sky-100 bg-[#f7fbfe]">
                        <img src={image.src} alt={image.alt} className="h-56 w-full object-cover" />
                        {image.caption ? <figcaption className="px-4 py-3 text-sm leading-6 text-slate-600">{image.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="rounded-[24px] border border-sky-100 bg-[#eaf6fb] p-6 md:p-7 shadow-sm lg:sticky lg:top-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0b6fa4] mb-3">Next step</p>
              <h2 className="text-2xl font-heading font-bold text-[#08324a] leading-tight mb-3">Turn attention into action</h2>
              <p className="text-slate-600 leading-7 text-sm mb-6">
                Learn more about the students, programs, and partnerships that help Coastline create opportunity across the community.
              </p>
              <Button asChild className="w-full bg-[#0096d6] hover:bg-[#0284bc] text-white rounded-xl font-semibold btn-premium">
                <Link href={post.ctaHref}>
                  {post.ctaLabel} <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
