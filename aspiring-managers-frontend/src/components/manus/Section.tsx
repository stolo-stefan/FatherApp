import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function Section({
  id,
  className,
  tone = "light",
  children,
}: PropsWithChildren<{ id?: string; className?: string; tone?: "light" | "muted" | "navy" | "amber" }>) {
  const toneClass =
    tone === "navy"
      ? "bg-[#14213c] text-white"
      : tone === "muted"
        ? "bg-[#f2f4f7] text-[#14213c]"
        : tone === "amber"
          ? "bg-[#e8711a] text-white"
          : "bg-[#fffaf4] text-[#14213c]";

  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", toneClass, className)}>
      <div className="container">{children}</div>
    </section>
  );
}
