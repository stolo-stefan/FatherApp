import NewButon from "@/components/home/NewButton"
import type { ReadCourseDto } from "@/services/course"

function formatDateRo(dateIso?: string | null) {
  if (!dateIso) return null
  const d = new Date(dateIso)

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

  const zi = d.getDate()
  const luna = luni[d.getMonth()]

  return `${zi} ${luna}`
}


interface WebinarHeroProps{
    course: ReadCourseDto | null
}

export default function AboutSupportSection({
  course
}: WebinarHeroProps) {
  return (
    <section className="mt-14 md:mt-20">
      {/* Top line */}
      <div className="border-t border-[var(--am-border-gray)] pt-8 pb-10">

        {/* CONTENT */}
        <div className="mx-auto max-w-3xl text-center space-y-4">

          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-[var(--am-text-dark)]">
            Ai toate șansele să reușești în rolul tău de manager,{" "}
            <span className="text-[#e47f3a]">
              dacă ai sprijinul și uneltele potrivite.
            </span>
          </h2>

          <p className="text-[var(--am-text-dark)]">
            {course !== null ? (
              <>
                Pe <span className="font-semibold">{formatDateRo(course?.startDate)}</span>
              </>
            ) : (
              "În curând"
            )}, în webinarul meu gratuit,{" "}
            <span className="font-semibold">
              îți arăt concret cum poți să-ți conduci echipa
            </span>{" "}
            cu mai multă încredere și calm,{" "}
            <span className="font-semibold">
              fără panică și fără stres inutil, folosind metode care funcționează
              în lumea reală
            </span>
            , nu doar în manuale.
          </p>

          <p className="text-[var(--am-text-dark)]">
            Locurile sunt limitate la{" "}
            <span className="font-semibold">20 de participanți</span>,
            ca să pot răspunde la situațiile reale ale fiecăruia.
          </p>

          {/* CTA BUTTON – centered */}
          <div className="pt-4 flex justify-center">
            <NewButon course={course} />
          </div>

        </div>

        
      </div>
    </section>
  )
}
