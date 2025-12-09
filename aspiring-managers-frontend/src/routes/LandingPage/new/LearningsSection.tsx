import { useState } from "react"
import { ChevronDown } from "lucide-react"
import NewButon from "@/components/home/NewButton"
import type { ReadCourseDto } from "@/services/course"

interface Item {
  id: number
  title: string
  content: string
}

const items: Item[] = [
  {
    id: 1,
    title:
      "Te învăț cum să gestionezi relațiile de început cu top managementul fără să simți presiunea apăsătoare",
    content:
      "Vorbim despre cum să te poziționezi sănătos față de directorii și boardul companiei, astfel încât să nu îți fie frică de fiecare întâlnire sau email. Afli cum să comunici clar, să pui întrebări fără teamă și să construiești cu încredere, nu cu frică.",
  },
  {
    id: 2,
    title: "Te învăț cum să eviți micro-managementul fără să pierzi controlul",
    content:
      "Discutăm despre unde se rupe filmul între „mă implic” și „micro-manageriez tot”. Îți arăt cum să păstrezi controlul pe rezultate, fără să sufoci oamenii și fără să te epuizezi tu, verificând fiecare detaliu.",
  },
  {
    id: 3,
    title: "Te învăț să gestionezi conflictele, fără să te temi că vei fi judecat",
    content:
      "Înveți cum să intri în discuții dificile fără să le mai amâni la nesfârșit. Vorbim despre ce să spui, ce să NU spui, cum să rămâi calm și cum să abordezi un conflict astfel încât să iasă cu soluții, nu cu ranchiună.",
  },
  {
    id: 4,
    title:
      "Te învăț să oferi feedback clar și constructiv, fără să te temi că se vor tensiona relațiile cu oamenii",
    content:
      "Îți dau structuri de conversație și exemple concrete de formulare, astfel încât feedback-ul tău să fie direct, dar corect și respectuos. Scopul: oamenii să știe exact ce au de îmbunătățit, fără să simtă că sunt atacați.",
  },
]
interface WebinarHeroProps{
    course: ReadCourseDto | null
}

export default function LearningsSection({
  course
}: WebinarHeroProps) {
    const [openIds, setOpenIds] = useState<number[]>([])

    const toggle = (id: number) => {
        setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        )
    }

    return (
        <>
        <div className="border-t border-[var(--am-border-gray)] mt-16 mb-16" />
        <div className="w-full max-w-3xl mx-auto space-y-6">
        
        <h2 className="text-3xl font-bold text-[var(--am-text-dark)]">
            Practic, ce învățăm în webinar?
        </h2>

        <p className="text-[var(--am-text-muted)] max-w-2xl">
            Ne concentrăm pe 4 probleme mari cu care se lovesc aproape toți
            managerii la început – și pe soluțiile lor concrete:
        </p>

        {/* subtle frame + separators between items */}
        <div className="mt-4 border-y border-[var(--am-border-gray)] divide-y divide-[var(--am-border-gray)]">
            {items.map((item) => {
            const isOpen = openIds.includes(item.id)
            return (
                <div
                onClick={() => toggle(item.id)}
                key={item.id}
                className={`py-4 transition-colors ${
                    isOpen ? "bg-[var(--am-bg-light)]/70" : "bg-transparent"
                }`}
                >
                {/* Title row: number + arrow + title */}
                <button
                    type="button"
                    className="flex w-full items-start gap-3 text-left"
                >
                    <span
                    className={`
                        flex items-center gap-1 pr-2 border-r
                        ${isOpen
                        ? "border-[var(--am-primary-teal)] text-[var(--am-primary-teal)]"
                        : "border-[var(--am-border-gray)] text-[var(--am-primary-teal)]"}
                    `}
                    >
                    <span className="text-xl font-bold">{item.id}.</span>
                    <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                        }`}
                    />
                    </span>

                    <span className="text-lg font-semibold text-[var(--am-text-dark)]">
                    {item.title}
                    </span>
                </button>

                {/* Text with simple appear animation */}
                <div
                    className={`
                    ml-[3.25rem] mt-2 overflow-hidden
                    transition-all duration-200
                    ${
                        isOpen
                        ? "max-h-40 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-1"
                    }
                    `}
                >
                    <p className="text-[var(--am-text-muted)] leading-relaxed">
                    {item.content}
                    </p>
                </div>
                </div>
            )
            })}
        </div>
        <div className="pt-4 flex justify-center">
            <NewButon course={course} />
        </div>
        </div>
        </>
    )
}
