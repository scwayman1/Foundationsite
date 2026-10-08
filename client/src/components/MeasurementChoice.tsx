import { useEffect, useState } from "react";
import { loadMeasurement, measurementChoice, measurementConfigured, setMeasurementChoice } from "@/lib/measurement";

export default function MeasurementChoice() {
  const [choice, setChoice] = useState<"allowed" | "declined" | null>(() => measurementChoice());

  useEffect(() => {
    if (choice === "allowed") loadMeasurement();
  }, [choice]);

  if (choice || !measurementConfigured) return null;
  return (
    <aside aria-label="Analytics choice" className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-2xl">
      <p>May we use optional measurement to understand visits and successful contact inquiries from our ads? The form works without it. See our <a className="underline" href="/privacy">Privacy Notice</a>.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-lg bg-[#08324a] px-4 py-2 font-semibold text-white" onClick={() => { setMeasurementChoice("allowed"); setChoice("allowed"); }}>Allow measurement</button>
        <button className="rounded-lg border border-slate-300 px-4 py-2 font-semibold" onClick={() => { setMeasurementChoice("declined"); setChoice("declined"); }}>Continue without measurement</button>
      </div>
    </aside>
  );
}
