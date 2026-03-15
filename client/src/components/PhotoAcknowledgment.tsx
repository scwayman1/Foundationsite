import { cn } from "@/lib/utils";

export default function PhotoAcknowledgment({
  caption,
  className,
}: {
  caption?: string;
  className?: string;
}) {
  if (!caption) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/15 bg-[#06263a]/58 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-white/92 backdrop-blur-md",
        className,
      )}
    >
      {caption}
    </div>
  );
}
