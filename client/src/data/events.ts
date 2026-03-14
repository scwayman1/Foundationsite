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
  featured: boolean;
  ctaLabel: string;
  ctaHref: string;
  body: string[];
}

export const foundationEvents: FoundationEvent[] = [
  {
    slug: "scholarship-recognition-reception",
    title: "Scholarship Recognition Reception",
    status: "Upcoming",
    dateLabel: "April 24, 2026",
    timeLabel: "5:30 PM – 7:30 PM",
    location: "Coastline College, Fountain Valley",
    excerpt:
      "An evening recognizing scholarship recipients, donors, and the shared commitment that helps Coastline students move forward with confidence.",
    featuredImage: "/Scholarship Recipients .jpg",
    featuredAlt: "Coastline scholarship recipients at a recognition event",
    featured: true,
    ctaLabel: "Contact the Foundation",
    ctaHref: "/get-involved",
    body: [
      "The Scholarship Recognition Reception brings together students, donors, and Foundation supporters to recognize the impact of scholarship support at Coastline College.",
      "The event is designed to celebrate student achievement while also making visible the direct connection between generosity and opportunity. It creates a meaningful space for donors and community partners to see how support translates into progress, persistence, and long-term mobility.",
      "For the Foundation, events like this are not simply ceremonial. They are a chance to strengthen relationships, reinforce mission, and deepen shared commitment to student success.",
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
    featured: false,
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
    featured: false,
    ctaLabel: "Read News & Impact",
    ctaHref: "/news",
    body: [
      "The Annual Foundation Impact Recap provided an overview of the Foundation’s recent work, including scholarships, community engagement, and strategic development priorities.",
      "It also created an opportunity to reinforce transparency, stewardship, and the role philanthropy plays in strengthening Coastline’s student-centered mission.",
      "Past event recaps like this help maintain continuity for partners and supporters while giving prospective donors a clear view into the Foundation’s seriousness and momentum.",
    ],
  },
];

export const featuredEvent = foundationEvents.find((event) => event.featured) ?? foundationEvents[0];
