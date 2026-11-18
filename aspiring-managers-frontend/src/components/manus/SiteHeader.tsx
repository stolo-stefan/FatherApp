import { Button } from "@/components/ui/button";
import { Drawer } from "./ui/Drawer";
import { DrawerClose } from "./ui/DrawerClose";
import { DrawerContent } from "./ui/DrawerContent";
import { DrawerTrigger } from "./ui/DrawerTrigger";
import { brandAssets, navItems } from "@/components/content/siteContent";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SiteLink } from "./SiteLink";
import { SiteButton } from "./SiteButton";

export function SiteHeader() {
    const location = useLocation();
    const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8dee9]/70 bg-[rgba(255,252,247,0.92)] backdrop-blur-xl">
      <div className="container flex min-h-18 items-center justify-between gap-4 py-3">
        <SiteLink href="/" className="inline-flex items-center" aria-label="Aspiring Managers">
          <img
            src={brandAssets.headerLogo}
            alt="Aspiring Managers"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </SiteLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <SiteLink
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-[#42526b] transition-colors hover:bg-[#eef2f8] hover:text-[#14213c]",
                  active && "bg-[#14213c] text-white hover:bg-[#14213c] hover:text-white"
                )}
              >
                {item.label}
              </SiteLink>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <SiteButton item={{ label: "Stabileste o discutie gratuita", href: "https://scheduler.zoom.us/florin-stoleriu/invitatie-la-discutie-1-la-1", variant: "primary" }} />
        </div>

        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-full border-[#d8dee9] bg-white text-[#14213c] shadow-none lg:hidden"
              aria-label="Deschide meniul"
            >
              <Menu className="size-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#fffaf4] text-[#14213c]">
            <div className="flex flex-1 flex-col px-5 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <DrawerClose asChild key={item.href}>
                      <SiteLink
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-medium transition-colors",
                          active
                            ? "border-[#14213c] bg-[#14213c] text-white"
                            : "border-[#d8dee9] bg-white text-[#14213c]"
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="size-4" />
                      </SiteLink>
                    </DrawerClose>
                  );
                })}
              </div>
              <div className="mt-6 rounded-[28px] bg-[#14213c] p-5 text-white shadow-[0_30px_70px_-40px_rgba(20,33,60,0.8)]">
                <h3 className="mt-2 text-2xl font-semibold leading-tight">Începe cu o conversație clară.</h3>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Dacă ești în primele luni de management sau pregătești o echipă de manageri, primul pas este o discuție scurtă.
                </p>
                <DrawerClose asChild>
                  <SiteButton
                    item={{ label: "Stabileste o discutie gratuita", href: "https://scheduler.zoom.us/florin-stoleriu/invitatie-la-discutie-1-la-1", variant: "primary" }}
                    fullWidth
                    className="mt-5"
                  />
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
