import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, CheckCircle2, Landmark, Mail, MapPin, Sparkles, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const moments = [
  {
    title: "Casino Night Kickoff",
    date: "October 17",
    place: "Newport Beach Campus",
    detail:
      "A polished casino-style evening with play-money table games, hospitality, music, and recognition for alumni, donors, civic leaders, business partners, faculty, and staff.",
    icon: Sparkles,
    number: "01",
    art: "/50-year-brochure/packet-page-03.jpg",
    motif: "Cards, dice, hospitality, and Newport Beach energy",
  },
  {
    title: "Donor Wall Recognition",
    date: "February 2027",
    place: "Coastline College Foundation",
    detail:
      "A permanent expression of gratitude that connects 50th Anniversary supporters to Coastline's next era of scholarships, student support, and community impact.",
    icon: Landmark,
    number: "02",
    art: "/50-year-brochure/packet-page-04.jpg",
    motif: "Permanent donor recognition with deep navy legacy styling",
  },
  {
    title: "Student Showcase",
    date: "Spring 2027",
    place: "Fountain Valley",
    detail:
      "A student-centered showcase of projects, demonstrations, creative work, career pathways, transfer momentum, and the community outcomes philanthropy makes possible.",
    icon: Users,
    number: "03",
    art: "/50-year-brochure/packet-page-05.jpg",
    motif: "Students center stage in Fountain Valley",
  },
];

const tiers = [
  {
    name: "Golden Dolphin",
    label: "Presenting Sponsor",
    amount: "$50,000",
    tickets: "30 Casino Night tickets",
    benefits: ["Premier campaign recognition", "Naming opportunities", "Prominent donor wall recognition", "VIP reception", "Sponsor quote placement"],
  },
  {
    name: "Pacific Legacy",
    label: "Leadership Sponsor",
    amount: "$25,000",
    tickets: "20 Casino Night tickets",
    benefits: ["Leadership-level campaign presence", "Naming opportunities", "Digital donor wall feature", "VIP photo with college leadership"],
  },
  {
    name: "Anniversary Sponsor",
    label: "Community Sponsor",
    amount: "$10,000",
    tickets: "15 Casino Night tickets",
    benefits: ["Logo on event signage", "Event website recognition", "Digital sponsor reel inclusion", "Campaign gratitude listing"],
  },
  {
    name: "Cresting Wave",
    label: "Community Sponsor",
    amount: "$5,000",
    tickets: "8 Casino Night tickets",
    benefits: ["Logo on signage and event website", "Post-event gratitude recap", "Community partner recognition"],
  },
  {
    name: "Dolphin Pod",
    label: "Community Partner",
    amount: "$2,500",
    tickets: "4 Casino Night tickets",
    benefits: ["Name or logo in program", "Community partner recognition", "Foundation campaign listing"],
  },
];

const brochureArtwork = [
  {
    src: "/50-year-brochure/packet-page-01.jpg",
    alt: "Cover of the Coastline College 50th Anniversary sponsorship brochure",
    label: "Brochure cover",
    title: "Celebrating 50 Years of Coastline College",
    copy: "The website hero now takes its visual cue directly from the packet: a dark coastal foundation, a prominent anniversary seal, and restrained gold emphasis.",
  },
  {
    src: "/50-year-brochure/packet-page-02.jpg",
    alt: "Overview page from the Coastline College 50th Anniversary sponsorship brochure",
    label: "Overview spread",
    title: "One anniversary season",
    copy: "The overview page's numbered structure now shapes the web experience: event anchors, sponsor pathways, and media opportunities remain easy to scan.",
  },
  {
    src: "/50-year-brochure/packet-page-08.jpg",
    alt: "Sponsorship visibility page from the Coastline College 50th Anniversary packet",
    label: "Visibility matrix",
    title: "Sponsor visibility, made explicit",
    copy: "The sponsor section keeps the packet's ladder logic and recognition clarity visible for paid traffic and serious partner review.",
  },
];

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

function JsonLd() {
  const origin = typeof window === "undefined" ? "https://foundation.coastline.edu" : window.location.origin;
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Coastline College 50th Anniversary Casino Night",
    description:
      "Coastline College Foundation's 50th Anniversary sponsorship season honors the past, celebrates the present, and funds the future through Casino Night, donor wall recognition, and a student showcase.",
    startDate: "2026-10-17",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Coastline College Newport Beach Campus",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Newport Beach",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Coastline College Foundation",
      url: origin,
      email: "foundation@coastline.edu",
    },
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: `${tier.name} ${tier.label}`,
      price: tier.amount.replace(/[$,]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${origin}/50-year#sponsorship-levels`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FiftyYear() {
  useEffect(() => {
    const title = "Coastline College 50th Anniversary Sponsorship | 50 Year";
    const description =
      "Honor the past, celebrate the present, and fund the future with Coastline College Foundation's 50th Anniversary sponsorship season, including Casino Night, donor wall recognition, and the Student Showcase.";
    document.title = title;
    setMeta("description", description);
    setMeta("keywords", "Coastline College 50th Anniversary, Coastline sponsorship, Casino Night Newport Beach, Golden Dolphin sponsor, college foundation donor wall, student showcase");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", `${window.location.origin}/50-year-brochure/packet-page-01.jpg`, "property");
    setLink("canonical", `${window.location.origin}/50-year`);
  }, []);

  return (
    <div className="bg-[#f7fbfe] text-[#102a43]">
      <JsonLd />

      <section className="relative isolate min-h-[86vh] overflow-hidden bg-[#06263a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(247,212,122,0.22),transparent_28%),linear-gradient(135deg,#06263a_0%,#08324a_46%,#031b2a_100%)]" />
        <div className="absolute inset-x-0 top-0 h-2 bg-[#d8b45f]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f7fbfe] to-transparent" />

        <div className="container relative z-10 grid min-h-[86vh] gap-12 py-16 lg:grid-cols-[0.98fr_420px] lg:items-center">
          <motion.div
            className="max-w-4xl"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#f7d47a]/45 bg-[#f7d47a]/14 px-4 py-2 text-sm font-semibold text-[#ffe9a3]">
              <Trophy size={16} aria-hidden="true" />
              Coastline College 50th Anniversary
            </p>
            <div className="mb-6 flex items-end gap-4 text-[#f7d47a]" aria-hidden="true">
              <span className="text-[6.6rem] font-black leading-none md:text-[10rem]">50</span>
              <span className="mb-4 max-w-[9rem] text-sm font-black uppercase leading-4 tracking-[0.28em] md:mb-7">
                Years of Coastline
              </span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] text-white md:text-6xl">
              Honor the past. Celebrate the present. Fund the future.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              The Coastline College Foundation's 50th Anniversary season invites partners to invest in scholarships, student support, flexible learning pathways, and the community partnerships that will define Coastline's next 50 years.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-md bg-[#f7d47a] px-6 py-6 text-[#08324a] hover:bg-[#ffe08a]">
                <a href="#sponsorship-levels">
                  View Sponsorship Levels
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md border-white/25 bg-white/8 px-6 py-6 text-white hover:bg-white/14">
                <a href="mailto:foundation@coastline.edu?subject=Coastline%2050th%20Anniversary%20Sponsorship">
                  Contact the Foundation
                  <Mail size={17} aria-hidden="true" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="order-first lg:order-none lg:block"
            aria-label="Coastline College 50th Anniversary brochure artwork"
          >
            <div className="relative mx-auto max-w-[360px] lg:max-w-none">
              <div className="absolute -right-5 -top-5 h-full w-full border-2 border-[#d8b45f]/60" aria-hidden="true" />
              <figure className="relative overflow-hidden rounded-sm border border-[#d8b45f]/50 bg-white p-2 shadow-2xl">
                <img
                  src="/50-year-brochure/packet-page-01.jpg"
                  alt="Coastline College 50th Anniversary sponsorship brochure cover artwork"
                  className="aspect-[17/22] w-full object-cover"
                />
                <figcaption className="sr-only">
                  Original Coastline College 50th Anniversary packet cover used as web artwork.
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </section>

      <section aria-labelledby="anniversary-overview" className="py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0b6fa4]">50 years of access and achievement</p>
              <h2 id="anniversary-overview" className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[#08324a] md:text-5xl">
                A sponsorship season built around recognition, student stories, and lasting community investment.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Past", "Honor the people and partnerships that made flexible, student-centered education possible."],
                ["Present", "Bring alumni, faculty, staff, leaders, donors, and friends together in visible celebration."],
                ["Future", "Fund scholarships, student support, learning pathways, and the next era of Coastline impact."],
              ].map(([title, copy]) => (
                <article key={title} className="rounded-lg border border-sky-100 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-[#08324a]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="brochure-story" className="bg-white py-20">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#0b6fa4]">Directly from the brochure</p>
            <h2 id="brochure-story" className="mt-3 text-3xl font-bold text-[#08324a] md:text-5xl">
              The website now carries the packet artwork, not just the packet facts.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              The cover, overview spread, and sponsor-visibility matrix are used as visible design anchors so ad visitors immediately recognize the official 50th Anniversary sponsorship language.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {brochureArtwork.map((moment) => (
              <article key={moment.src} className="overflow-hidden rounded-sm border border-slate-200 bg-[#fbfdff] shadow-sm">
                <div className="bg-[#06263a] p-3">
                  <img src={moment.src} alt={moment.alt} className="aspect-[17/22] w-full object-cover shadow-lg" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b6fa4]">{moment.label}</p>
                  <h3 className="mt-3 text-2xl font-bold text-[#08324a]">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{moment.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="signature-moments" className="py-20">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#0b6fa4]">Signature moments</p>
            <h2 id="signature-moments" className="mt-3 text-3xl font-bold text-[#08324a] md:text-5xl">
              Three signature events. One anniversary season.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {moments.map((moment) => {
              const Icon = moment.icon;
              return (
                <article key={moment.title} className="overflow-hidden rounded-sm border border-slate-200 bg-[#fbfdff] shadow-sm">
                  <img src={moment.art} alt={`${moment.title} page artwork from the Coastline 50th Anniversary brochure`} className="h-72 w-full object-cover object-top" />
                  <div className="border-t-4 border-[#d8b45f] p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-4xl font-black text-[#d8b45f]">{moment.number}</span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#08324a] text-[#f7d47a]">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0b6fa4]">{moment.motif}</p>
                    <h3 className="mt-3 text-2xl font-bold text-[#08324a]">{moment.title}</h3>
                    <div className="mt-4 space-y-2 text-sm font-semibold text-[#0b6fa4]">
                      <p className="flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" />{moment.date}</p>
                      <p className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" />{moment.place}</p>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-600">{moment.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-950">
            Casino Night is casino-style entertainment with play-money gaming only; no real-money gambling.
          </p>
        </div>
      </section>

      <section id="sponsorship-levels" aria-labelledby="sponsorship-heading" className="py-20">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-[#0b6fa4]">Sponsorship levels</p>
              <h2 id="sponsorship-heading" className="mt-3 text-3xl font-bold text-[#08324a] md:text-5xl">
                Choose the level that matches your legacy.
              </h2>
            </div>
            <Button asChild className="w-fit rounded-md bg-[#0096d6] px-5 py-5 text-white hover:bg-[#087dad]">
              <a href="mailto:foundation@coastline.edu?subject=50th%20Anniversary%20Sponsor%20Level">
                Start Sponsorship Conversation
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="mb-8 grid gap-5 lg:grid-cols-2">
            {[
              ["/50-year-brochure/packet-page-06.jpg", "Sponsorship opportunities page from the Coastline 50th Anniversary packet"],
              ["/50-year-brochure/packet-page-07.jpg", "Golden Dolphin Presenting Sponsor page from the Coastline 50th Anniversary packet"],
            ].map(([src, alt]) => (
              <figure key={src} className="overflow-hidden rounded-sm border border-slate-200 bg-white p-3 shadow-sm">
                <img src={src} alt={alt} className="aspect-[17/22] w-full object-cover object-top" />
              </figure>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {tiers.map((tier) => (
              <article key={tier.name} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-[#08324a] p-5 text-white">
                  <p className="text-sm font-semibold text-[#f7d47a]">{tier.label}</p>
                  <h3 className="mt-2 text-2xl font-bold">{tier.name}</h3>
                  <p className="mt-4 text-3xl font-bold text-[#f7d47a]">{tier.amount}</p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-semibold text-[#0b6fa4]">{tier.tickets}</p>
                  <ul className="mt-5 space-y-3">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2 text-sm leading-6 text-slate-600">
                        <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-[#0b6fa4]" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="recognition-heading" className="bg-[#06263a] py-20 text-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-[#f7d47a]">Recognition and stewardship</p>
              <h2 id="recognition-heading" className="mt-3 text-3xl font-bold md:text-5xl">
                Sponsorship is visible now and remembered beyond the anniversary year.
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-200">
                Recognition will be coordinated with the Coastline College Foundation and confirmed before publication, including logo use, sponsor names, guest participation, and any in-kind support recognized at fair-market value.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <figure className="overflow-hidden rounded-sm border border-[#d8b45f]/40 bg-white/10 p-3 shadow-2xl">
                <img
                  src="/50-year-brochure/packet-page-10.jpg"
                  alt="Media and publicity opportunities page from the Coastline 50th Anniversary packet"
                  className="aspect-[17/22] w-full object-cover object-top"
                />
              </figure>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Campaign and event website recognition",
                  "Event signage, program, and sponsor reel placement",
                  "Digital and physical donor wall visibility",
                  "Post-event gratitude and community recap",
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-white/12 bg-white/7 p-5">
                    <CheckCircle2 className="mb-4 text-[#f7d47a]" aria-hidden="true" />
                    <p className="font-semibold leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="sponsor-contact" className="bg-white py-20">
        <div className="container">
          <div className="grid gap-8 rounded-lg border border-slate-200 bg-[#f7fbfe] p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0b6fa4]">Next step</p>
              <h2 id="sponsor-contact" className="mt-3 text-3xl font-bold text-[#08324a] md:text-4xl">
                Confirm your sponsorship level with the Coastline College Foundation.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Sponsors can confirm a level, provide a logo or recognition name, coordinate guest participation, and discuss in-kind support for hospitality, printing, photography, auction support, or related anniversary needs.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-md bg-[#08324a] px-6 py-6 text-white hover:bg-[#0b3d59]">
              <a href="mailto:foundation@coastline.edu?subject=Coastline%2050th%20Anniversary%20Sponsorship">
                Contact Foundation Team
                <Mail size={17} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
