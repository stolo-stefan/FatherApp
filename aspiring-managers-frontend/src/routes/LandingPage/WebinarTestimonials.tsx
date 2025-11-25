// src/features/webinar/WebinarTestimonials.tsx
// import TestimonialCard from "./TestimonialCard"
import DariusImg from "@/assets/Darius Draghiceanu - Regional Sales Manager.jpeg"
import IrinelImg from "@/assets/Irinel Ilie - Regional Sales Manager.jpeg"
import ValentinImg from "@/assets/Valentin Sasu - Sales Manager.jpeg"
import IonutImg from "@/assets/Ailenei Ionut - Sales Manager.jpeg"

// src/features/webinar/WebinarTestimonials.tsx
import TestimonialFace from "./TestimonialFace"

export default function WebinarTestimonials() {
  return (
    <section
      id="testimoniale"
      aria-label="Testimoniale clienți"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl p-6 md:p-8"
    >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--am-text-dark)]">
            Ce spun cei care au colaborat?
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
            <TestimonialFace
                imgSrc={DariusImg}
                name="Darius Drăghiceanu"
                role="Regional Sales Manager"
            />
            <TestimonialFace
                imgSrc={IrinelImg}
                name="Irinel Ilie"
                role="Regional Sales Manager"
            />
            <TestimonialFace
                imgSrc={ValentinImg}
                name="Valentin Sasu"
                role="Sales Manager"
            />
            <TestimonialFace
                imgSrc={IonutImg}
                name="Ailenei Ionuț"
                role="Sales Manager"
            />
        </div>
    </section>
  )
}
