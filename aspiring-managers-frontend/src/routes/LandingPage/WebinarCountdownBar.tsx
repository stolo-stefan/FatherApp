// src/features/webinar/WebinarCountdownBar.tsx
import type { ReadCourseDto } from "@/services/course"
import { CountdownPretty } from "@/components/home/CountdownPretty"

interface WebinarCountdownBarProps {
  course: ReadCourseDto | null
  targetDate: Date | null
  loading: boolean
  error: string | null
}

export default function WebinarCountdownBar({
  course,
  targetDate,
  loading,
  error,
}: WebinarCountdownBarProps) {
  return (
    <div className="border border-dashed border-[var(--am-border-gray)] bg-[var(--am-bg-light)] px-4 py-3 text-sm md:text-base text-center rounded-lg">
      {loading && <span>Se încarcă detaliile webinarului…</span>}
      {error && !loading && <span>{error}</span>}
      {!loading && !error && course && targetDate && (
        <div className="space-y-1">
          <div>
            Timp rămas până la webinar:
            <br />
            <CountdownPretty targetDate={targetDate} />
          </div>
          <div className="mt-1">
            <strong>
              {course.title} – {new Date(targetDate).toLocaleDateString("ro-RO")}{" "}
              · ora {new Date(targetDate).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}
            </strong>
          </div>
        </div>
      )}
      {!loading && !error && !course && (
        <div>
          Nu există încă un webinar programat.
          <br />
          <strong>Înscrie-te și vei fi primul care află următoarea dată.</strong>
        </div>
      )}
    </div>
  )
}
