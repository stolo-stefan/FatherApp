// src/routes/Webinar/WebinarPage.tsx
import { useEffect, useState } from "react"
import SiteHeader from "@/components/layout/SiteHeader"
import SiteFooter from "@/components/layout/SiteFooter"
import { readLatestCourse, type ReadCourseDto } from "@/services/course"
import WebinarHero from "./WebinarHero"
import WebinarBenefits from "./WebinarBenefits"
import WebinarTrainer from "./WebinarTrainer"
import WebinarTestimonials from "./WebinarTestimonials"
import WebinarBonusSection from "./WebinarBonusSection"

export default function WebinarPage() {
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
        setError("Nu am putut încărca următorul webinar.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  let targetDate: Date | null = null
  if (course) {
    const iso = course.startDate || course.earlierDate
    if (iso) {
      const d = new Date(iso)
      if (!Number.isNaN(d.getTime())) targetDate = d
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--am-bg-light)] text-[var(--am-text-dark)]">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-8">
          <WebinarHero
            course={course}
            targetDate={targetDate}
            loading={loading}
            error={error}
          />
          <WebinarBenefits />
          <WebinarTrainer />
          <WebinarTestimonials />
          <WebinarBonusSection
            course={course}
            targetDate={targetDate}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
