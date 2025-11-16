// src/components/home/Hero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    // section is 100vw and spans the screen
    <section
      className="
        border-b bg-[#284B63]/5
        ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]
        pt-20 md:pt-28
        pb-24 md:pb-40
      "
    >
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 sm:px-6 lg:px-8 py-0 md:grid-cols-2 md:items-center">        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-[#284B63]">
            Transform your first years as a manager.
          </h1>
          <p className="mt-3 text-base md:text-lg text-[#353535]/80">
            Practical frameworks, live workshops, and a course built for
            aspiring managers at the start of their career.
          </p>
          {/* <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button className="bg-[#3C6E71] hover:bg-[#284B63] text-white" asChild>
              <Link to="/workshops">
                View Upcoming Workshops
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" className="bg-[#D9D9D9] text-[#353535]" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div> */}
        </div>

        <div aria-hidden="true" className="rounded-xl border bg-[#D9D9D9]/40 h-64 md:h-72 lg:h-80 w-full" />
      </div>
    </section>
  )
}
