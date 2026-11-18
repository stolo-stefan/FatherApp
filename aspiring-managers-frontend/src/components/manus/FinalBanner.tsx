import { type CtaLink } from "@/components/content/siteContent";
import { cn } from "@/lib/utils";
import { SiteButton } from "./SiteButton";

export function FinalBanner({ title, description, ctas, note, tone = "navy" }: { title: string; description: string; ctas: CtaLink[]; note?: string; tone?: "navy" | "amber"; }) {
  return (
    <div className={cn("overflow-hidden rounded-[36px] p-7 shadow-[0_40px_80px_-52px_rgba(20,33,60,0.7)] sm:p-10 lg:p-12", tone === "amber" ? "bg-[#e8711a] text-white" : "bg-[#14213c] text-white") }>
      <div className="max-w-3xl">
        <h2 className="font-serif text-[2rem] leading-[1.02] sm:text-[2.8rem]">{title}</h2>
        <p className="mt-5 text-base leading-8 text-white/78 sm:text-lg">{description}</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {ctas.map((cta) => (
          <SiteButton key={cta.label} item={cta} fullWidth className="sm:w-auto sm:justify-center" />
        ))}
      </div>
      {note ? <p className="mt-4 text-sm text-white/68">{note}</p> : null}
    </div>
  );
}
