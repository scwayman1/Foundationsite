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
  embedUrl?: string;
  body: string[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "what-smart-local-giving-looks-like-at-coastline",
    title: "What Smart Local Giving Looks Like at Coastline",
    category: "Giving Insights",
    excerpt:
      "The strongest philanthropic investments are not abstract. They reduce friction, expand opportunity, and help students keep moving toward degrees, certificates, and economic mobility.",
    author: "Coastline College Foundation",
    publishedAt: "2026-03-25",
    readTime: "4 min read",
    featuredImage: "/coastline-community.jpg",
    featuredAlt: "Coastline College community gathering and student success environment",
    featured: true,
    ctaLabel: "Support Student Opportunity",
    ctaHref: "/get-involved",
    body: [
      "The best giving is rarely about optics. It is about removing the obstacles that slow talented people down and making it easier for them to keep building momentum. At Coastline, that means seeing students clearly: many are balancing work, family responsibilities, financial pressure, and the ordinary uncertainty that comes with trying to improve your life while still living it.",
      "That is why practical support matters so much. A scholarship can close a gap that would otherwise force a student to reduce units, delay completion, or step away entirely. A program enhancement can help faculty deliver stronger learning experiences tied to the realities students will face after graduation. A targeted investment in student support can be the difference between a setback and a finish line.",
      "For donors, this creates a compelling opportunity. Community college philanthropy is not a vague act of goodwill. It can produce visible, local, and durable results. It helps students persist. It helps programs respond faster. It helps institutions serve their communities with greater precision and flexibility than public funding alone often allows.",
      "At Coastline, that is the lens we want to keep sharpening. Smart local giving should strengthen real outcomes: completion, transfer, workforce readiness, and long-term mobility. It should help students move from pressure to possibility. It should support the kind of institutional responsiveness that lets a college act not just as a place of instruction, but as a platform for upward movement.",
      "This is also why storytelling matters. Donors should be able to see the human stakes behind the work. They should understand not only that a gift matters, but how it matters — in classrooms, in student lives, in career pathways, and in the health of the broader community. The more clearly that connection is made, the more trust and momentum the Foundation can build over time.",
      "As Coastline expands its outreach, our goal is straightforward: show the work honestly, show the impact clearly, and make it easy for people who care about educational opportunity to participate in something concrete. The strongest advancement strategy is not built on pressure. It is built on clarity, credibility, and proof that local investment can change trajectories.",
    ],
  },
  {
    slug: "tawny-burgess-academic-success-video",
    title: "Coastline Alumni Tawny Burgess Reveals Her Secret to Academic Success",
    category: "Student Stories",
    excerpt:
      "This featured video spotlights Coastline alumna Tawny Burgess and the habits, support, and persistence that shaped her academic success story.",
    author: "Coastline College",
    publishedAt: "2026-03-23",
    readTime: "2 min watch",
    featuredImage: "https://i.ytimg.com/vi/NFYUkcPllog/maxresdefault.jpg",
    featuredAlt: "Video thumbnail for Coastline Alumni Tawny Burgess Reveals Her Secret to Academic Success",
    featured: false,
    ctaLabel: "Watch on YouTube",
    ctaHref: "https://youtu.be/NFYUkcPllog?si=GusoOaSBb_koEwUy",
    embedUrl: "https://www.youtube.com/embed/NFYUkcPllog",
    body: [
      "This video belongs on the Foundation's News & Impact surface because it does what strong advancement content should do: it makes student success visible, personal, and credible.",
      "Tawny Burgess’s story helps translate Coastline’s value into a human narrative. It gives prospective donors, partners, and community members a concrete example of how persistence, institutional support, and educational opportunity can change a student’s trajectory.",
      "Featuring the video here also strengthens the Foundation site as a publishing surface, not just a static brochure. It gives us a richer mix of formats — written stories, updates, and now video — that can support trust, engagement, and future giving intent.",
    ],
  },
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
    featured: false,
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
    slug: "howmet-aerospace-supports-coastline-college-with-200000-gift",
    title: "Howmet Aerospace Supports Coastline College with $200,000 Gift",
    category: "Foundation News",
    excerpt:
      "The Coastline College Foundation is grateful to recognize a generous $200,000 gift from Howmet Aerospace and the Howmet Aerospace Foundation in support of Coastline College students and programs.",
    author: "Coastline College Foundation",
    publishedAt: "2026-03-13",
    readTime: "3 min read",
    featuredImage: "/Scott at Scholarship family.jpg",
    featuredAlt: "Coastline College Foundation scholarship and donor recognition moment",
    featured: false,
    ctaLabel: "Get Involved",
    ctaHref: "/get-involved",
    body: [
      "The Coastline College Foundation is grateful to recognize a generous $200,000 gift from Howmet Aerospace and the Howmet Aerospace Foundation in support of Coastline College students and programs.",
      "This meaningful investment reflects the important role that education and workforce preparation play in strengthening both individual opportunity and the broader community. It also underscores the value of partnership between industry and public higher education.",
      "Howmet Aerospace is a global leader in engineered metal products, serving sectors including aerospace, transportation, energy, and defense. Through this gift, the company is helping support Coastline’s efforts to provide students with accessible, high-quality education that is aligned with evolving workforce needs.",
      "For Coastline students, support like this matters. Many are balancing work, family responsibilities, and financial pressure while pursuing degrees, certificates, and career pathways that can improve long-term economic mobility. Philanthropic investments help the college continue expanding opportunity, strengthening programs, and connecting students to real-world futures.",
      "This gift is especially meaningful because it reflects a shared understanding: community colleges are an important part of the talent pipeline for high-demand industries, and students benefit when education and industry remain closely connected.",
      "On behalf of the Coastline College Foundation, we extend our sincere appreciation to Howmet Aerospace and the Howmet Aerospace Foundation for their generosity and support. Their investment will help strengthen opportunities for students and reinforce Coastline’s mission of serving learners, employers, and the wider community.",
      "We are thankful for their partnership and proud to recognize their commitment to student success.",
    ],
  },
];

export const featuredPost = newsPosts.find((post) => post.featured) ?? newsPosts[0];
