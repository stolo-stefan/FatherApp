import { useState } from "react"
import { ChevronDown } from "lucide-react"
import NewButon from "@/components/home/NewButton"
import type { ReadCourseDto } from "@/services/course"

interface FaqItem {
  id: number
  question: string
  answer: string
}




const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "Cine prezintă webinarul?",
    answer:
      "Florin Stoleriu, manager și mentor specializat în dezvoltarea echipelor, cu peste 25 de ani în top management.",
  },
  {
    id: 2,
    question: "Pentru cine este acest webinar?",
    answer:
      "Pentru manageri proaspăt promovați, lideri de echipă sau specialiștii care tocmai au primit responsabilități de conducere și simt presiune, nesiguranță sau teamă de a greși.",
  },
  {
    id: 3,
    question: "Ce subiecte acoperim concret?",
    answer:
      "Ne concentrăm pe 4 teme cheie: relația cu top managementul, evitarea micro-managementului, gestionarea conflictelor și oferirea de feedback clar și constructiv.",
  },
  {
    id: 4,
    question: "Cât durează webinarul?",
    answer:
      "Webinarul are loc online, durează aproximativ 60 de minute și include timp pentru Q&A la final.",
  },
  {
    id: 5,
    question: "Cum mă înscriu la webinar?",
    answer:
      "Completezi numele, adresa de email și telefonul în formularul de înscriere de pe pagină, iar noi îți trimitem pe email toate detaliile de acces.",
  },
  {
    id: 6,
    question: "Este webinarul gratuit?",
    answer: "Da, participarea este 100% gratuită.",
  },
  {
    id: 7,
    question: "Pot pune întrebări specifice situației mele?",
    answer:
      "Da. În sesiunea de Q&A poți descrie situația ta concretă (anonim sau nu) și primești răspuns pe loc.",
  },
  {
    id: 8,
    question: "Voi primi înregistrarea webinarului?",
    answer:
      "Nu trimitem înregistrarea, pentru a proteja intimitatea managerilor care aleg să vorbească deschis despre situațiile lor.",
  },
  {
    id: 9,
    question: "Ce trebuie să pregătesc înainte de webinar?",
    answer:
      "Doar o conexiune bună la internet și, ideal, câteva exemple concrete din realitatea ta de zi cu zi ca manager.",
  },
  {
    id: 10,
    question: "De ce să particip?",
    answer:
      "Pentru că vei pleca cu claritate, structuri de discuție și mindset concret pe care le poți folosi imediat în relația cu top managementul, cu oamenii tăi și în situații tensionate.",
  },
]

interface WebinarHeroProps{
    course: ReadCourseDto | null
}

export default function FAQSection({
  course
}: WebinarHeroProps) {
  const [openIds, setOpenIds] = useState<number[]>([])

  const toggle = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <section className="w-full max-w-3xl mx-auto">
      {/* separator from previous block */}
      <div className="border-t border-[var(--am-border-gray)] mt-20 mb-6" />

      <h2 className="text-3xl font-bold text-[var(--am-text-dark)]">
        Întrebări frecvente
      </h2>

      <div className="mt-4 border-y border-[var(--am-border-gray)] divide-y divide-[var(--am-border-gray)]">
        {faqItems.map((item) => {
          const isOpen = openIds.includes(item.id)
          return (
            <div
            onClick={() => toggle(item.id)}
              key={item.id}
              className={`py-4 transition-colors ${
                isOpen ? "bg-[var(--am-bg-light)]/70" : ""
              }`}
            >
              <button
                type="button"
                
                className="flex w-full items-start gap-4 text-left"
              >
                {/* Arrow + question number area */}
                <span
                  className={`
                    flex items-center gap-1 pr-3 border-r
                    ${
                      isOpen
                        ? "border-[var(--am-primary-teal)] text-[var(--am-primary-teal)]"
                        : "border-[var(--am-border-gray)] text-[var(--am-primary-teal)]"
                    }
                  `}
                >
                  {/* If you want numbers, add: <span className='font-semibold'>{item.id}.</span> */}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>

                <span className="text-lg font-semibold text-[var(--am-text-dark)]">
                  {item.question}
                </span>
              </button>

              {/* answer */}
              <div
                className={`
                  ml-[3.6rem] mt-2 overflow-hidden
                  transition-all duration-200
                  ${
                    isOpen
                      ? "max-h-40 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }
                `}
              >
                <p className="text-[var(--am-text-muted)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    <div className="pt-4 flex justify-center">
        <NewButon course={course} />
    </div>
    </section>
  )
}
