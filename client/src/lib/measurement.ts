const consentKey = "foundation_measurement_consent_v1";
const clickKey = "foundation_ads_click_v1";
const sentPrefix = "foundation_contact_conversion_sent_v1:";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// These are public identifiers verified in the Foundation Google Ads account.
// Keep a source default because an existing Render service may not import newly
// added render.yaml build variables until its Blueprint is synchronized.
const adsId = import.meta.env.VITE_GOOGLE_ADS_ID?.trim() || "AW-18114155352";
const contactSendTo = import.meta.env.VITE_GOOGLE_ADS_CONTACT_SEND_TO?.trim() ||
  "AW-18114155352/iZSwCIOIlZUdENimwL1D";
export const measurementConfigured = Boolean(adsId && contactSendTo && /^AW-\d+$/.test(adsId) && contactSendTo.startsWith(`${adsId}/`));

export function measurementChoice(): "allowed" | "declined" | null {
  const stored = localStorage.getItem(consentKey);
  return stored === "allowed" || stored === "declined" ? stored : null;
}

export function setMeasurementChoice(choice: "allowed" | "declined") {
  localStorage.setItem(consentKey, choice);
  if (choice === "allowed") loadMeasurement();
}

export function loadMeasurement() {
  if (measurementChoice() !== "allowed" || !measurementConfigured) return;
  const click = new URLSearchParams(location.search);
  const adClick = click.get("gclid") || click.get("gbraid") || click.get("wbraid");
  if (adClick) sessionStorage.setItem(clickKey, adClick);
  const analyticsWindow = window as AnalyticsWindow;
  if (analyticsWindow.gtag) return;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = (...args: unknown[]) => analyticsWindow.dataLayer!.push(args);
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", adsId);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`;
  document.head.appendChild(script);
}

/** Only a successful delivered inquiry can trigger this; no form values are passed. */
export function trackSuccessfulContact() {
  if (measurementChoice() !== "allowed" || !measurementConfigured) return;
  const interaction = sessionStorage.getItem(clickKey) || "session";
  const key = `${sentPrefix}${interaction}`;
  if (sessionStorage.getItem(key)) return;
  loadMeasurement();
  const gtag = (window as AnalyticsWindow).gtag;
  if (!gtag) return;
  gtag("event", "conversion", { send_to: contactSendTo });
  sessionStorage.setItem(key, "1");
}
