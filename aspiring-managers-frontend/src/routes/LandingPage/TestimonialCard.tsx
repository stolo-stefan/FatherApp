// src/features/webinar/TestimonialCard.tsx

interface TestimonialCardProps {
  text: string
  name: string
  role: string
  imgSrc: string
}

export default function TestimonialCard({
  text,
  name,
  role,
  imgSrc,
}: TestimonialCardProps) {
  return (
    <article className="h-full rounded-xl border border-dashed border-[var(--am-border-gray)] bg-[var(--am-bg-light)] p-4 flex flex-col">
      {/* Header cu avatar + nume */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={imgSrc}
          alt={`${name}, ${role}`}
          className="h-12 w-12 rounded-full object-cover border border-[var(--am-border-gray)]"
        />
        <div>
          <p className="font-semibold text-sm md:text-base text-[var(--am-text-dark)]">
            {name}
          </p>
          <p className="text-xs md:text-sm text-[var(--am-text-muted)]">
            {role}
          </p>
        </div>
      </div>

      {/* Text testimonial */}
      <p className="text-sm md:text-base leading-relaxed text-[var(--am-text-dark)] flex-1">
        {text}
      </p>
    </article>
  )
}
