import {
  FAQBlock,
  FinalBanner,
  PageShell,
  Section,
  SectionBadge,
  SectionIntro,
  SiteButton,
  StepCards,
} from "@/components/MarketingSite";
import { brandAssets, hourPageContent } from "@/components/content/siteContent";

export default function MentorshipHour() {
  return (
    <PageShell>
      <Section tone="navy" id="rezervare">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionBadge>Mentorat 1 la 1</SectionBadge>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.25rem] leading-[0.96] sm:text-[3rem] lg:text-[4.2rem]">
              {hourPageContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {hourPageContent.hero.description}
            </p>
            <div className="mt-8 w-full sm:w-auto">
              <SiteButton item={hourPageContent.hero.cta} fullWidth className="sm:w-auto sm:justify-center" />
              {hourPageContent.hero.cta.note ? (
                <p className="mt-3 text-sm text-white/70">{hourPageContent.hero.cta.note}</p>
              ) : null}
            </div>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-white/12 bg-white/8 shadow-[0_40px_80px_-52px_rgba(0,0,0,0.55)]">
            <div
              className="aspect-[16/10] w-full"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20,33,60,0.16), rgba(20,33,60,0.48)), url(${brandAssets.mentorshipAbstract})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
              <div>
                <p className="text-3xl font-semibold text-white">60 min</p>
                <p className="mt-1 text-sm text-white/70">video call confidențial</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">250 lei</p>
                <p className="mt-1 text-sm text-white/70">plată unică</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">fără abonament</p>
                <p className="mt-1 text-sm text-white/70">doar soluția de care ai nevoie acum</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
          <div>
            <SectionBadge>Potrivire</SectionBadge>
            <SectionIntro title={hourPageContent.fit.title} />
          </div>
          <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
            {hourPageContent.fit.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro title={hourPageContent.session.title} />
        <div className="mt-8 max-w-4xl space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
          {hourPageContent.session.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 30)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionBadge>De ce Florin</SectionBadge>
            <SectionIntro title={hourPageContent.florin.title} description={hourPageContent.florin.description} />
          </div>
          <div
            className="min-h-[320px] rounded-[32px] border border-white/12 bg-white/8"
            style={{
              backgroundImage: `linear-gradient(160deg, rgba(20,33,60,0.22), rgba(20,33,60,0.52)), url(${brandAssets.heroBackground})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Cum funcționează"
          title={hourPageContent.steps.title}
          description="Fluxul este gândit să reducă fricțiunea: plata, rezervarea slotului și întâlnirea propriu-zisă trebuie să fie simple, clare și ușor de urmat și pe mobil."
        />
        <div className="mt-10">
          <StepCards items={hourPageContent.steps.items} />
        </div>
      </Section>

      <Section tone="amber">
        <div className="max-w-4xl">
          <SectionBadge>Decizie rapidă</SectionBadge>
          <SectionIntro title={hourPageContent.urgency.title} description={hourPageContent.urgency.description} />
          <div className="mt-8 w-full sm:w-auto">
            <SiteButton item={hourPageContent.urgency.cta} fullWidth className="sm:w-auto sm:justify-center" />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="FAQ"
          title="Întrebări frecvente despre sesiunea 1 la 1"
          description="Răspunsurile sunt organizate într-un accordion ușor de parcurs pe mobil, pentru ca utilizatorul să ajungă rapid la informația relevantă."
        />
        <div className="mt-10">
          <FAQBlock items={hourPageContent.faqs} />
        </div>
      </Section>

      <Section>
        <FinalBanner
          title={hourPageContent.finalCta.title}
          description={hourPageContent.finalCta.description}
          ctas={hourPageContent.finalCta.ctas}
        />
      </Section>
    </PageShell>
  );
}
