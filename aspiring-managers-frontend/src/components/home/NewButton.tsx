import type { ReadCourseDto } from "@/services/course"

interface WebinarHeroProps{
    course: ReadCourseDto | null
}

export default function NewButon({
  course
}: WebinarHeroProps){
    return (
        <>
        <a
            href="#hero-form"
            className="inline-block bg-[#FF8A3D] hover:bg-[#E6772D] text-white font-semibold rounded-xl px-10 py-4 shadow-md text-center"
        >
              <div className="flex flex-col leading-tight">
                <span className="text-base md:text-lg font-semibold">
                  Înscrie-te la webinarul gratuit
                </span>
                <span className="text-[11px] md:text-xs font-normal">
                  {course?.nrOfSeats} locuri disponibile
                </span>
              </div>
        </a>
        </>
    )
}