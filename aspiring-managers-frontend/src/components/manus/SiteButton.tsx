import { type CtaLink } from "@/components/content/siteContent";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SiteLink } from "./SiteLink";

export function SiteButton({ item, className, fullWidth = false }: { item: CtaLink; className?: string; fullWidth?: boolean }) {
  const baseClass = cn(
    "min-h-12 rounded-full px-6 text-sm font-semibold tracking-[0.02em] shadow-[0_16px_40px_-24px_rgba(20,33,60,0.55)] transition-all duration-200 hover:-translate-y-0.5",
    fullWidth && "w-full justify-between",
    item.variant === "secondary"
      ? "border border-white/30 bg-white/8 text-white hover:bg-white/14"
      : item.variant === "ghost"
        ? "border border-[#d8dee9] bg-white text-[#14213c] hover:border-[#14213c] hover:bg-[#f4f6fa]"
        : "bg-[#e8711a] text-white hover:bg-[#d86a17]"
  );

  return (
    <SiteLink href={item.href} className={cn("inline-flex items-center gap-2", baseClass, className)}>
      <span>{item.label}</span>
      <ArrowRight className="size-4" />
    </SiteLink>
  );
}
