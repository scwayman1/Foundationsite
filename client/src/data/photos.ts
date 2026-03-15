export type PhotoRole =
  | "hero"
  | "feature"
  | "event-card"
  | "event-gallery"
  | "event-hero"
  | "event-feature"
  | "event-detail"
  | "news-card"
  | "community-strip"
  | "program-card"
  | "background"
  | "donor-story";

export interface CoastlinePhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  eventName?: string;
  year?: number;
  tags: string[];
  roles: PhotoRole[];
  objectPosition?: string;
  caption?: string;
  notes?: string;
}

export const coastlinePhotos: CoastlinePhoto[] = [
  {
    id: "scholarship-recipients-2024",
    src: "/Scholarship Recipients .jpg",
    alt: "Scholarship recipients gathered at a Coastline College Foundation event",
    title: "Scholarship Recipients",
    eventName: "Scholarship Reception",
    year: 2024,
    tags: ["students", "scholarships", "recognition", "foundation-event"],
    roles: ["event-hero", "event-feature", "event-detail", "event-card", "event-gallery", "news-card"],
    objectPosition: "center 38%",
    caption: "Scholarship Reception, 2024",
    notes: "Primary scholarship ceremony image. Use as lead event image before rotating anything else.",
  },
  {
    id: "scott-scholarship-family",
    src: "/Scott at Scholarship family.jpg",
    alt: "Foundation leadership with scholarship honorees and supporters",
    title: "Scholarship Family Moment",
    eventName: "Scholarship Reception",
    year: 2024,
    tags: ["scholarships", "donors", "community", "recognition"],
    roles: ["event-feature", "event-detail", "event-gallery", "news-card", "donor-story"],
    objectPosition: "center 42%",
    caption: "Scholarship Reception, 2024",
  },
  {
    id: "coastline-community-2024",
    src: "/coastline-community.jpg",
    alt: "Coastline Foundation community members gathered at an event",
    title: "Community Gathering",
    eventName: "Foundation Community Event",
    year: 2024,
    tags: ["community", "outdoor", "supporters", "foundation-event"],
    roles: ["hero", "community-strip", "event-gallery", "background"],
    objectPosition: "center 40%",
    caption: "Community Gathering, 2024",
    notes: "Good supporting atmosphere image, but not ideal as the primary scholarship-event visual.",
  },
  {
    id: "tom-student-2024",
    src: "/Tom and Student.jpg",
    alt: "Supporter and student in conversation at a Coastline Foundation event",
    title: "Supporter and Student",
    eventName: "Foundation Gathering",
    year: 2024,
    tags: ["students", "supporters", "connection", "donor-story"],
    roles: ["feature", "news-card", "community-strip", "donor-story", "event-gallery"],
    objectPosition: "center 42%",
    caption: "Student Recognition, 2024",
  },
  {
    id: "meribeth-student-2024",
    src: "/Meribeth and Student.jpg",
    alt: "Coastline supporter with student at a Foundation event",
    title: "Supporter and Student Portrait",
    eventName: "Foundation Event",
    year: 2024,
    tags: ["students", "supporters", "recognition", "portrait"],
    roles: ["news-card", "event-card", "donor-story", "community-strip", "event-gallery"],
    objectPosition: "center 35%",
    caption: "Foundation Event, 2024",
  },
  {
    id: "coastline-speaker-wide",
    src: "/coastline-speaker-wide.jpg",
    alt: "Speaker addressing a Coastline Foundation audience",
    title: "Speaker at Foundation Event",
    eventName: "Foundation Event",
    year: 2024,
    tags: ["speaker", "leadership", "event", "audience"],
    roles: ["hero", "feature", "background"],
    objectPosition: "center 40%",
    caption: "Foundation Gathering, 2024",
    notes: "Strong atmosphere image for general Foundation pages, but too broad for scholarship-event specificity.",
  },
  {
    id: "scott-podium-2",
    src: "/Scott Podium2.jpg",
    alt: "Foundation speaker at podium during Coastline event",
    title: "Podium Moment",
    eventName: "Foundation Event",
    year: 2024,
    tags: ["speaker", "leadership", "event"],
    roles: ["event-gallery", "background"],
    objectPosition: "center 32%",
    caption: "Foundation Gathering, 2024",
    notes: "Use only as supporting image, not as the lead image for hospitality- or scholarship-oriented events.",
  },
  {
    id: "coastline-award-1",
    src: "/coastline-award-1.jpg",
    alt: "Award recognition moment at Coastline Foundation event",
    title: "Award Recognition",
    eventName: "Foundation Recognition Event",
    year: 2024,
    tags: ["awards", "recognition", "students", "supporters"],
    roles: ["event-detail", "event-gallery", "news-card", "feature"],
    objectPosition: "center 45%",
    caption: "Recognition Event, 2024",
  },
  {
    id: "coastline-award-2",
    src: "/coastline-award-2.jpg",
    alt: "Recognition photo from Coastline Foundation event",
    title: "Recognition Portrait",
    eventName: "Foundation Recognition Event",
    year: 2024,
    tags: ["awards", "recognition", "portrait"],
    roles: ["event-card", "event-gallery", "news-card"],
    objectPosition: "center 42%",
    caption: "Recognition Event, 2024",
  },
  {
    id: "coastline-award-3",
    src: "/coastline-award-3.jpg",
    alt: "Student and supporter recognition moment at Coastline event",
    title: "Recognition Moment",
    eventName: "Foundation Recognition Event",
    year: 2024,
    tags: ["awards", "students", "supporters", "recognition"],
    roles: ["event-card", "event-gallery", "feature", "news-card"],
    objectPosition: "center 44%",
    caption: "Recognition Event, 2024",
  },
];

export function photosByRole(role: PhotoRole) {
  return coastlinePhotos.filter((photo) => photo.roles.includes(role));
}

export function photosByTag(tag: string) {
  return coastlinePhotos.filter((photo) => photo.tags.includes(tag));
}
