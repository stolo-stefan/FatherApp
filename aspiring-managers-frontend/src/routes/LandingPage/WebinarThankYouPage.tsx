// src/routes/NormalUser/Enrollment/WebinarThankYouPage.tsx
import { useEffect, useState } from "react"
import { readLatestCourse, type ReadCourseDto } from "@/services/course"
import { Button } from "@/components/ui/button"

// CHANGE the path/name to your actual QR image file
import WebinarWhatsappQr from "@/assets/QRWhatsappCode.jpg"


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

          <ul className="space-y-2 text-[var(--am-text-dark)] mb-6">
            <li>• Verifică-ți inboxul (și folderul Spam/Promoții).</li>
            <li>• Adaugă evenimentul în calendar – să nu uiți!</li>
          </ul>

          {/* QR + BUTTON WHATSAPP GROUP */}
          <div className="mt-6 flex flex-col items-center text-center gap-4">

  <img
    src={WebinarWhatsappQr}
    alt="Cod QR grup WhatsApp"
    className="w-40 h-40 rounded-md border border-[var(--am-border-gray)]"
  />

  <p className="text-sm md:text-base text-[var(--am-text-dark)] max-w-md">
    Scanează codul sau folosește butonul de mai jos ca să intri în grupul de WhatsApp
    al participanților la webinar.
  </p>

  <a
    href="https://chat.whatsapp.com/Ilv37mExphsB4WbYMITjUR"
    target="_blank"
    rel="noreferrer"
  >
    <Button
      className="bg-[var(--am-accent-green)] hover:bg-[var(--am-primary-teal)] text-[var(--am-white)] px-6 py-5 text-base font-semibold rounded-xl"
    >
      Intră în grupul de WhatsApp
    </Button>
  </a>

</div>
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
