// src/features/webinar/WebinarBonusSection.tsx
import WebinarSignupForm from "./WebinarSignupForm"
import { CountdownPretty } from "@/components/home/CountdownPretty"
import type { ReadCourseDto } from "@/services/course"

interface WebinarBonusSectionProps {
  course: ReadCourseDto | null
  targetDate: Date | null
}

export default function WebinarBonusSection({
  course,
  targetDate
}: WebinarBonusSectionProps) {

  const courseId = course?.id ?? null

  // Formatăm data și ora în stil românesc
  const formattedDate = targetDate
    ? new Intl.DateTimeFormat("ro-RO", {
        day: "numeric",
        month: "long"
      }).format(targetDate)
    : null

  const formattedTime = targetDate
    ? new Intl.DateTimeFormat("ro-RO", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(targetDate)
    : null

  return (
    <section
      id="bonus-si-formular"
      aria-label="Bonus și formular de înscriere"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Bonus pentru primii înscriși
      </h2>

      <p className="text-lg md:text-xl mb-3">
        BONUS SPECIAL PENTRU PRIMII 3 ÎNSCRIȘI LA DISCUȚIA 1-LA-1:{" "}
        <strong>2 ore consultanță gratuită live.</strong>
      </p>

      {/* Counter funcțional */}
      <div className="flex flex-col gap-2 mb-6">
        {targetDate ? (
          <>
            <span className="text-base md:text-lg font-semibold">Mai sunt:</span>
            <CountdownPretty targetDate={targetDate} />
          </>
        ) : (
          <span className="text-base text-[var(--am-text-muted)]">
            Nu există încă un webinar programat.
          </span>
        )}
      </div>

      <p className="text-base md:text-lg mb-6">
        În 60 de minute primești o hartă și instrumentele necesare să conduci cu claritate echipa.
      </p>

      <hr className="border-t border-[var(--am-border-gray)] my-4" />

      <h3 className="text-2xl font-semibold mb-1">Înscrie-te la webinar</h3>

      {/* 🔥 AICI punem data reală */}
      <p className="text-sm md:text-base text-[var(--am-text-muted)] mb-4">
        {course && targetDate ? (
          <>
            Webinar Live – {formattedDate}, ora {formattedTime} (ora României)
          </>
        ) : (
          "Data webinarului va fi anunțată în curând."
        )}
      </p>

      <WebinarSignupForm courseId={courseId} />
    </section>
  )
}
