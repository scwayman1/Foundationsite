export type ContactInquiry = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export async function submitContactInquiry(
  inquiry: ContactInquiry,
  onSuccess: () => void,
  send: typeof fetch = fetch,
): Promise<string> {
  const response = await send("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry),
  });
  const data = await response.json();
  if (!response.ok || data.success !== true) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  // Measurement is optional and must never turn a delivered inquiry into a form error.
  try { onSuccess(); } catch { /* The inquiry was still accepted by the mail transport. */ }
  return data.message || "Your message has been sent successfully!";
}
