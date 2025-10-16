import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

const nav = [
  { to: "/", label: "Home" },
  { to: "/workshops-events", label: "Workshops & Events" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
]

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-[#353535] text-white">
      <div className="container mx-auto flex items-center gap-4 px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="font-bold tracking-wide">
          AspiringManagers - WebSite in progress
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="ml-auto hidden md:block">
          <NavigationMenuList>
            {nav.map((item) => (
              <NavigationMenuItem key={item.to}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.to}
                    className="px-3 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:block">
          <Button
            className="bg-[#3C6E71] hover:bg-[#284B63] text-white"
            asChild
          >
            <Link to="/enroll">Enroll</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 grid gap-2">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-md px-3 py-2 hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="mt-2 bg-[#3C6E71] hover:bg-[#284B63] text-white"
                  asChild
                >
                  <Link to="/enroll">Enroll</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
