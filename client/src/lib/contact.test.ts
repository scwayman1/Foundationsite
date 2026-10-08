import { describe, expect, it, vi } from "vitest";
import { submitContactInquiry } from "./contact";

const inquiry = { firstName: "Test", lastName: "Person", email: "test@example.org", message: "Sponsorship question" };

describe("contact inquiry conversion gate", () => {
  it("tracks exactly after a successful API response", async () => {
    const track = vi.fn();
    const send = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, message: "Sent" }) });
    await expect(submitContactInquiry(inquiry, track, send)).resolves.toBe("Sent");
    expect(track).toHaveBeenCalledOnce();
    expect(send.mock.calls[0][0]).toBe("/api/contact");
  });

  it.each([
    { ok: false, success: false },
    { ok: true, success: false },
    { ok: false, success: true },
  ])("does not track an unconfirmed delivery: %j", async (result) => {
    const track = vi.fn();
    const send = vi.fn().mockResolvedValue({ ok: result.ok, json: async () => ({ success: result.success, error: "Unavailable" }) });
    await expect(submitContactInquiry(inquiry, track, send)).rejects.toThrow("Unavailable");
    expect(track).not.toHaveBeenCalled();
  });

  it("does not track a network failure", async () => {
    const track = vi.fn();
    const send = vi.fn().mockRejectedValue(new Error("Network error"));
    await expect(submitContactInquiry(inquiry, track, send)).rejects.toThrow("Network error");
    expect(track).not.toHaveBeenCalled();
  });

  it("keeps a successful inquiry successful if optional measurement fails", async () => {
    const send = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, message: "Sent" }) });
    await expect(submitContactInquiry(inquiry, () => { throw new Error("Tracking unavailable"); }, send)).resolves.toBe("Sent");
  });
});
