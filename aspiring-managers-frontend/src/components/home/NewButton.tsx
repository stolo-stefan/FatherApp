import type { ReadCourseDto } from "@/services/course"

interface WebinarHeroProps{
    course: ReadCourseDto | null
}

function formatDateRo(dateIso?: string | null) {
  if (!dateIso) return null
  const d = new Date(dateIso)

  const zile = [
    "duminică",
    "luni",
    "marți",
    "miercuri",
    "joi",
    "vineri",
    "sâmbătă",
  ]
  const luni = [
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie",
  ]

  const ziSapt = zile[d.getDay()]
  const zi = d.getDate()
  const luna = luni[d.getMonth()]
  const ora = d.getHours().toString().padStart(2, "0")
  const min = d.getMinutes().toString().padStart(2, "0")

  return `${ziSapt[0].toUpperCase()}${ziSapt.slice(
    1,
  )}, ${zi} ${luna}, la ora ${ora}:${min}`
}

export default function NewButon({ course }: WebinarHeroProps) {
  return (
    <div className="inline-flex flex-col items-start">
      <a
        href="#hero-form"
        className="inline-block bg-[#e47f3a] hover:bg-[#E6772D] text-white font-semibold rounded-xl px-10 py-4 shadow-md text-center"
      >
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] text-base md:text-lg font-semibold">
            Înscrie-te la webinarul gratuit
          </span>
          <span className="text-[11px] md:text-xs font-normal">
            {course?.nrOfSeats}
            {course?.nrOfSeats === 1 ? " loc disponibil" : " locuri disponibile"}
          </span>
        </div>
      </a>

      <p className="self-center text-center mt-1">
        {formatDateRo(course?.startDate)}
      </p>
    </div>
  )
}