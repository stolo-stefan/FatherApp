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
            Te învăț cum să-ți conduci echipa cu încredere fără să te simți
            copleșit, chiar dacă ești la început
          </h1>

          <ul className="list-none p-0 m-0 space-y-3 text-[var(--am-text-dark)]">
            <li>❌ Ești la început ca manager, simți presiune de sus și de jos, iar <span className="font-semibold"> relația cu top managementul te apasă?</span></li>
            <li>✅ În webinar înveți cum să comunici cu top managementul<span className="font-semibold"> relaxat și sigur pe tine, fără frică și fără stres.</span></li>
            <li>❌<span className="font-semibold">Te surprinzi controlând tot, eviți conflictele</span> și îți e teamă să dai feedback ca să nu strici relațiile?</li>
            <li className="font-semibold">✅ Te învăț cum să gestionezi conflictele, să eviți micro-managementul și să oferi feedback clar, fără tensiuni.</li>
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
