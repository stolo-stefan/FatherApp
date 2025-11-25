// src/features/webinar/WebinarHero.tsx
import type { ReadCourseDto } from "@/services/course"
import WebinarCountdownBar from "./WebinarCountdownBar"
import WebinarSignupForm from "./WebinarSignUpForm"

interface WebinarHeroProps {
  course: ReadCourseDto | null
  targetDate: Date | null
  loading: boolean
  error: string | null
}

export default function WebinarHero({
  course,
  targetDate,
  loading,
  error,
}: WebinarHeroProps) {
  const courseId = course?.id ?? null

  return (
    <section
      id="hero"
      aria-label="Secțiune principală de înscriere la webinar"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl p-6 md:p-8"
    >
      <WebinarCountdownBar
        course={course}
        targetDate={targetDate}
        loading={loading}
        error={error}
      />

      <div className="mt-6 grid gap-8 md:grid-cols-[3fr,2fr] items-start">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug text-[var(--am-text-dark)]">
            Te învăț în primele 2 luni de mandat să conduci echipa cu încredere,
            fără teama de eșec.
          </h1>
          <p className="text-lg leading-relaxed">
            O să-ți dau toți pașii pe care eu i-am aplicat de 25 de ani, cu
            rezultate reale.
          </p>
          <h2 className="text-xl md:text-2xl font-semibold">
            Participă la webinar și începe să aplici metodologia și instrumentele
            care dau rezultate din prima lună.
          </h2>
          <p className="text-sm md:text-base text-[var(--am-text-muted)]">
            Webinar gratuit pentru manageri la început de drum care vor
            claritate, încredere și rezultate încă din prima lună.
          </p>
        </div>

        <aside aria-label="Formular de înscriere la webinar">
          <WebinarSignupForm courseId={courseId} />
        </aside>
      </div>
    </section>
  )
}
