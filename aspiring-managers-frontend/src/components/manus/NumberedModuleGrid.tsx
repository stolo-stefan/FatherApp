

export function NumberedModuleGrid({ items }: { items: Array<{ number: string; title: string; description: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.number + item.title} className="rounded-[28px] border border-[#d8dee9] bg-[#f3f5f8] p-6 shadow-[0_26px_60px_-54px_rgba(20,33,60,0.3)]">
          <p className="font-serif text-5xl text-[#e8711a]">{item.number}</p>
          <h3 className="mt-4 text-xl font-semibold text-[#14213c]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#52627a]">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
