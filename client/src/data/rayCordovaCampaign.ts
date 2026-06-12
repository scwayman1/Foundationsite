export type RayCordovaAudience =
  | "general"
  | "union-leadership"
  | "union-members"
  | "veterans"
  | "family"
  | "community";

export type RayCordovaCampaignVariant = {
  slug: string;
  audience: RayCordovaAudience;
  headline: string;
  intro: string;
  ctaLabel: string;
  ctaFraming: string;
  audienceTitle: string;
  audienceCopy: string;
  trackingContent: string;
};

export const rayCordovaCampaign = {
  name: "Ray Cordova Legacy Campaign",
  rayName: "Raymond L. Cordova",
  shortName: "Ray Cordova",
  knownAs: "The Godfather of Labor",
  goal: 30000,
  seedFunding: 2600,
  remaining: 27400,
  designation: "Please designate your gift to the Ray Cordova Legacy Fund.",
  donationBaseUrl: "https://26957.thankyou4caring.org/coastline-raymond-l-cordova-scholarship",
  contactEmail: "foundation@coastline.edu",
  contactPhone: "(714) 241-6154",
  contactAddress: "11460 Warner Avenue, Fountain Valley, CA 92708",
  heroImage: "/ray-cordova-jim-moreno.jpg",
  supportImage: "/ray-cordova-jim-moreno-embrace.jpg",
};

export const rayCordovaVariants: Record<string, RayCordovaCampaignVariant> = {
  general: {
    slug: "general",
    audience: "general",
    headline: "Honor Ray Cordova by naming a home for Coastline student veterans.",
    intro:
      "Raymond L. Cordova served his country, strengthened Orange County labor, and spent his life helping people move with dignity and opportunity.",
    ctaLabel: "Donate to the Legacy Fund",
    ctaFraming:
      "Your gift helps name the Veteran Resource Center at Coastline College after Ray and supports the Raymond L. Cordova Scholarship.",
    audienceTitle: "A shared campaign for service, labor, and student veterans",
    audienceCopy:
      "This campaign invites everyone touched by Ray's life and work to help create a permanent place of recognition and practical support for Coastline student veterans.",
    trackingContent: "general",
  },
  "union-leadership": {
    slug: "union-leadership",
    audience: "union-leadership",
    headline: "Help Labor Permanently Honor Ray Cordova",
    intro:
      "Ray helped build labor power across Orange County. This campaign asks union leadership to help carry that legacy into a permanent Coastline veteran student space.",
    ctaLabel: "Lead With a Gift",
    ctaFraming:
      "Leadership support can include an organizational gift, endorsement, permission to communicate with members, or introductions to allied partners.",
    audienceTitle: "A leadership invitation",
    audienceCopy:
      "Your endorsement gives this campaign institutional weight. Help us invite locals, councils, and labor partners to honor one of labor's most respected figures in a way that serves veterans for years.",
    trackingContent: "union_leadership",
  },
  "union-members": {
    slug: "union-members",
    audience: "union-members",
    headline: "One of Our Own Deserves to Be Remembered",
    intro:
      "Ray Cordova showed up for working people. A gift of any size helps working families show up together for his memory and for Coastline student veterans.",
    ctaLabel: "Give in Solidarity",
    ctaFraming:
      "Small gifts add up when we act together. Every contribution moves the campaign closer to permanent recognition for Ray.",
    audienceTitle: "A collective act of remembrance",
    audienceCopy:
      "This is a chance for members, retirees, and friends of labor to make a practical, visible statement: Ray mattered, and the values he fought for still guide us.",
    trackingContent: "union_members",
  },
  veterans: {
    slug: "veterans",
    audience: "veterans",
    headline: "We Don't Let Our Own Be Forgotten",
    intro:
      "Ray served as a Vietnam-era Army Airborne sergeant before dedicating decades to labor and civic life. His name belongs with students navigating the transition from service to college.",
    ctaLabel: "Support Student Veterans",
    ctaFraming:
      "Your gift strengthens a place where Coastline student veterans can find belonging, guidance, and support.",
    audienceTitle: "A permanent signal to veteran students",
    audienceCopy:
      "Naming the Veteran Resource Center for Ray connects military service, community leadership, and the next generation of veterans building their future at Coastline.",
    trackingContent: "veterans",
  },
  family: {
    slug: "family",
    audience: "family",
    headline: "Honoring Ray With Gratitude and Care",
    intro:
      "This campaign is meant to honor Ray's life with respect, warmth, and no pressure. Family memories, photos, and stories can help shape how his legacy is carried forward.",
    ctaLabel: "Honor Ray's Legacy",
    ctaFraming:
      "You can contribute, share a memory, offer a photo, or simply help us tell Ray's story with care.",
    audienceTitle: "A family-centered invitation",
    audienceCopy:
      "The goal is to make sure Ray is remembered accurately and lovingly. Family participation can help preserve the stories behind the public legacy.",
    trackingContent: "family",
  },
  community: {
    slug: "community",
    audience: "community",
    headline: "Join Us in Honoring Ray Cordova",
    intro:
      "Ray's life connected service, dignity, opportunity, veterans, working families, and Orange County civic leadership.",
    ctaLabel: "Make a Community Gift",
    ctaFraming:
      "Community support helps create a lasting tribute that serves Coastline student veterans and reflects the values Ray lived.",
    audienceTitle: "A community legacy for Orange County",
    audienceCopy:
      "This campaign gives neighbors, colleagues, and civic partners a simple way to honor a life of service while investing directly in students.",
    trackingContent: "community",
  },
};

export const rayCordovaAliases: Record<string, keyof typeof rayCordovaVariants> = {
  "union-leadership-touch-1": "union-leadership",
  "union-leadership-touch-2": "union-leadership",
  "union-leadership-touch-3": "union-leadership",
  "union-members-touch-1": "union-members",
  "union-members-touch-2": "union-members",
  "union-members-touch-3": "union-members",
  "veterans-touch-1": "veterans",
  "veterans-touch-2": "veterans",
  "veterans-touch-3": "veterans",
  "family-touch-1": "family",
  "family-touch-2": "family",
  "family-touch-3": "family",
  "community-invitation": "community",
};

export function getRayCordovaVariant(slug?: string) {
  if (!slug) return rayCordovaVariants.general;
  const normalized = slug.toLowerCase();
  const canonicalSlug = rayCordovaAliases[normalized] ?? normalized;
  return rayCordovaVariants[canonicalSlug] ?? rayCordovaVariants.general;
}

export function buildRayCordovaDonationUrl(variant: RayCordovaCampaignVariant, sourceSlug?: string) {
  const params = new URLSearchParams({
    utm_source: "direct_mail",
    utm_medium: "letter",
    utm_campaign: "ray_cordova_legacy",
    utm_content: sourceSlug || variant.trackingContent,
  });

  return `${rayCordovaCampaign.donationBaseUrl}?${params.toString()}`;
}
