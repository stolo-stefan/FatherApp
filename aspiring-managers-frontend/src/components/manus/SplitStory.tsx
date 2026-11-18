import type { ReactNode } from "react";
import { QuoteBlock } from "./QuoteBlock";

export function SplitStory({ title, paragraphs, quote, media }: { title: string; paragraphs: string[]; quote?: string; media?: ReactNode; }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5">
        <h2 className="font-serif text-[2rem] leading-[1.05] sm:text-[2.6rem]">{title}</h2>
        {media}
      </div>
      <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        {quote ? <QuoteBlock quote={quote} /> : null}
      </div>
    </div>
  );
}
