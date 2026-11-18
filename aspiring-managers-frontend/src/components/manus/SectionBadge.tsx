import type { PropsWithChildren } from "react";

export function SectionBadge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-full border border-[#f0cfb3] bg-[#fff1e6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#c85a12]">
      {children}
    </span>
  );
}
