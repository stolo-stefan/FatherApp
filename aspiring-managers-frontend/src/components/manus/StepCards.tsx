import { cn } from "@/lib/utils";

export function StepCards({ items, dark = false }: { items: Array<{ number: string; title: string; description: string }>; dark?: boolean; }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.number + item.title}
          className={cn(
            "rounded-[28px] border p-6 sm:p-7",
            dark ? "border-white/12 bg-white/6" : "border-[#d7dfe9] bg-white"
          )}
        >
          <p className="text-4xl font-serif text-[#e8711a] sm:text-5xl">{item.number}</p>
          <h3 className={cn("mt-4 text-xl font-semibold", dark ? "text-white" : "text-[#14213c]")}>{item.title}</h3>
          <p className={cn("mt-3 text-sm leading-7 sm:text-base", dark ? "text-white/72" : "text-[#52627a]")}>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
