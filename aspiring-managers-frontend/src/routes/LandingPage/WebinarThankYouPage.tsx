// src/routes/NormalUser/Enrollment/WebinarThankYouPage.tsx
import { useEffect, useState } from "react"
import {
  readLatestThankYouCourse,
  type ReadCourseWhatsappDto,
} from "@/services/course"
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code"

function formatDateRo(dateIso?: string | null) {
  if (!dateIso) return null
  const d = new Date(dateIso)

  const zile = [
    "duminică",
    "luni",
    "marți",
    "miercuri",
    "joi",
    "vineri",
    "sâmbătă",
  ]
  const luni = [
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie",
  ]

  const ziSapt = zile[d.getDay()]
  const zi = d.getDate()
  const luna = luni[d.getMonth()]
  const ora = d.getHours().toString().padStart(2, "0")
  const min = d.getMinutes().toString().padStart(2, "0")

  return `${ziSapt[0].toUpperCase()}${ziSapt.slice(
    1,
  )}, ${zi} ${luna}, la ora ${ora}:${min}`
}

export default function WebinarThankYouPage() {
  const [course, setCourse] = useState<ReadCourseWhatsappDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const dto = await readLatestThankYouCourse()
        setCourse(dto ?? null)
      } catch {
        setError("Nu am putut încărca detaliile webinarului.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const formatted = course
    ? formatDateRo((course.startDate ?? undefined) as unknown as string)
    : null

  console.log("Whatsapp link value:", course?.whatsappLink)
  console.log("Type:", typeof course?.whatsappLink)

  return (
    // BG PE TOATĂ PAGINA + CARD CENTRAT
    <div className="min-h-screen w-full bg-[var(--am-bg-light)] flex items-center justify-center px-4 py-12">
      {/* CARD UNIC, CENTRAT */}
      <section
        className="
          w-full max-w-4xl
          bg-[var(--am-white)]
          border border-[var(--am-border-gray)]
          rounded-2xl shadow-sm
          p-8 md:p-10
          text-left
        "
      >
        {/* Intro + titlu webinar */}
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--am-text-muted)] mb-2">
          Îți mulțumesc pentru că te-ai înscris la webinarul
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--am-text-dark)] leading-snug mb-6">
          {course?.title}
        </h1>

        {/* Bloc text „Fă și ultimul pas” + QR în dreapta */}
        <div className="mt-4 flex flex-col gap-6">
          {/* TEXT ÎN STÂNGA + QR ÎN DREAPTA (PE DESKTOP) */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* TEXT ÎN STÂNGA */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-[var(--am-text-dark)] mb-3">
                Fă și ultimul pas: Intră în grupul de WhatsApp, unde vei primi:
              </h2>

              <ul className="list-disc pl-5 space-y-1 text-[var(--am-text-dark)] text-sm md:text-base">
                <li>Linkul Zoom către webinar</li>
                <li>Notificări și remindere ca să nu uiți de eveniment</li>
                <li>Informații utile despre bonusurile tale</li>
                <li>Tips &amp; tricks pentru managerii debutanți</li>
              </ul>
            </div>

            {/* QR ÎN DREAPTA TEXTULUI */}
            <div className="w-full md:w-auto flex justify-center md:justify-end">
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold text-[var(--am-text-dark)] mb-2">
                  Cod QR WhatsApp
                </span>

                {course?.whatsappLink ? (
                  <div className="w-40 h-40 rounded-md border border-[var(--am-border-gray)] p-2 bg-white flex items-center justify-center">
                    <QRCode
                      value={course.whatsappLink}
                      size={150}
                      bgColor="transparent"
                      fgColor="#2B6A70"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-md border border-[var(--am-border-gray)] bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500 text-center px-2">
                      Nu există încă un link WhatsApp
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BUTON WHATSAPP – SUB TEXT, CENTRAT */}
          {course?.whatsappLink ? (
            <div className="flex justify-center">
              <Button
                asChild
                className="bg-[var(--am-accent-green)] hover:bg-[var(--am-primary-teal)] text-[var(--am-white)] px-6 py-5 text-base font-semibold rounded-xl"
              >
                <a
                  href={course.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Intră în grupul de WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <p>Te-ai inscris asa devreme, incat nici nu exista grup de whatsapp! :)</p>
          )}
        </div>

        {/* Ce vei descoperi în webinar? */}
        <div className="mt-10 border-t border-[var(--am-border-gray)] pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* LISTA ÎN STÂNGA */}
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--am-text-dark)] mb-4">
                Ce vei descoperi în webinar?
              </h2>

              <ul className="space-y-2 text-[var(--am-text-dark)] text-sm md:text-base">
                <li>✔️ Cum să transformi nesiguranța de început în curaj</li>
                <li>✔️ Cum să gestionezi presiunea primelor zile ca manager</li>
                <li>
                  ✔️ Care sunt și cum să eviți greșelile pe care le fac
                  majoritatea managerilor la început
                </li>
                <li>✔️ Ce așteaptă organizația de la tine</li>
                <li>✔️ Cum să dai feedback constructiv</li>
              </ul>
            </div>

            {/* AICI poți adăuga o poză în dreapta, dacă vrei ulterior */}
            {/* <div className="flex justify-center md:justify-end w-full md:w-1/3">
              <img
                src={ThankYouImg}
                alt="Mulțumim"
                className="max-w-[220px] md:max-w-[280px] h-auto object-contain rounded-xl"
              />
            </div> */}
          </div>
        </div>

        {/* LINIE CU DATA WEBINARULUI LA FINALUL CARDULUI */}
        <div className="mt-8">
          <p className="text-base md:text-lg text-[var(--am-text-dark)]">
            {loading && "Încărcăm detaliile webinarului..."}
            {error && error}
            {!loading && !error && formatted && (
              <>
                Ne vedem <strong>{formatted}</strong>, live pe Zoom.
              </>
            )}
            {!loading && !error && !formatted && (
              <>Ne vedem în curând, live pe Zoom.</>
            )}
          </p>
        </div>
      </section>
    </div>
  )
}
