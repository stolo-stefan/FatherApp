import { Check } from "lucide-react";

export function BulletBeliefs({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="rounded-[24px] border border-white/14 bg-white/7 p-5 text-white shadow-[0_24px_50px_-36px_rgba(0,0,0,0.45)]">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8711a] text-white">
              <Check className="size-4" />
            </span>
            <p className="text-sm leading-7 text-white/82">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
