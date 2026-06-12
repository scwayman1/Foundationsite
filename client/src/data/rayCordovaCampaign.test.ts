import { describe, expect, it } from "vitest";
import {
  buildRayCordovaDonationUrl,
  getRayCordovaVariant,
  rayCordovaAliases,
  rayCordovaCampaign,
  rayCordovaVariants,
} from "./rayCordovaCampaign";

const expectedAliases = [
  "union-leadership-touch-1",
  "union-leadership-touch-2",
  "union-leadership-touch-3",
  "union-members-touch-1",
  "union-members-touch-2",
  "union-members-touch-3",
  "veterans-touch-1",
  "veterans-touch-2",
  "veterans-touch-3",
  "family-touch-1",
  "family-touch-2",
  "family-touch-3",
  "community-invitation",
];

describe("Ray Cordova campaign config", () => {
  it("has the required campaign totals", () => {
    expect(rayCordovaCampaign.goal).toBe(30000);
    expect(rayCordovaCampaign.seedFunding).toBe(2600);
    expect(rayCordovaCampaign.remaining).toBe(27400);
  });

  it("resolves all primary audience routes", () => {
    for (const slug of ["general", "union-leadership", "union-members", "veterans", "family", "community"]) {
      expect(getRayCordovaVariant(slug).slug).toBe(slug);
      expect(rayCordovaVariants[slug]).toBeDefined();
    }
  });

  it("resolves all letter aliases to configured audience variants", () => {
    expect(Object.keys(rayCordovaAliases).sort()).toEqual([...expectedAliases].sort());

    for (const alias of expectedAliases) {
      const variant = getRayCordovaVariant(alias);
      expect(variant).toBe(rayCordovaVariants[rayCordovaAliases[alias]]);
    }
  });

  it("adds tracking parameters to donation links", () => {
    const url = new URL(buildRayCordovaDonationUrl(getRayCordovaVariant("veterans-touch-2"), "veterans-touch-2"));

    expect(url.searchParams.get("utm_source")).toBe("direct_mail");
    expect(url.searchParams.get("utm_medium")).toBe("letter");
    expect(url.searchParams.get("utm_campaign")).toBe("ray_cordova_legacy");
    expect(url.searchParams.get("utm_content")).toBe("veterans-touch-2");
  });
});
