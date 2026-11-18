import { type Testimonial } from "@/components/content/siteContent";
import { Quote } from "lucide-react";

export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.author + item.role} className="rounded-[28px] border border-[#d8dee9] bg-white p-6 shadow-[0_30px_70px_-50px_rgba(20,33,60,0.35)] sm:p-7">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1e6] text-[#e8711a]">
            <Quote className="size-5" />
          </div>
          <p className="text-sm leading-7 text-[#33445c] sm:text-base">{item.quote}</p>
          <div className="mt-6 border-t border-[#eef2f7] pt-4">
            <p className="font-semibold text-[#14213c]">{item.author}</p>
            <p className="mt-1 text-sm leading-6 text-[#66768d]">{item.role}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
