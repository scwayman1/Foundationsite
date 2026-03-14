export type NewsCategory = "Student Stories" | "Foundation News" | "Giving Insights" | "Scholarships" | "Community Impact";

export interface NewsPost {
  slug: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  featuredAlt: string;
  featured: boolean;
  ctaLabel: string;
  ctaHref: string;
  body: string[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "why-community-college-giving-matters-in-orange-county",
    title: "Why Community College Giving Matters in Orange County",
    category: "Giving Insights",
    excerpt:
      "Community colleges power mobility, workforce readiness, and local resilience. Philanthropic support helps Coastline move faster where public funding alone cannot.",
    author: "Coastline College Foundation",
    publishedAt: "2026-03-13",
    readTime: "4 min read",
    featuredImage: "/coastline-community.jpg",
    featuredAlt: "Coastline College community gathering",
    featured: true,
    ctaLabel: "Support Student Opportunity",
    ctaHref: "/get-involved",
    body: [
      "Community college students are often balancing work, family, and financial pressure at the same time they are trying to build a future. That means relatively small interventions — scholarship support, emergency assistance, program innovation, and employer-connected learning — can have outsized impact.",
      "For Coastline, philanthropy is not a substitute for public education funding. It is a force multiplier. It allows the institution to move faster, respond to student needs more directly, and invest in opportunities that strengthen completion, mobility, and community connection.",
      "For donors, that creates a compelling proposition: a gift to the Foundation can support practical outcomes with visible local relevance. It can help students persist, complete, and transition into stronger economic opportunity while supporting the broader health of the region.",
    ],
  },
  {
    slug: "student-support-that-changes-the-trajectory",
    title: "Student Support That Changes the Trajectory",
    category: "Student Stories",
    excerpt:
      "The strongest student-support stories are rarely abstract. They show what happens when timely help meets persistence, talent, and clear opportunity.",
    author: "Coastline College Foundation",
    publishedAt: "2026-03-12",
    readTime: "3 min read",
    featuredImage: "/Tom and Student.jpg",
    featuredAlt: "Foundation supporter with Coastline student",
    featured: false,
    ctaLabel: "Explore Programs",
    ctaHref: "/programs",
    body: [
      "Student success is often determined by whether support arrives at the right moment. A scholarship, a program enhancement, or a targeted intervention can mean the difference between delay and completion.",
      "That is why the Foundation's work is designed to be practical. We look for ways to reduce friction for students while helping Coastline strengthen the environments in which they learn and progress.",
      "The result is not just a story about assistance. It is a story about momentum: helping students keep moving toward credentials, confidence, and long-term opportunity.",
    ],
  },
  {
    slug: "how-scholarship-support-expands-access",
    title: "How Scholarship Support Expands Access",
    category: "Scholarships",
    excerpt:
      "Scholarships do more than lower cost. They improve stability, confidence, and the ability to stay focused on completion.",
    author: "Coastline College Foundation",
    publishedAt: "2026-03-10",
    readTime: "3 min read",
    featuredImage: "/Scholarship Recipients .jpg",
    featuredAlt: "Coastline scholarship recipients",
    featured: false,
    ctaLabel: "Get Involved",
    ctaHref: "/get-involved",
    body: [
      "For many students, financial pressure is not a side issue. It is the operating environment. Scholarships can create breathing room that translates directly into persistence and performance.",
      "At Coastline, scholarship support helps reduce immediate barriers while reinforcing a larger message: student ambition is worth backing with real resources.",
      "That combination — practical support and institutional belief — is one of the clearest ways philanthropy can expand access and strengthen outcomes.",
    ],
  },
];

export const featuredPost = newsPosts.find((post) => post.featured) ?? newsPosts[0];
