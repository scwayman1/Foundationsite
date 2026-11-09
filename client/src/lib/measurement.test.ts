import { beforeEach, describe, expect, it, vi } from "vitest";

function storage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
}

describe("consent-gated contact measurement", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_GOOGLE_ADS_ID", "AW-18114155352");
    vi.stubEnv("VITE_GOOGLE_ADS_CONTACT_SEND_TO", "AW-18114155352/iZSwCIOIlZUdENimwL1D");
    vi.stubGlobal("localStorage", storage());
    vi.stubGlobal("sessionStorage", storage());
    vi.stubGlobal("location", { search: "?gclid=test-click" });
    vi.stubGlobal("document", { head: { appendChild: vi.fn() }, createElement: () => ({}) });
    vi.stubGlobal("window", { dataLayer: [] });
  });

  it("loads no tag and sends no conversion before consent", async () => {
    const measurement = await import("./measurement");
    measurement.loadMeasurement();
    measurement.trackSuccessfulContact();
    expect(document.head.appendChild).not.toHaveBeenCalled();
    expect((window as Window & { dataLayer: unknown[] }).dataLayer).toEqual([]);
  });

  it("sends one event per click, without inquiry details", async () => {
    const measurement = await import("./measurement");
    measurement.setMeasurementChoice("allowed");
    measurement.trackSuccessfulContact();
    measurement.trackSuccessfulContact();
    const events = (window as Window & { dataLayer: unknown[][] }).dataLayer.filter((entry) => entry[0] === "event");
    expect(events).toEqual([["event", "conversion", { send_to: "AW-18114155352/iZSwCIOIlZUdENimwL1D" }]]);
    expect(JSON.stringify(events)).not.toMatch(/test@example|message|firstName/);
  });
  it("does not record workshop clicks without consent", async () => {
    const measurement = await import("./measurement");
    measurement.trackWorkshopRegistrationClick("hero");
    expect(document.head.appendChild).not.toHaveBeenCalled();
    expect((window as Window & { dataLayer: unknown[] }).dataLayer).toEqual([]);
  });

  it("records a consented outbound click separately from a conversion", async () => {
    const measurement = await import("./measurement");
    measurement.setMeasurementChoice("allowed");
    measurement.trackWorkshopRegistrationClick("registration");
    const events = (window as Window & { dataLayer: unknown[][] }).dataLayer.filter((entry) => entry[0] === "event");
    expect(events).toEqual([["event", "workshop_registration_click", {
      send_to: "AW-18114155352", event_slug: "ai-agents-workshop",
      link_placement: "registration", destination: "gradroots",
    }], ["event", "conversion", {
      send_to: "AW-18114155352/EhWjCNb-orUdENimwL1D", value: 0, currency: "USD",
    }]]);
    measurement.trackWorkshopRegistrationClick("hero");
    const conversions = (window as Window & { dataLayer: unknown[][] }).dataLayer.filter((entry) => entry[1] === "conversion");
    expect(conversions).toHaveLength(1);
  });

});
