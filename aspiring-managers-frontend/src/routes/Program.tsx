import {
  FAQBlock,
  FinalBanner,
  NumberedModuleGrid,
  PageShell,
  Section,
  SectionBadge,
  SectionIntro,
  SiteButton,
  StepCards,
  TestimonialGrid,
} from "@/components/MarketingSite";
import { brandAssets, programPageContent } from "@/components/content/siteContent";

export default function Program() {
  return (
    <PageShell>
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <SectionBadge>Program de mentorat</SectionBadge>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.25rem] leading-[0.96] sm:text-[3rem] lg:text-[4.2rem]">
              {programPageContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {programPageContent.hero.description}
            </p>
            <div className="mt-8 w-full sm:w-auto">
              <SiteButton item={programPageContent.hero.cta} fullWidth className="sm:w-auto sm:justify-center" />
              {programPageContent.hero.cta.note ? (
                <p className="mt-3 text-sm text-white/70">{programPageContent.hero.cta.note}</p>
              ) : null}
            </div>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-white/12 bg-white/8 shadow-[0_40px_80px_-52px_rgba(0,0,0,0.52)]">
            <div
              className="aspect-[16/10] w-full"
              style={{
                backgroundImage: `linear-gradient(145deg, rgba(20,33,60,0.2), rgba(20,33,60,0.46)), url(${brandAssets.mentorshipAbstract})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="grid gap-3 p-6 sm:grid-cols-3 sm:p-8">
              <div>
                <p className="text-3xl font-semibold text-white">8</p>
                <p className="mt-1 text-sm text-white/70">module aplicate</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">1 la 1</p>
                <p className="mt-1 text-sm text-white/70">format personalizat</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">2 luni</p>
                <p className="mt-1 text-sm text-white/70">ritm sustenabil</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionBadge>Provocarea</SectionBadge>
            <SectionIntro title={programPageContent.problem.title} />
          </div>
          <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
            {programPageContent.problem.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro title={programPageContent.need.title} description={programPageContent.need.description} />
      </Section>

      <Section tone="navy">
        <SectionIntro
          eyebrow="Cei 3 piloni"
          title={programPageContent.pillars.title}
          description="Programul nu este o colecție de module puse la rând, ci o progresie logică: de la cine ești, la cum conduci și la ce fel de lider devii mai departe."
        />
        <div className="mt-10">
          <StepCards items={programPageContent.pillars.items} dark />
        </div>
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Structura completă"
          title="Cele 8 module ale programului"
          description="Fiecare modul rezolvă o problemă reală pe care aproape orice manager la început o întâlnește mai devreme sau mai târziu."
        />
        <div className="mt-10">
          <NumberedModuleGrid items={programPageContent.modules} />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <SectionBadge>După program</SectionBadge>
            <SectionIntro title={programPageContent.outcome.title} />
            <div className="mt-6 space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
              {programPageContent.outcome.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-[#d8dee9] bg-white p-7 shadow-[0_26px_70px_-50px_rgba(20,33,60,0.35)] sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8711a]">Rezultatul urmărit</p>
            <p className="mt-5 font-serif text-[1.9rem] leading-tight text-[#14213c]">{programPageContent.outcome.quote}</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-[32px] border border-[#d8dee9] bg-white p-7 shadow-[0_26px_70px_-50px_rgba(20,33,60,0.35)] sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8711a]">De ce 1 la 1</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-[1.05] text-[#14213c]">{programPageContent.oneToOne.title}</h2>
            <p className="mt-5 text-base leading-8 text-[#52627a] sm:text-lg">{programPageContent.oneToOne.description}</p>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-[#d8dee9] bg-[#14213c] text-white shadow-[0_32px_70px_-52px_rgba(20,33,60,0.7)]">
            <div
              className="aspect-[16/10] w-full"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20,33,60,0.18), rgba(20,33,60,0.5)), url(${brandAssets.heroBackground})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f5b37e]">De ce Florin</p>
              <h2 className="mt-4 font-serif text-[2rem] leading-[1.05]">{programPageContent.florin.title}</h2>
              <p className="mt-5 text-base leading-8 text-white/76 sm:text-lg">{programPageContent.florin.description}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="Potrivire"
          title={programPageContent.audience.title}
          description={programPageContent.audience.description}
        />
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Participanți"
          title="Ce spun participanții"
          description="Am selectat exemple care evidențiază exact tipul de transformare pe care programul îl urmărește: mai multă claritate, delegare reală și mai puțină oboseală mentală."
        />
        <div className="mt-10">
          <TestimonialGrid items={programPageContent.testimonials} />
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="FAQ"
          title="Întrebări frecvente despre program"
          description="Aici am păstrat răspunsurile cele mai utile înainte de decizia de înscriere, cu aceeași claritate pe desktop și pe mobil."
        />
        <div className="mt-10">
          <FAQBlock items={programPageContent.faqs} />
        </div>
      </Section>

      <Section>
        <FinalBanner
          title={programPageContent.finalCta.title}
          description={programPageContent.finalCta.description}
          ctas={[programPageContent.finalCta.cta]}
        />
      </Section>
    </PageShell>
  );
}
