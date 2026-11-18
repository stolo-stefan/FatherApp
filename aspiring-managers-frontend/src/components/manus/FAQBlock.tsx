import { Accordion } from "./ui/Accordion";
import { AccordionContent } from "./ui/AccordionContent";
import { AccordionItem } from "./ui/AccordionItem";
import { AccordionTrigger } from "./ui/AccordionTrigger";
import { type FaqItem } from "@/components/content/siteContent";
import { cn } from "@/lib/utils";

export function FAQBlock({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  return (
    <Accordion type="single" collapsible defaultValue={items[0]?.question} className="rounded-[28px] border border-[#d8dee9] bg-white/95 px-5 py-3 shadow-[0_30px_60px_-48px_rgba(20,33,60,0.3)] sm:px-8">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className={cn(dark && "border-white/14") }>
          <AccordionTrigger className={cn("py-5 text-base font-semibold text-[#14213c] hover:no-underline sm:text-lg", dark && "text-[#14213c]")}>{item.question}</AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-[#5a6b84] sm:text-base">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
