import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface BonusItem {
  id: number
  title: string
  content: string
}

const bonusItems: BonusItem[] = [
  {
    id: 1,
    title:
      "Toolkit-ul 3x3x3 pentru discuții eficiente cu top managementul",
    content:
      "Primești o structură clară de abordare pentru întâlnirile cu top managementul: cum să-ți pregătești mesajele, ce informații prezinți și cum construiești credibilitate în ochii lor.",
  },
  {
    id: 2,
    title:
      "Toolkit-ul pentru feedback și discuții dificile cu oamenii din echipă",
    content:
      "Primești un ghid simplu pentru conversații dificile și feedback constructiv, ca să nu mai intri în ele cu un nod în gât. Îl poți folosi imediat după webinar.",
  },
]

export default function BonusesSection() {
  const [openIds, setOpenIds] = useState<number[]>([])

  const toggle = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* SECTION SEPARATOR */}
      <div className="border-t border-[var(--am-border-gray)] mt-20 mb-6" />

      <h2 className="text-3xl font-bold text-[var(--am-text-dark)]">
        Bonusuri pentru participanți
      </h2>

      {/* LIST WITH SEPARATORS */}
      <div className="mt-4 border-y border-[var(--am-border-gray)] divide-y divide-[var(--am-border-gray)]">
        {bonusItems.map((item) => {
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
                className="flex w-full items-start gap-3 text-left"
              >
                {/* Icon + arrow column */}
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
                  <span className="text-xl">🎁</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>

                {/* Title */}
                <span className="text-lg font-semibold text-[var(--am-text-dark)]">
                  {item.title}
                </span>
              </button>

              {/* Content */}
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
                  {item.content}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
