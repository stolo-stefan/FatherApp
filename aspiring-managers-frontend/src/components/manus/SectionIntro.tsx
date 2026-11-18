import { cn } from "@/lib/utils";

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e8711a]">{eyebrow}</p> : null}
      <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] sm:text-[2.6rem]">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-current/78 sm:text-lg">{description}</p> : null}
    </div>
  );
}
