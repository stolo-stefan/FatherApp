import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function SiteFooter() {
  return (
    <footer className="w-screen bg-[#353535] text-white ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm/6 opacity-80">
            © {new Date().getFullYear()} AspiringManagers — Website in progress
          </p>

          <Separator className="md:hidden bg-white/20" />

          <Button
            variant="secondary"
            className="bg-white text-[#284B63] hover:bg-[#D9D9D9]"
            asChild
          >
            <Link to="/blog">Read the Blog</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
