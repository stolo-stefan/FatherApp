// src/features/webinar/WebinarHero.tsx
import type { ReadCourseDto } from "@/services/course"
//import WebinarCountdownBar from "./WebinarCountdownBar"
// import WebinarSignupForm from "./WebinarSignupForm"

interface WebinarHeroProps {
  course: ReadCourseDto | null
  targetDate: Date | null
  loading: boolean
  error: string | null
}

export default function WebinarHero({
  // course,
  // targetDate,
  // loading,
  // error,
}: WebinarHeroProps) {
  //const courseId = course?.id ?? null

  return (
    <section
      id="hero"
      aria-label="Secțiune principală de înscriere la webinar"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl p-6 md:p-8"
    >
      {/* <WebinarCountdownBar
        course={course}
        targetDate={targetDate}
        loading={loading}
        error={error}
      /> */}

      <div className="mt-6 grid gap-8 md:grid-cols-[3fr,2fr] items-start">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug text-[var(--am-text-dark)]">
            Te învăț cum să conduci echipa cu încredere fără să te simți copleșit, chiar dacă ești la început
          </h1>
        
        <div className="space-y-4">
          <ul>
            <li>❌ Ești manager la început și <span>simți presiune din toate direcțiile,</span> mai ales de la top management?</li>
            <li>✅ În acest webinar gratuit înveți <span>cum să relaționezi cu top managementul</span> fără să simți presiunea apăsătoare.</li>
            <li>❌ Te surprinzi controlând tot, verificând tot și simțind că, <span>dacă nu ești tu peste tot, lucrurile o iau razna?</span></li>
            <li>✅ <span>Te ajut să eviți micro-managementul</span>, fără să pierzi controlul asupra echipei și rezultatelor.</li>
            <li>❌ <span>Te temi de conflicte și de discuții tensionate,</span> mai ales când trebuie să dai feedback direct?</li>
            <li>✅ <span>Te învăț cum să gestionezi conflictele și să oferi feedback</span> clar și constructiv, fără să-ți strici relația cu oamenii.</li>
          </ul>
          {/* <p className="text-sm md:text-base text-[var(--am-text-muted)]">
            Webinar gratuit pentru manageri la început de drum care vor
            claritate, încredere și rezultate încă din prima lună.
          </p> */}
        </div>
        
        {/* FORMULAR HERO
         <aside aria-label="Formular de înscriere la webinar">
          <WebinarSignupForm courseId={courseId} numberOfSeats={course?.nrOfSeats} />
        </aside> */}
        
      </div>
    </section>
  )
}
