import { siteFooter } from "@/components/content/siteContent";
import { SiteLink } from "./SiteLink";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d8dee9] bg-[#0f1b33] text-white">
      <div className="container grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div>
            <p className="text-lg font-semibold">{siteFooter.title}</p>
            <p className="mt-1 text-sm text-white/60"></p>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">{siteFooter.description}</p>
          <p className="mt-5 max-w-xl text-xs leading-6 text-white/50">{siteFooter.note}</p>
        </div>

        {siteFooter.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f6b27c]">{column.title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {column.links.map((link) => (
                <SiteLink key={link.href} href={link.href} className="text-sm text-white/75 transition-colors hover:text-white">
                  {link.label}
                </SiteLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
