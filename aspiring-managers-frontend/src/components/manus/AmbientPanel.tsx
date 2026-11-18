import { brandAssets } from "@/components/content/siteContent";
import { cn } from "@/lib/utils";

export function AmbientPanel({
  imageUrl,
  label,
  title,
  description,
  dark = false,
  imageSize = "cover",
  imagePosition = "center",
  imageBackgroundClass,
}: {
  imageUrl: string;
  label: string;
  title: string;
  description: string;
  dark?: boolean;
  imageSize?: "cover" | "contain";
  imagePosition?: string;
  imageBackgroundClass?: string;
}) {
  console.log("Hero background:", brandAssets.heroBackground);
  return (
    <div className={cn("overflow-hidden rounded-[32px] border", dark ? "border-white/12 bg-white/8" : "border-[#d8dee9] bg-white") }>
      <div
        className={cn("aspect-[16/10] w-full bg-no-repeat", imageBackgroundClass)}
        style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: imagePosition, backgroundSize: imageSize }}
      />
      <div className="p-6 sm:p-7">
        <p className={cn("text-xs font-semibold uppercase tracking-[0.22em]", dark ? "text-[#f5b37e]" : "text-[#e8711a]")}>{label}</p>
        <h3 className={cn("mt-3 font-serif text-[1.7rem] leading-tight", dark ? "text-white" : "text-[#14213c]")}>{title}</h3>
        <p className={cn("mt-4 text-sm leading-7 sm:text-base", dark ? "text-white/76" : "text-[#5a6b84]")}>{description}</p>
      </div>
    </div>
  );
}
