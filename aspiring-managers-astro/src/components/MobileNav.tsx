import { ArrowRight, ChevronRight, Menu } from "lucide-react";
import { Drawer } from "vaul";
import type { NavItem } from "@/components/content/siteContent";
import { cn } from "@/lib/utils";

interface Props { pathname: string; items: NavItem[]; scheduler: string }

export function MobileNav({ pathname, items, scheduler }: Props) {
  return (
    <Drawer.Root direction="right" autoFocus>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center border h-12 w-12 rounded-full border-[#d8dee9] bg-white text-[#14213c] shadow-none lg:hidden"
          aria-label="Deschide meniul"
        >
          <Menu className="size-5" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Drawer.Content aria-describedby={undefined} className="fixed inset-y-0 right-0 z-50 flex w-3/4 flex-col overflow-y-auto border-l bg-[#fffaf4] text-[#14213c] sm:max-w-sm">
          <Drawer.Title className="sr-only">Meniu principal</Drawer.Title>
          <div className="flex flex-1 flex-col px-5 py-4">
            <div className="flex flex-col gap-2">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Drawer.Close asChild key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-medium transition-colors",
                        active
                          ? "border-[#14213c] bg-[#14213c] text-white"
                          : "border-[#d8dee9] bg-white text-[#14213c]"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="size-4" />
                    </a>
                  </Drawer.Close>
                );
              })}
            </div>
            <div className="mt-6 rounded-[28px] bg-[#14213c] p-5 text-white shadow-[0_30px_70px_-40px_rgba(20,33,60,0.8)]">
              <h3 className="mt-2 text-2xl font-semibold leading-tight">Începe cu o conversație clară.</h3>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Dacă ești în primele luni de management sau pregătești o echipă de manageri, primul pas este o discuție scurtă.
              </p>
              <Drawer.Close asChild>
                <a href={scheduler} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full bg-[#e8711a] px-6 text-sm font-semibold text-white hover:bg-[#d86a17]">
                  Stabileste o discutie gratuita <ArrowRight className="size-4" />
                </a>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
