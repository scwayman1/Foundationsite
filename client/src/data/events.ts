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
  useGenericPhotos?: boolean;
  galleryImages?: Array<{
    src: string;
    alt: string;
  }>;
  resources?: Array<{
    label: string;
    href: string;
    description: string;
  }>;
  etiquette?: string[];
  livestreamEmbed?: string;
}

export const foundationEvents: FoundationEvent[] = [
  {
    slug: "coastline-college-commencement-2026",
    title: "Coastline College Commencement 2026",
    status: "Upcoming",
    dateLabel: "Friday, June 5, 2026",
    timeLabel: "6:00 PM – 8:00 PM PDT",
    location: "Student Services Center, 11460 Warner Ave., Fountain Valley, CA 92708",
    excerpt:
      "A polished commencement guide for graduates, families, and supporters — with the livestream, parking map, ceremony program, etiquette guidance, and photo links all in one place.",
    featuredImage: "/commencement-2025.jpg",
    featuredAlt: "Coastline commencement graduate celebrating with family and supporters",
    ctaLabel: "Watch the YouTube livestream",
    ctaHref: "https://youtube.com/live/g1F8V0_QVZk?feature=share",
    body: [
      "Join Coastline College as we celebrate the Class of 2026 on Friday, June 5, from 6:00 to 8:00 PM at the Student Services Center in Fountain Valley. The evening is designed to honor the dedication, resilience, and achievement of Coastline’s graduates in a setting that feels joyful, welcoming, and worthy of the milestone.",
      "This event page brings together the key details guests typically need in the final days before commencement: where to park, how to follow the ceremony, what to expect from the program, and how to participate in a way that keeps the experience strong for every graduate and family in attendance.",
      "If you cannot join in person, the ceremony will stream live on YouTube beginning at 5:30 PM. Guests attending on campus can also return here after the event for photos and program materials.",
    ],
    useGenericPhotos: false,
    galleryImages: [
      {
        src: "/commencement-gallery-1.jpg",
        alt: "Coastline graduate posing with family members at commencement",
      },
      {
        src: "/commencement-gallery-2.jpg",
        alt: "Happy Coastline graduate holding diploma cover at commencement",
      },
      {
        src: "/commencement-gallery-3.jpg",
        alt: "Graduate celebrating with family member and diploma cover at Coastline commencement",
      },
      {
        src: "/commencement-gallery-4.jpg",
        alt: "Smiling Coastline graduate in the commencement procession flashing a peace sign",
      },
      {
        src: "/commencement-gallery-5.jpg",
        alt: "Three Coastline graduates smiling together in caps and gowns",
      },
      {
        src: "/commencement-gallery-6.jpg",
        alt: "Coastline graduate waving on stage during commencement",
      },
    ],
    resources: [
      {
        label: "Parking map",
        href: "https://documents.coastline.edu/Student%20Life/Graduation/CommencementParkingMap-ADA.pdf",
        description: "Download the ADA-accessible campus parking map before arrival.",
      },
      {
        label: "2026 commencement program",
        href: "https://documents.coastline.edu/Student%20Life/Graduation/2026CommencementProgram.pdf",
        description: "View the official program, ceremony order, and graduate listings.",
      },
      {
        label: "Ceremony etiquette guide",
        href: "https://documents.coastline.edu/Student%20Life/Graduation/CommencementEtiquetteInfographic-ADA.pdf",
        description: "Review the etiquette expectations that help keep the ceremony respectful and smooth.",
      },
      {
        label: "YouTube livestream",
        href: "https://youtube.com/live/g1F8V0_QVZk?feature=share",
        description: "Watch live beginning at 5:30 PM on June 5 or share with family and friends.",
      },
      {
        label: "Event photo album",
        href: "https://www.flickr.com/photos/124026087@N04/albums/72177720333117709",
        description: "Access ceremony photos after the event and download images from Flickr.",
      },
      {
        label: "Grad gear shop",
        href: "https://www.thecommencementgroup.com/coastlinecollege/",
        description: "Shop Coastline Class of 2026 apparel, gifts, and graduation keepsakes.",
      },
    ],
    etiquette: [
      "Leave items that detract from the ceremony at home so the focus stays on graduates and families.",
      "Graduates and special guests should remain for the full ceremony.",
      "Guests are asked to stay seated throughout the program unless directed otherwise.",
      "Please do not block aisles or passageways to greet graduates or take photos during the ceremony.",
    ],
    livestreamEmbed: "https://www.youtube.com/embed/g1F8V0_QVZk",
  },
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
