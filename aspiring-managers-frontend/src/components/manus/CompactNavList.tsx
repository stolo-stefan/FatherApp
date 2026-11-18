import { type NavItem } from "@/components/content/siteContent";
import { SiteLink } from "./SiteLink";

export function CompactNavList({ items }: { items: NavItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <SiteLink key={item.href} href={item.href} className="rounded-full border border-[#d8dee9] bg-white px-4 py-2 text-sm font-medium text-[#14213c] transition-colors hover:border-[#14213c]">
          {item.label}
        </SiteLink>
      ))}
    </div>
  );
}
