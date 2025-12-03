// src/features/webinar/WebinarTextTestimonials.tsx

interface TestimonialTextCardProps {
  text: string;
  name: string;
  role: string;
}

export default function TestimonialTextCard({ text, name, role }: TestimonialTextCardProps) {
  return (
    <article
      className="
        w-full
        min-h-[360px]          
        bg-[var(--am-bg-light)]
        border border-[var(--am-border-gray)]
        rounded-2xl shadow-sm
        p-6
        flex flex-col
        items-center
        justify-between
        text-center
      "
    >
      <p className="text-base md:text-lg text-[var(--am-text-dark)] leading-relaxed">
        {text}
      </p>

      <div className="mt-6">
        <h3 className="text-lg md:text-xl font-semibold text-[var(--am-text-dark)]">
          {name}
        </h3>

        <p className="text-sm md:text-base text-[var(--am-text-muted)]">
          {role}
        </p>
      </div>
    </article>
  );
}

