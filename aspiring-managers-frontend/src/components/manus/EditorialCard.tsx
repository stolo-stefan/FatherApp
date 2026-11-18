import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { SiteLink } from "./SiteLink";

export function EditorialCard({ title, description, href, cta, accent = "orange" }: { title: string; description: string; href: string; cta: string; accent?: "orange" | "navy"; }) {
  return (
    <article className="group flex h-full flex-col rounded-[30px] border border-[#d7dfe9] bg-white p-6 shadow-[0_28px_70px_-48px_rgba(20,33,60,0.45)] transition-transform duration-200 hover:-translate-y-1 sm:p-8">
      <div className={cn("mb-6 h-1.5 w-20 rounded-full", accent === "orange" ? "bg-[#e8711a]" : "bg-[#14213c]")} />
      <h3 className="font-serif text-[1.55rem] leading-tight text-[#14213c]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#52627a] sm:text-base">{description}</p>
      <SiteLink href={href} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#14213c] transition-colors group-hover:text-[#e8711a]">
        {cta}
        <MoveUpRight className="size-4" />
      </SiteLink>
    </article>
  );
}
