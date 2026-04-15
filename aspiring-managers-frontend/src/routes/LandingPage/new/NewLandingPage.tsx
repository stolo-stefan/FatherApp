// src/routes/Webinar/WebinarPage.tsx
import { useEffect, useState } from "react"
import { readLatestCourse, type ReadCourseDto } from "@/services/course"
import NewWebinarHero from "./NewWebinarHero"
import AboutSection from "./AboutSection"
import AboutSupportSection from "./AboutSupportSection"
import Testimonials from "./Testimonials"
import LearningsSection from "./LearningsSection"
import QASessionSection from "./QASessionSection"
import BonusesSection from "./BonusesSection"
import StorySection from "./StorySection"
import FAQSection from "./FAQSection"
import Navbar from "@/components/layout/Navbar"
import { PageShell } from "@/components/MarketingSite"
// import WebinarScreenshotTestimonials from "./WebinarScreenshotTestimonials"

export default function NewLandingPage() {
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
    <>
    <PageShell>
    {/* <Navbar /> */}
    <main className="pt-4 md:pt-6 pb-10 md:pb-14">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewWebinarHero
          course={course}
          targetDate={targetDate}
          loading={loading}
          error={error}
        />
        <AboutSection course={course}/>
        <AboutSupportSection course={course} />
        <Testimonials/>
        <LearningsSection course={course} />
        <QASessionSection course={course} />
        <BonusesSection />
        <StorySection course={course}/>
        <FAQSection course={course}/>
        {/* Aici poți adăuga alte secțiuni ale paginii fără să fie afectate de flex/min-h-screen */}
        {/* <WebinarScreenshotTestimonials /> */}
      </div>
    </main>
    </PageShell>
    </>
  )
}
