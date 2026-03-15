export type EventStatus = "Upcoming" | "Registration Open" | "Past Event";

export interface FoundationEvent {
  slug: string;
  title: string;
  status: EventStatus;
  dateLabel: string;
  timeLabel: string;
  location: string;
  excerpt: string;
  featuredImage: string;
  featuredAlt: string;
  ctaLabel: string;
  ctaHref: string;
  body: string[];
}

export const foundationEvents: FoundationEvent[] = [
  {
    slug: "coastline-college-scholarship-ceremony-2026",
    title: "Coastline College Scholarship Ceremony 2026",
    status: "Registration Open",
    dateLabel: "Friday, April 17, 2026",
    timeLabel: "5:00 PM – 7:00 PM",
    location: "Coastline College Fountain Valley Student Center",
    excerpt:
      "A banquet-style evening celebrating student achievement, donor generosity, and the connection between scholarship support and student success.",
    featuredImage: "/Scholarship Recipients .jpg",
    featuredAlt: "Coastline scholarship recipients at a recognition event",
    ctaLabel: "Register on GradRoots",
    ctaHref: "https://www.gradroots.com/event/3AxxZRGdSbNgGZqZOKAAyFGl2C0",
    body: [
      "Join us for this year’s Coastline College Scholarship Ceremony, a special evening celebrating student achievement, generosity, and the life-changing power of philanthropy.",
      "Held at the Coastline College Fountain Valley Student Center, this year’s event marks an exciting first: a banquet-style gathering designed to bring scholarship recipients and donors together at the same tables for a more personal and meaningful shared experience.",
      "Guests will enjoy an evening of recognition, connection, and celebration as we honor the remarkable students whose lives are being shaped by scholarship support and the generous donors who make those opportunities possible.",
      "This new format is intended to do more than recognize achievement. It is designed to create real moments of connection between the people investing in education and the students carrying that investment forward.",
    ],
  },
  {
    slug: "foundation-community-partnership-breakfast",
    title: "Foundation Community Partnership Breakfast",
    status: "Registration Open",
    dateLabel: "May 14, 2026",
    timeLabel: "8:00 AM – 9:30 AM",
    location: "Coastline College Foundation Room",
    excerpt:
      "A morning gathering for employers, partners, and supporters focused on workforce pathways, philanthropy, and Coastline’s regional impact.",
    featuredImage: "/coastline-community.jpg",
    featuredAlt: "Coastline College community gathering",
    ctaLabel: "Get Involved",
    ctaHref: "/get-involved",
    body: [
      "This breakfast is intended to bring together community and industry partners who care about student opportunity, workforce readiness, and the long-term economic health of the region.",
      "The program will highlight Coastline’s work at the intersection of education and workforce development while creating room for conversation about partnership, philanthropy, and future collaboration.",
      "For supporters considering deeper involvement, the event serves as both an introduction and a working conversation about what strategic partnership can look like in practice.",
    ],
  },
  {
    slug: "annual-foundation-impact-recap",
    title: "Annual Foundation Impact Recap",
    status: "Past Event",
    dateLabel: "February 6, 2026",
    timeLabel: "12:00 PM – 1:00 PM",
    location: "Coastline College / Foundation Briefing",
    excerpt:
      "A recap of Foundation progress, donor engagement, student support, and strategic priorities for the year ahead.",
    featuredImage: "/Scott Speaking.jpg",
    featuredAlt: "Foundation leadership speaking at a Coastline event",
    ctaLabel: "Read News & Impact",
    ctaHref: "/news",
    body: [
      "The Annual Foundation Impact Recap provided an overview of the Foundation’s recent work, including scholarships, community engagement, and strategic development priorities.",
      "It also created an opportunity to reinforce transparency, stewardship, and the role philanthropy plays in strengthening Coastline’s student-centered mission.",
      "Past event recaps like this help maintain continuity for partners and supporters while giving prospective donors a clear view into the Foundation’s seriousness and momentum.",
    ],
  },
];
