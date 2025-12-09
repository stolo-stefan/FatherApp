// src/features/webinar/WebinarAboutSection.tsx
import type { ReadCourseDto } from "@/services/course"
import florinImg from "../../../assets/Florin-Stoleriu-Fondator.jpg"
import abInBec from "../../../assets/ABInBec-logo.png"
import bergenbier from "../../../assets/Bergenbier-logo.png"
import mogyi from "../../../assets/Mogyi-logo.png"
import paypoint from "../../../assets/Paypoint-logo-HD.svg"
import policolor from "../../../assets/Policolor-logo.png"
import savana from "../../../assets/Savana-logo-hd.png"
import { LogoCarousel } from "@/components/home/LogoCarousel"
import NewButon from "@/components/home/NewButton"

interface WebinarHeroProps{
    course: ReadCourseDto | null
}

export default function AboutSection({
  course
}: WebinarHeroProps) {
  return (
    <section className="mt-14 md:mt-20">
      {/* Top line */}
      <div className="border-t border-[var(--am-border-gray)] pt-8 pb-10">

        {/* TWO-COLUMN LAYOUT */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-12">

          {/* LEFT SIDE */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--am-text-dark)] mb-4">
              Despre mine
            </h2>

            <div className="space-y-4 text-[var(--am-text-dark)]">
              <p>Sunt Florin Stoleriu și te felicit pentru noul rol!</p>

              <p>
                Sunt fondatorul programului Aspiring Managers și am peste{" "}
                <span className="font-semibold">25 de ani de experiență în top management</span>, 
                în industrii variate, unde am condus echipe mari în business-uri uriașe.
              </p>

              <p>Am mentorat zeci de manageri debutanți și știu exact prin ce treci.</p>

              <p>Eu am învățat totul pe cont propriu, cu multă presiune și zero sprijin.</p>

              <p className="font-semibold">
                Acum aleg să fac opusul: mentorez tineri manageri ca tine să-și înceapă cariera 
                fără stres, fără panică și fără să simtă că duc totul singuri.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <NewButon course={course} />
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <aside className="md:w-[320px] lg:w-[360px] flex-shrink-0 mx-auto md:mx-0">
            <img
              src={florinImg}
              alt="Florin Stoleriu"
              className="w-full rounded-3xl object-cover"
            />
          </aside>
        </div>

        {/* NEW SECTIONS BELOW TEXT + IMAGE */}
        <div className="mt-14 space-y-10">
            {/* COMPANII */}
            <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--am-text-dark)] mb-2">
                Companii în care am performat ca manager sau director
                </h3>
                <LogoCarousel logos={[abInBec,bergenbier,mogyi,paypoint,policolor,savana]}/>
            </div>

            {/* PUBLICATII */}
            <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--am-text-dark)] mb-2">
                Publicații în care am apărut
                </h3>
                <p className="text-[var(--am-text-dark)]">
                Wall-Street.ro • Business Magazin • Daily Business • Business Days • ZF Top 100 tineri manageri
                </p>
            </div>
            </div>
      </div>
    </section>
  )
}
