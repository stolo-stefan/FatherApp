import { brandAssets, type CtaLink } from "@/components/content/siteContent";
import type { ReactNode } from "react";
import { SiteButton } from "./SiteButton";

export function HeroFrame({
  eyebrow,
  title,
  description,
  ctas,
  note,
  stats,
  imageSlot,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  ctas?: CtaLink[];
  note?: string;
  stats?: Array<{ value: string; label: string }>;
  imageSlot?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#14213c] text-white">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(20,33,60,0.25), rgba(20,33,60,0.85)), url(${brandAssets.heroBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(232,113,26,0.18),transparent_24%)]" />
      <div className="container relative grid gap-10 py-16 sm:py-20 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5b37e]">{eyebrow}</p> : null}
          <h1 className="mt-4 max-w-3xl font-serif text-[2.2rem] leading-[0.96] sm:text-[3rem] lg:text-[4.8rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{description}</p>
          {ctas?.length ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {ctas.map((cta) => (
                <div key={cta.label} className="w-full sm:w-auto">
                  <SiteButton item={cta} fullWidth className="sm:w-auto sm:justify-center" />
                  {cta.note ? <p className="mt-2 px-1 text-center text-xs text-white/72 sm:text-left">{cta.note}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
          {note ? <p className="mt-3 text-xs text-white/72">{note}</p> : null}
          {stats?.length ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-white/12 bg-white/8 px-5 py-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative order-last lg:order-none">{imageSlot}</div>
      </div>
    </section>
  );
}
