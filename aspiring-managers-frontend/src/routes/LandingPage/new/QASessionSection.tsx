import NewButon from "@/components/home/NewButton"
import type { ReadCourseDto } from "@/services/course"

interface WebinarHeroProps{
    course: ReadCourseDto | null
}

export default function QASessionSection({
  course
}: WebinarHeroProps) {
  return (
    <section className="mt-14 md:mt-20">
      {/* Top line */}
      <div className="border-t border-[var(--am-border-gray)] pt-8 pb-10">

        {/* CONTENT */}
        <div className="mx-auto max-w-3xl text-center space-y-4">

          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-[var(--am-text-dark)]">
            Sesiune Q&A live
          </h2>

          <p className="text-[var(--am-text-dark)]">
            La final, avem o sesiune Q&A în care poți aduce propriile situații: relații complicate cu șeful, colegi dificili, conflicte mocnite în echipă, feedback-uri pe care nu știi cum să le formulezi.
          </p>
          <p className="text-[var(--am-text-dark)] font-semibold">Poți întreba orice, iar eu îți răspund pe loc, concret, nu teoretic.</p>
          <p className="text-[var(--am-text-dark)] font-semibold">Tu alegi dacă vrei ca numele tău să fie văzut de ceilalți participanți sau participi complet anonim.</p>
          <p className="text-[var(--am-text-dark)]">Dacă vrei să fii anonim în timpul webinarului, nimeni nu îți va știi numele (nici macar eu), <span className="font-semibold">atata timp cat atunci cand intri în Zoom te inregistrezi cu ce alias dorești tu.</span></p>
          {/* CTA BUTTON – centered */}
          <div className="pt-4 flex justify-center">
            <NewButon course={course} />
          </div>

        </div>

        
      </div>
    </section>
  )
}
