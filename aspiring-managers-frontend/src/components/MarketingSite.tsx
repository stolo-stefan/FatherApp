import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ManagerQuizOverlay } from "@/components/ManagerQuizOverlay";
import { brandAssets, navItems, siteFooter, type CtaLink, type FaqItem, type NavItem, type Testimonial } from "@/components/content/siteContent";
import { QUIZ_TRIGGER_HREF, openManagerQuiz } from "@/lib/managerQuiz";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  MoveUpRight,
  Quote,
} from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#");
}

function getQuizTriggerProps(href: string) {
  if (href !== QUIZ_TRIGGER_HREF) return {};

  return {
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      openManagerQuiz();
    },
  };
}

export function SiteLink({ href, className, children }: PropsWithChildren<{ href: string; className?: string }>) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...getQuizTriggerProps(href)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteButton({ item, className, fullWidth = false }: { item: CtaLink; className?: string; fullWidth?: boolean }) {
  const baseClass = cn(
    "min-h-12 rounded-full px-6 text-sm font-semibold tracking-[0.02em] shadow-[0_16px_40px_-24px_rgba(20,33,60,0.55)] transition-all duration-200 hover:-translate-y-0.5",
    fullWidth && "w-full justify-between",
    item.variant === "secondary"
      ? "border border-white/30 bg-white/8 text-white hover:bg-white/14"
      : item.variant === "ghost"
        ? "border border-[#d8dee9] bg-white text-[#14213c] hover:border-[#14213c] hover:bg-[#f4f6fa]"
        : "bg-[#e8711a] text-white hover:bg-[#d86a17]"
  );

  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        className={cn("inline-flex items-center gap-2", baseClass, className)}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
        {...getQuizTriggerProps(item.href)}
      >
        <span>{item.label}</span>
        <ArrowRight className="size-4" />
      </a>
    );
  }

  return (
    <Link to={item.href} className={cn("inline-flex items-center gap-2", baseClass, className)}>
      <span>{item.label}</span>
      <ArrowRight className="size-4" />
    </Link>
  );
}

export function SiteHeader() {
    const location = useLocation();
    const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8dee9]/70 bg-[rgba(255,252,247,0.92)] backdrop-blur-xl">
      <div className="container flex min-h-18 items-center justify-between gap-4 py-3">
        <SiteLink href="/" className="inline-flex items-center" aria-label="Aspiring Managers">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/nav-logo_57c28d9c.webp"
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

export function PageShell({ children, background = "light" }: PropsWithChildren<{ background?: "light" | "navy" }>) {
  return (
    <div className={cn("min-h-screen", background === "navy" ? "bg-[#0f1b33] text-white" : "bg-[#fffaf4] text-[#14213c]") }>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ManagerQuizOverlay />
    </div>
  );
}

export function Section({
  id,
  className,
  tone = "light",
  children,
}: PropsWithChildren<{ id?: string; className?: string; tone?: "light" | "muted" | "navy" | "amber" }>) {
  const toneClass =
    tone === "navy"
      ? "bg-[#14213c] text-white"
      : tone === "muted"
        ? "bg-[#f2f4f7] text-[#14213c]"
        : tone === "amber"
          ? "bg-[#e8711a] text-white"
          : "bg-[#fffaf4] text-[#14213c]";

  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", toneClass, className)}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#e8711a]">{eyebrow}</p> : null}
      <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] sm:text-[2.6rem]">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-current/78 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function HeroFrame({
  eyebrow,
  title,
  description,
  ctas,
  note,
  stats,
  imageSlot,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  ctas?: CtaLink[];
  note?: string;
  stats?: Array<{ value: string; label: string }>;
  imageSlot?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#14213c] text-white">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(20,33,60,0.25), rgba(20,33,60,0.85)), url(${brandAssets.heroBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(232,113,26,0.18),transparent_24%)]" />
      <div className="container relative grid gap-10 py-16 sm:py-20 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f5b37e]">{eyebrow}</p> : null}
          <h1 className="mt-4 max-w-3xl font-serif text-[2.2rem] leading-[0.96] sm:text-[3rem] lg:text-[4.8rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">{description}</p>
          {ctas?.length ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {ctas.map((cta) => (
                <div key={cta.label} className="w-full sm:w-auto">
                  <SiteButton item={cta} fullWidth className="sm:w-auto sm:justify-center" />
                  {cta.note ? <p className="mt-2 px-1 text-center text-xs text-white/72 sm:text-left">{cta.note}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
          {note ? <p className="mt-3 text-xs text-white/72">{note}</p> : null}
          {stats?.length ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-white/12 bg-white/8 px-5 py-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative order-last lg:order-none">{imageSlot}</div>
      </div>
    </section>
  );
}

export function EditorialCard({ title, description, href, cta, accent = "orange" }: { title: string; description: string; href: string; cta: string; accent?: "orange" | "navy"; }) {
  return (
    <article className="group flex h-full flex-col rounded-[30px] border border-[#d7dfe9] bg-white p-6 shadow-[0_28px_70px_-48px_rgba(20,33,60,0.45)] transition-transform duration-200 hover:-translate-y-1 sm:p-8">
      <div className={cn("mb-6 h-1.5 w-20 rounded-full", accent === "orange" ? "bg-[#e8711a]" : "bg-[#14213c]")} />
      <h3 className="font-serif text-[1.55rem] leading-tight text-[#14213c]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#52627a] sm:text-base">{description}</p>
      <SiteLink href={href} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#14213c] transition-colors group-hover:text-[#e8711a]">
        {cta}
        <MoveUpRight className="size-4" />
      </SiteLink>
    </article>
  );
}

export function StepCards({ items, dark = false }: { items: Array<{ number: string; title: string; description: string }>; dark?: boolean; }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.number + item.title}
          className={cn(
            "rounded-[28px] border p-6 sm:p-7",
            dark ? "border-white/12 bg-white/6" : "border-[#d7dfe9] bg-white"
          )}
        >
          <p className="text-4xl font-serif text-[#e8711a] sm:text-5xl">{item.number}</p>
          <h3 className={cn("mt-4 text-xl font-semibold", dark ? "text-white" : "text-[#14213c]")}>{item.title}</h3>
          <p className={cn("mt-3 text-sm leading-7 sm:text-base", dark ? "text-white/72" : "text-[#52627a]")}>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export function QuoteBlock({ quote }: { quote: string }) {
  return (
    <blockquote className="rounded-[28px] border border-[#f0cfb3] bg-[#fff1e6] p-6 text-lg leading-8 text-[#14213c] shadow-[0_24px_60px_-46px_rgba(232,113,26,0.65)] sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8711a] text-white">
          <Quote className="size-5" />
        </div>
        <p className="font-serif italic">{quote}</p>
      </div>
    </blockquote>
  );
}

export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.author + item.role} className="rounded-[28px] border border-[#d8dee9] bg-white p-6 shadow-[0_30px_70px_-50px_rgba(20,33,60,0.35)] sm:p-7">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1e6] text-[#e8711a]">
            <Quote className="size-5" />
          </div>
          <p className="text-sm leading-7 text-[#33445c] sm:text-base">{item.quote}</p>
          <div className="mt-6 border-t border-[#eef2f7] pt-4">
            <p className="font-semibold text-[#14213c]">{item.author}</p>
            <p className="mt-1 text-sm leading-6 text-[#66768d]">{item.role}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function FAQBlock({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  return (
    <Accordion type="single" collapsible defaultValue={items[0]?.question} className="rounded-[28px] border border-[#d8dee9] bg-white/95 px-5 py-3 shadow-[0_30px_60px_-48px_rgba(20,33,60,0.3)] sm:px-8">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className={cn(dark && "border-white/14") }>
          <AccordionTrigger className={cn("py-5 text-base font-semibold text-[#14213c] hover:no-underline sm:text-lg", dark && "text-[#14213c]")}>{item.question}</AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-[#5a6b84] sm:text-base">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function BulletBeliefs({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="rounded-[24px] border border-white/14 bg-white/7 p-5 text-white shadow-[0_24px_50px_-36px_rgba(0,0,0,0.45)]">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8711a] text-white">
              <Check className="size-4" />
            </span>
            <p className="text-sm leading-7 text-white/82">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SplitStory({ title, paragraphs, quote, media }: { title: string; paragraphs: string[]; quote?: string; media?: ReactNode; }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5">
        <h2 className="font-serif text-[2rem] leading-[1.05] sm:text-[2.6rem]">{title}</h2>
        {media}
      </div>
      <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        {quote ? <QuoteBlock quote={quote} /> : null}
      </div>
    </div>
  );
}

export function AmbientPanel({
  imageUrl,
  label,
  title,
  description,
  dark = false,
  imageSize = "cover",
  imagePosition = "center",
  imageBackgroundClass,
}: {
  imageUrl: string;
  label: string;
  title: string;
  description: string;
  dark?: boolean;
  imageSize?: "cover" | "contain";
  imagePosition?: string;
  imageBackgroundClass?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[32px] border", dark ? "border-white/12 bg-white/8" : "border-[#d8dee9] bg-white") }>
      <div
        className={cn("aspect-[16/10] w-full bg-no-repeat", imageBackgroundClass)}
        style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: imagePosition, backgroundSize: imageSize }}
      />
      <div className="p-6 sm:p-7">
        <p className={cn("text-xs font-semibold uppercase tracking-[0.22em]", dark ? "text-[#f5b37e]" : "text-[#e8711a]")}>{label}</p>
        <h3 className={cn("mt-3 font-serif text-[1.7rem] leading-tight", dark ? "text-white" : "text-[#14213c]")}>{title}</h3>
        <p className={cn("mt-4 text-sm leading-7 sm:text-base", dark ? "text-white/76" : "text-[#5a6b84]")}>{description}</p>
      </div>
    </div>
  );
}

export function FinalBanner({ title, description, ctas, note, tone = "navy" }: { title: string; description: string; ctas: CtaLink[]; note?: string; tone?: "navy" | "amber"; }) {
  return (
    <div className={cn("overflow-hidden rounded-[36px] p-7 shadow-[0_40px_80px_-52px_rgba(20,33,60,0.7)] sm:p-10 lg:p-12", tone === "amber" ? "bg-[#e8711a] text-white" : "bg-[#14213c] text-white") }>
      <div className="max-w-3xl">
        <h2 className="font-serif text-[2rem] leading-[1.02] sm:text-[2.8rem]">{title}</h2>
        <p className="mt-5 text-base leading-8 text-white/78 sm:text-lg">{description}</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {ctas.map((cta) => (
          <SiteButton key={cta.label} item={cta} fullWidth className="sm:w-auto sm:justify-center" />
        ))}
      </div>
      {note ? <p className="mt-4 text-sm text-white/68">{note}</p> : null}
    </div>
  );
}

export function SectionBadge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-full border border-[#f0cfb3] bg-[#fff1e6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#c85a12]">
      {children}
    </span>
  );
}

export function NumberedModuleGrid({ items }: { items: Array<{ number: string; title: string; description: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.number + item.title} className="rounded-[28px] border border-[#d8dee9] bg-[#f3f5f8] p-6 shadow-[0_26px_60px_-54px_rgba(20,33,60,0.3)]">
          <p className="font-serif text-5xl text-[#e8711a]">{item.number}</p>
          <h3 className="mt-4 text-xl font-semibold text-[#14213c]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#52627a]">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

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
