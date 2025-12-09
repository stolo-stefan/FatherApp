// src/features/webinar/WebinarHero.tsx
import type { ReadCourseDto } from "@/services/course"
import NewSignUpForm from "./NewSignUpForm"

interface WebinarHeroProps {
  course: ReadCourseDto | null
  targetDate: Date | null
  loading: boolean
  error: string | null
}

export default function NewWebinarHero({
  course,
  targetDate
}: WebinarHeroProps) {
  const courseId = course?.id ?? null

  return (
    <section
      id="hero"
      aria-label="Secțiune principală de înscriere la webinar"
      className="w-full"
    >
      {/* TRUE TWO-COLUMN LAYOUT */}
      <div className="grid gap-12 md:grid-cols-2 items-start">
        
        {/* LEFT: TITLE + BULLETS */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug text-[var(--am-text-dark)]">
            Te învăț cum să conduci echipa cu încredere fără să te simți
            copleșit, chiar dacă ești la început
          </h1>

          <ul className="list-none p-0 m-0 space-y-3 text-[var(--am-text-dark)]">
            <li>❌ Ești manager la început și <span className="font-semibold">simți presiune din toate direcțiile,</span> mai ales de la top management?</li>
            <li>✅ În acest webinar gratuit înveți <span className="font-semibold">cum să relaționezi cu top managementul</span> fără să simți presiunea apăsătoare.</li>
            <li>❌ Te surprinzi controlând tot, verificând tot și simțind că, <span className="font-semibold">dacă nu ești tu peste tot, lucrurile o iau razna?</span></li>
            <li>✅ <span className="font-semibold">Te ajut să eviți micro-managementul</span>, fără să pierzi controlul asupra echipei și rezultatelor.</li>
            <li>❌ <span className="font-semibold">Te temi de conflicte și de discuții tensionate,</span> mai ales când trebuie să dai feedback direct?</li>
            <li>✅ <span className="font-semibold">Te învăț cum să gestionezi conflictele și să oferi feedback</span> clar și constructiv, fără să-ți strici relația cu oamenii.</li>
          </ul>
        </div>

        {/* RIGHT: FORM PLACEHOLDER */}
        <aside id="hero-form" aria-label="Formular de înscriere la webinar" className="w-full">
          
            <NewSignUpForm courseId={courseId} numberOfSeats={course?.nrOfSeats} targetDate={targetDate}/>
          
        </aside>

      </div>
    </section>
  )
}
