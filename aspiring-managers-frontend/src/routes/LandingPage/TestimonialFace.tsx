// src/features/webinar/TestimonialFace.tsx

interface TestimonialFaceProps {
  name: string
  role: string
  imgSrc: string
}

export default function TestimonialFace({ name, role, imgSrc }: TestimonialFaceProps) {
  return (
    <article
      className="
        w-80 md:w-[420px]
        bg-[var(--am-bg-light)]
        border border-[var(--am-border-gray)]
        rounded-2xl shadow-sm
        flex flex-col items-center
        p-4
      "
    >
      {/* FIXED IMAGE AREA – SAME HEIGHT FOR ALL */}
      <div
        className="
          w-full
          h-60 md:h-72        /* <<< SAME HEIGHT ON ALL CARDS */
          bg-white
          border border-[var(--am-border-gray)]
          rounded-xl
          flex items-center justify-center
          overflow-hidden
        "
      >
        <img
          src={imgSrc}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <h3 className="mt-4 text-lg md:text-xl font-semibold text-[var(--am-text-dark)]">
        {name}
      </h3>

      <p className="text-sm md:text-base text-[var(--am-text-muted)]">
        {role}
      </p>
    </article>
  )
}
