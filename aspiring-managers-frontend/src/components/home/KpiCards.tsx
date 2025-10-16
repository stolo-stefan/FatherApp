import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { CountdownPretty } from "./CountdownPretty"

export default function KpiCards() {
  const target = new Date()
  target.setDate(target.getDate() + 12)
  target.setHours(10, 0, 0, 0)

  return (
    <section
      aria-label="Upcoming session and enrollment"
      className="relative -mt-16 md:-mt-28 z-10"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Left: Next session card */}
        <Card className="rounded-2xl shadow-md ring-1 ring-black/5 border-[#D9D9D9] bg-white">
          <CardHeader className="pb-1 pt-3 px-4">
            <CardTitle className="text-sm md:text-base text-[#284B63] flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Next session in
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-4 flex flex-col items-center text-center">
            <CountdownPretty targetDate={target} />

            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-8 h-[2px] bg-[#3C6E71]" />
              <p className="text-xs md:text-sm text-[#353535]/80 font-medium">
                Live cohort kickoff
              </p>
              <div className="w-8 h-[2px] bg-[#3C6E71]" />
            </div>
          </CardContent>
        </Card>

        {/* Right: Text + CTA (solid color) */}
        <div className="flex flex-col justify-center rounded-2xl border border-[#D9D9D9] bg-[#3C6E71] p-4 md:p-6 text-white shadow-md">
          <h3 className="text-lg md:text-xl font-bold">
            Ready to level up your management skills?
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/90 leading-snug">
            Join the Aspiring Managers program and learn practical frameworks,
            get live coaching, and build momentum in your first years as a leader.
          </p>
          <div className="mt-3">
            <Button
              className="bg-white text-[#284B63] hover:bg-[#D9D9D9] font-medium text-sm md:text-base px-4 py-2"
              asChild
            >
              <Link to="/enroll">
                Enroll for the course
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
