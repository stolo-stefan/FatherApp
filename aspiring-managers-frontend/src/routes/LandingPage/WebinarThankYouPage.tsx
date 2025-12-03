// src/routes/NormalUser/Enrollment/WebinarThankYouPage.tsx
import { useEffect, useState } from "react"
import { readLatestCourse, type ReadCourseDto } from "@/services/course"
import { Navigate, useLocation } from "react-router-dom"
// import ThankYouImg from "@/assets/thankyou-webinar.png" // schimbă cu ce imagine vrei

type ThankYouLocationState = {
  courseId?: number
  enrollmentId?: number
}

function formatDateRo(dateIso?: string | null) {
  if (!dateIso) return null
  const d = new Date(dateIso)

  const zile = [
    "duminică","luni","marți","miercuri","joi","vineri","sâmbătă",
  ]
  const luni = [
    "ianuarie","februarie","martie","aprilie","mai","iunie",
    "iulie","august","septembrie","octombrie","noiembrie","decembrie",
  ]

  const ziSapt = zile[d.getDay()]
  const zi = d.getDate()
  const luna = luni[d.getMonth()]
  const ora = d.getHours().toString().padStart(2, "0")
  const min = d.getMinutes().toString().padStart(2, "0")

  return `${ziSapt[0].toUpperCase()}${ziSapt.slice(1)}, ${zi} ${luna}, la ora ${ora}:${min}`
}

export default function WebinarThankYouPage() {
  const location = useLocation()
  const state = (location.state ?? {}) as ThankYouLocationState

  // nu permitem acces direct
  if (!state.enrollmentId || !state.courseId) {
    return <Navigate to="/webinar" replace />
  }

  const [course, setCourse] = useState<ReadCourseDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const dto = await readLatestCourse()
        setCourse(dto ?? null)
      } catch {
        setError("Nu am putut încărca detaliile webinarului.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const formatted = course ? formatDateRo(course.startDate as unknown as string) : null

  return (
    // BG PE TOATĂ PAGINA
    <div className="min-h-screen w-full bg-[var(--am-bg-light)] flex justify-center">
      {/* conținut centrat pe orizontală */}
      <div className="w-full max-w-6xl px-4 py-12 flex flex-col md:flex-row items-center gap-10">
        
        {/* CARD TEXT ÎN STÂNGA */}
        <section
          className="
            w-full md:w-3/4
            bg-[var(--am-white)]
            border border-[var(--am-border-gray)]
            rounded-2xl shadow-sm
            p-8 md:p-10
            text-left
          "
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--am-text-dark)] mb-4">
            Înscriere confirmată!
          </h1>

          <p className="text-base md:text-lg text-[var(--am-text-muted)] mb-6">
            {loading && "Încărcăm detaliile webinarului..."}
            {error && error}
            {!loading && !error && formatted && (
              <>Ne vedem <strong>{formatted}</strong> – live, pe Zoom.</>
            )}
            {!loading && !error && !formatted && !course && (
              <>Ne vedem în curând la webinar – live, pe Zoom.</>
            )}
          </p>

          <p className="font-semibold text-lg text-[var(--am-text-dark)] mb-3">
            Până atunci:
          </p>

          <ul className="space-y-2 text-[var(--am-text-dark)] mb-4">
            <li>• Verifică-ți inboxul (și folderul Spam/Promoții).</li>
            <li>• Adaugă evenimentul în calendar – să nu uiți!</li>
          </ul>

          {/* <p className="text-base text-[var(--am-text-dark)] mb-4">
            <span className="font-semibold cursor-pointer">Google Calendar</span> |{" "}
            <span className="font-semibold cursor-pointer">Apple Calendar</span>
          </p>

          <p className="text-sm md:text-base text-[var(--am-text-muted)] leading-relaxed">
            Dacă îți dorești să nu ratezi acest webinar și să vezi exact ce ai de
            făcut ca să poți lansa cursul în 30 de zile, cel mai simplu este să
            adaugi evenimentul în calendar.
          </p> */}
        </section>

        {/* POZĂ ÎN DREAPTA, FĂRĂ CARD */}
        <div className="w-full md:w-1/4 flex justify-center md:justify-end">
          <img
            // src={ThankYouImg}
            alt="Mulțumim"
            className="max-w-[220px] md:max-w-[260px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}
