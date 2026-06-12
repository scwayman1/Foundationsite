import { Button } from "@/components/ui/button";
import {
  buildRayCordovaDonationUrl,
  getRayCordovaVariant,
  rayCordovaCampaign,
} from "@/data/rayCordovaCampaign";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Copy,
  ExternalLink,
  Flag,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

function currentCampaignPath(slug?: string) {
  if (!slug) return "/foundation/ray-cordova";
  return `/foundation/ray-cordova/${slug}`;
}

function setMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function trackRayCordovaEvent(
  eventName: string,
  payload: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  const detail = {
    campaign: "ray_cordova_legacy",
    ...payload,
    event: eventName,
  };
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer?.push(detail);
  window.dispatchEvent(new CustomEvent("foundation:analytics", { detail }));
}

export default function RayCordova() {
  const [, params] = useRoute("/foundation/ray-cordova/:slug");
  const routeSlug = params?.slug;
  const variant = getRayCordovaVariant(routeSlug);
  const donationUrl = buildRayCordovaDonationUrl(variant, routeSlug);
  const progressPercent = Math.round((rayCordovaCampaign.seedFunding / rayCordovaCampaign.goal) * 100);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return currentCampaignPath(routeSlug);
    return `${window.location.origin}${currentCampaignPath(routeSlug)}`;
  }, [routeSlug]);

  useEffect(() => {
    const title = `${variant.headline} | Coastline College Foundation`;
    const description = `${variant.intro} Help raise ${formatCurrency(rayCordovaCampaign.goal)} to name the Coastline College Veteran Resource Center for Ray and support the scholarship.`;
    const canonicalUrl = `${window.location.origin}${currentCampaignPath(routeSlug)}`;
    const imageUrl = `${window.location.origin}${rayCordovaCampaign.heroImage}`;

    document.title = title;
    setMeta("description", description);
    setMeta("keywords", "Ray Cordova, Raymond L. Cordova, Coastline College Foundation, Veteran Resource Center, student veterans, Orange County labor, Raymond L. Cordova Scholarship");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", imageUrl, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);
    setLink("canonical", canonicalUrl);

    trackRayCordovaEvent("page_view", {
      segment: variant.audience,
      source_slug: routeSlug || "general",
      tracking_content: routeSlug || variant.trackingContent,
      path: window.location.pathname,
    });
  }, [routeSlug, variant]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      trackRayCordovaEvent("share_click", {
        segment: variant.audience,
        source_slug: routeSlug || "general",
        method: "copy_link",
      });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#061f30] text-white">
        <div className="absolute inset-0">
          <img
            src={rayCordovaCampaign.heroImage}
            alt="Jim Moreno and Ray Cordova at a Democratic convention"
            className="h-full w-full object-cover object-[52%_42%] opacity-48"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061f30] via-[#061f30]/90 to-[#061f30]/42" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061f30] via-transparent to-[#061f30]/35" />
        </div>

        <motion.div
          className="container relative z-10 grid min-h-[calc(100svh-78px)] items-start gap-10 py-14 sm:py-20 lg:min-h-[calc(100vh-78px)] lg:grid-cols-[1.02fr_0.78fr] lg:items-center"
          initial={false}
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-3xl">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-sky-100 backdrop-blur-md"
              variants={fadeInUp}
            >
              <HeartHandshake className="h-4 w-4" />
              Raymond L. Cordova Legacy Campaign
            </motion.div>
            <motion.h1
              className="break-words font-heading text-[2.36rem] font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
              variants={fadeInUp}
            >
              {variant.headline}
            </motion.h1>
            <motion.p
              className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:mt-6 md:text-xl md:leading-8"
              variants={fadeInUp}
            >
              {variant.intro}
            </motion.p>
            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeInUp}>
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#f7c948] px-7 text-sm font-bold text-[#06263a] shadow-xl shadow-black/20 hover:bg-[#ffd76a]"
              >
                <a
                  href={donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackRayCordovaEvent("donation_cta_click", {
                      segment: variant.audience,
                      source_slug: routeSlug || "general",
                      placement: "hero",
                      donation_url: donationUrl,
                    })
                  }
                >
                  {variant.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white hover:text-[#06263a]"
              >
                <a href="#progress">Campaign Progress</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="hidden rounded-[8px] border border-white/12 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block"
            variants={fadeInUp}
          >
            <img
              src={rayCordovaCampaign.supportImage}
              alt="Jim Moreno and Ray Cordova embracing"
              className="aspect-[4/3] w-full rounded-[6px] object-cover"
            />
            <div className="flex items-start gap-3 px-2 pb-1 pt-4 text-sm leading-6 text-slate-200">
              <Quote className="mt-1 h-4 w-4 flex-shrink-0 text-[#f7c948]" />
              <p>
                Ray's legacy connects military service, labor leadership, civil rights, and the Coastline students who deserve a place of belonging.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="progress" className="bg-[#f5f9fc] py-14 md:py-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <motion.div
              className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b6fa4]">Campaign progress</p>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">Help close the remaining gap</h2>
                </div>
                <span className="rounded-full bg-[#e8f6fb] px-3 py-1 text-sm font-bold text-[#0b6fa4]">{progressPercent}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-[#f7c948]" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Goal</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">{formatCurrency(rayCordovaCampaign.goal)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Seeded</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">{formatCurrency(rayCordovaCampaign.seedFunding)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Remaining</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">{formatCurrency(rayCordovaCampaign.remaining)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-[8px] bg-[#06263a] p-6 text-white shadow-xl shadow-slate-300/40 md:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#f7c948] text-[#06263a]">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-2xl font-bold">Give to the Ray Cordova Legacy Fund</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{variant.ctaFraming}</p>
              <div className="mt-5 rounded-[8px] border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold leading-6 text-white">
                {rayCordovaCampaign.designation}
              </div>
              <Button
                asChild
                className="mt-6 h-12 w-full rounded-full bg-[#f7c948] text-sm font-bold text-[#06263a] hover:bg-[#ffd76a]"
              >
                <a
                  href={donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackRayCordovaEvent("donation_cta_click", {
                      segment: variant.audience,
                      source_slug: routeSlug || "general",
                      placement: "progress_module",
                      donation_url: donationUrl,
                    })
                  }
                >
                  Donate Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <motion.div
            className="lg:sticky lg:top-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b6fa4]">{variant.audienceTitle}</span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              Why this matters
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{variant.audienceCopy}</p>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Flag className="h-5 w-5" />,
                title: "Vietnam Veteran",
                text: "Ray served as a sergeant in the U.S. Army Airborne during the Vietnam era.",
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Labor Leader",
                text: `Known as "${rayCordovaCampaign.knownAs}," Ray helped shape Orange County labor for decades.`,
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Community Advocate",
                text: "His public life was shaped by civil rights, democracy, and dignity for working people.",
              },
              {
                icon: <GraduationCap className="h-5 w-5" />,
                title: "Student Impact",
                text: "The campaign names a Coastline veteran space and strengthens scholarship support.",
              },
            ].map((point) => (
              <motion.div
                key={point.title}
                className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm"
                variants={fadeInUp}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#e8f6fb] text-[#0b6fa4]">
                  {point.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-950">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{point.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f9fc] py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b6fa4]">About Ray</span>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              A life that connected service, labor, and community.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Raymond L. Cordova was a veteran, an Orange County labor leader, and a civic advocate remembered for showing up for people who needed a voice. Naming the Veteran Resource Center after Ray makes his legacy visible in the daily lives of students.
            </p>
          </motion.div>
          <motion.div
            className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b6fa4]">Impact at Coastline</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-slate-950">A permanent place for veteran students</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Coastline's Veteran Resource Center helps students navigate college after service. This campaign pairs visible recognition with scholarship support so Ray's name is tied to practical help and long-term belonging.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[8px] bg-[#f5f9fc] p-4">
                <Award className="mb-3 h-5 w-5 text-[#d49c00]" />
                <p className="text-sm font-bold text-slate-950">Permanent naming</p>
              </div>
              <div className="rounded-[8px] bg-[#f5f9fc] p-4">
                <BookOpen className="mb-3 h-5 w-5 text-[#0b6fa4]" />
                <p className="text-sm font-bold text-slate-950">Scholarship support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-18 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-start">
          <motion.div
            className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b6fa4]">Share the campaign</span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-slate-950">Use the campaign link for this audience</h2>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1 rounded-[8px] border border-slate-200 bg-[#f5f9fc] px-4 py-3 text-sm text-slate-700">
                <span className="block truncate">{shareUrl}</span>
              </div>
              <Button
                type="button"
                onClick={handleCopy}
                variant="outline"
                className="h-12 rounded-full border-slate-300 px-5 font-semibold text-slate-800 hover:bg-slate-50"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[8px] bg-[#06263a] p-6 text-white md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-200">Foundation contact</span>
            <h2 className="mt-3 font-heading text-2xl font-bold">Questions about the campaign?</h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <a
                href={`mailto:${rayCordovaCampaign.contactEmail}`}
                className="flex items-center gap-3 hover:text-white"
                onClick={() =>
                  trackRayCordovaEvent("contact_click", {
                    segment: variant.audience,
                    source_slug: routeSlug || "general",
                    contact_method: "email",
                  })
                }
              >
                <Mail className="h-4 w-4 text-[#f7c948]" />
                {rayCordovaCampaign.contactEmail}
              </a>
              <a
                href={`tel:${rayCordovaCampaign.contactPhone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-3 hover:text-white"
                onClick={() =>
                  trackRayCordovaEvent("contact_click", {
                    segment: variant.audience,
                    source_slug: routeSlug || "general",
                    contact_method: "phone",
                  })
                }
              >
                <Phone className="h-4 w-4 text-[#f7c948]" />
                {rayCordovaCampaign.contactPhone}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#f7c948]" />
                <span>{rayCordovaCampaign.contactAddress}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f9fc] py-12">
        <div className="container">
          <div className="grid gap-5 text-xs leading-6 text-slate-500 md:grid-cols-2">
            <p>Photo source: 68th Assembly District Committee archive, convention photos of Jim Moreno and Ray Cordova.</p>
            <p>Biographical source: Daily Pilot obituary and publicly posted Raymond L. Cordova biography.</p>
          </div>
        </div>
      </section>
    </article>
  );
}
