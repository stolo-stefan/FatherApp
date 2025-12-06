// src/features/webinar/WebinarHero.tsx
import type { ReadCourseDto } from "@/services/course"
//import WebinarCountdownBar from "./WebinarCountdownBar"
import WebinarSignupForm from "./WebinarSignupForm"

interface WebinarHeroProps {
  course: ReadCourseDto | null
  targetDate: Date | null
  loading: boolean
  error: string | null
}

export default function WebinarHero({
  course,
  // targetDate,
  // loading,
  // error,
}: WebinarHeroProps) {
  const courseId = course?.id ?? null

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
            Te învăț cum să conduci echipa cu încredere încă din prima lună, chiar dacă ești la început și totul pare haotic.
          </h1>
        
        <div className="space-y-4">
          
          <h2 className="text-xl md:text-2xl font-semibold">
            Descoperi pașii corecți pe care orice manager debutant trebuie să-i facă pentru a obține rezultate rapide, fără să învețe prin eșec.
          </h2>
          <h3 className="text-lg leading-relaxed">
            Webinar live pentru cei care vor să treacă rapid de la nesiguranță la încredere în rolul de manager
          </h3>
          {/* <p className="text-sm md:text-base text-[var(--am-text-muted)]">
            Webinar gratuit pentru manageri la început de drum care vor
            claritate, încredere și rezultate încă din prima lună.
          </p> */}
        </div>
        <aside aria-label="Formular de înscriere la webinar">
          <WebinarSignupForm courseId={courseId} numberOfSeats={course?.nrOfSeats} />
        </aside>
        
      </div>
    </section>
  )
}
