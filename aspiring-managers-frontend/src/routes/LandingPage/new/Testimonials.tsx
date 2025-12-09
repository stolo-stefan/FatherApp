// src/features/webinar/WebinarTestimonialsCarouselSection.tsx
import { useEffect, useRef } from "react"

type Testimonial = {
  text: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    text: "„Cu Florin am învățat ceva ce nu îți spune nimeni la promovare: cum să gestionezi oamenii dificili fără să intri în conflict. M-a ghidat cu exemple reale și soluții simple. Datorită lui, primele luni ca manager au fost o lecție de creștere, nu un haos.”",
    author: "Darius Drăghiceanu",
    role: "Regional Sales Manager",
  },
  {
    text: "„Credeam că trebuie să știu totul ca să fiu un lider bun. Florin Stoleriu mi-a schimbat complet perspectiva. M-a ajutat să-mi găsesc stilul de conducere, să dau feedback fără teamă și să câștig respectul echipei. A contat enorm.”",
    author: "Irinel Ilie",
    role: "Regional Sales Manager",
  },
  {
    text: "„Lucrul cu Florin mi-a accelerat evoluția ca manager. De la delegare, la structură și la gestionarea momentelor tensionate, totul a devenit mai clar. M-a ajutat să trec pragul acesta cu calm, nu cu panică.”",
    author: "Valentin Sasu",
    role: "Sales Manager",
  },
  {
    text: "„Cea mai mare schimbare pentru mine? Încrederea. Florin m-a ghidat pas cu pas și m-a ajutat să-mi găsesc vocea ca lider. Fără el, primele luni ar fi fost un labirint.”",
    author: "Ailenei Ionuț",
    role: "Sales Manager",
  },
]

// 3x list to fake infinite loop
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials]


export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  // for inertia
  const lastX = useRef(0)
  const lastTime = useRef(0)
  const velocity = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const third = track.scrollWidth / 3
    track.scrollLeft = third
  }, [])

  // keep scroll inside middle third (circular effect)
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth
    const third = totalWidth / 3

    if (track.scrollLeft < third * 0.3) {
      track.scrollLeft += third
    } else if (track.scrollLeft > third * 1.7) {
      track.scrollLeft -= third
    }
  }

  const stopInertia = () => {
    if (rafId.current != null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }

  const startInertia = () => {
    const track = trackRef.current
    if (!track) return

    const friction = 0.95 // 0–1, closer to 1 = longer glide
    const minVelocity = 0.1

    const step = () => {
      velocity.current *= friction
      if (Math.abs(velocity.current) < minVelocity) {
        stopInertia()
        return
      }

      track.scrollLeft -= velocity.current // minus because dx>0 means move left
      handleScroll()
      rafId.current = requestAnimationFrame(step)
    }

    stopInertia()
    rafId.current = requestAnimationFrame(step)
  }

  // ---- mouse drag ----
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    isDragging.current = true
    startX.current = e.clientX
    scrollStart.current = track.scrollLeft
    lastX.current = e.clientX
    lastTime.current = performance.now()
    stopInertia()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const track = trackRef.current

    const dx = e.clientX - startX.current
    track.scrollLeft = scrollStart.current - dx
    handleScroll()

    // calc velocity
    const now = performance.now()
    const dt = now - lastTime.current || 16
    const delta = e.clientX - lastX.current
    velocity.current = delta / dt * 10 // factor to tune strength
    lastX.current = e.clientX
    lastTime.current = now
  }

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return
    isDragging.current = false
    startInertia()
  }

  // ---- touch drag ----
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    isDragging.current = true
    const x = e.touches[0].clientX
    startX.current = x
    scrollStart.current = track.scrollLeft
    lastX.current = x
    lastTime.current = performance.now()
    stopInertia()
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return
    const track = trackRef.current
    const x = e.touches[0].clientX

    const dx = x - startX.current
    track.scrollLeft = scrollStart.current - dx
    handleScroll()

    const now = performance.now()
    const dt = now - lastTime.current || 16
    const delta = x - lastX.current
    velocity.current = delta / dt * 10
    lastX.current = x
    lastTime.current = now
  }

  const handleTouchEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    startInertia()
  }

  // arrows: smooth scroll by ~one card
  const scrollByCards = (direction: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    stopInertia()

    const card = track.querySelector<HTMLDivElement>('[data-card="testimonial"]')
    const cardWidth = card?.offsetWidth ?? 320
    const gap = 24
    const delta = (cardWidth + gap) * (direction === "right" ? 1 : -1)

    track.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <section className="mt-12 md:mt-16">
      <div className="border-t border-[var(--am-border-gray)] pt-8 pb-10" />
      <h2 className="text-center text-2xl md:text-3xl font-bold text-[var(--am-text-dark)] mb-6">
        Testimoniale
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="
            flex gap-4 md:gap-6
            overflow-x-auto no-scrollbar
            cursor-grab active:cursor-grabbing
            select-none
            pb-2
          "
        >
          {extendedTestimonials.map((t, idx) => (
            <div
              key={`${t.author}-${idx}`}
              data-card="testimonial"
              className="
                bg-white border border-[var(--am-border-gray)] rounded-xl shadow-sm
                flex flex-col justify-between
                shrink-0
                w-[300px] h-[380px]
                md:w-[340px] md:h-[400px]
                px-5 py-5
              "
            >
              <p className="text-[var(--am-text-dark)] text-sm md:text-base leading-relaxed">
                {t.text}
              </p>
              <div className="mt-4">
                <p className="font-semibold text-[var(--am-text-dark)] text-sm md:text-base">
                  {t.author}
                </p>
                <p className="text-[var(--am-text-muted)] text-xs md:text-sm">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* arrows outside the track */}
        <button
          type="button"
          onClick={() => scrollByCards("left")}
          className="
            hidden md:flex items-center justify-center
            absolute -left-6 top-1/2 -translate-y-1/2
            w-9 h-9 rounded-full bg-white/90 border border-[var(--am-border-gray)]
            shadow-sm hover:bg-[var(--am-bg-light)]
          "
          aria-label="Testimonial anterior"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={() => scrollByCards("right")}
          className="
            hidden md:flex items-center justify-center
            absolute -right-6 top-1/2 -translate-y-1/2
            w-9 h-9 rounded-full bg-white/90 border border-[var(--am-border-gray)]
            shadow-sm hover:bg-[var(--am-bg-light)]
          "
          aria-label="Testimonial următor"
        >
          ›
        </button>
      </div>
      
    </section>
  )
}
