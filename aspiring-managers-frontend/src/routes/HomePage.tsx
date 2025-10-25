import SiteHeader from "@/components/layout/SiteHeader"
import SiteFooter from "@/components/layout/SiteFooter"
import Hero from "@/components/home/Hero"
import KpiCards from "@/components/home/KpiCards"
import FeaturedWorkshops from "@/components/home/FeaturedWorkshops"
import BlogTeasers from "@/components/home/BlogTeasers"
import NewsletterSection from "@/components/home/NewsLetterSection"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#353535]">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <KpiCards />
        </section>
        <NewsletterSection />
        
        {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <FeaturedWorkshops />
        </section> */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <BlogTeasers />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

