import { Quote } from "lucide-react";

export function QuoteBlock({ quote }: { quote: string }) {
  return (
    <blockquote className="rounded-[28px] border border-[#f0cfb3] bg-[#fff1e6] p-6 text-lg leading-8 text-[#14213c] shadow-[0_24px_60px_-46px_rgba(232,113,26,0.65)] sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8711a] text-white">
          <Quote className="size-5" />
        </div>
        <p className="font-serif italic">{quote}</p>
      </div>
    </blockquote>
  );
}
