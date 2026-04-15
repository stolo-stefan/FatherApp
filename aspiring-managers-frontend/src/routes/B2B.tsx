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
import { b2bPageContent, brandAssets } from "@/components/content/siteContent";

export default function B2B() {
  return (
    <PageShell>
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <SectionBadge>B2B / companii</SectionBadge>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.25rem] leading-[0.96] sm:text-[3rem] lg:text-[4.2rem]">
              {b2bPageContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {b2bPageContent.hero.description}
            </p>
            <div className="mt-8 w-full sm:w-auto">
              <SiteButton item={b2bPageContent.hero.cta} fullWidth className="sm:w-auto sm:justify-center" />
              {b2bPageContent.hero.cta.note ? (
                <p className="mt-3 text-sm text-white/70">{b2bPageContent.hero.cta.note}</p>
              ) : null}
            </div>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-white/12 bg-white/8 shadow-[0_40px_80px_-52px_rgba(0,0,0,0.55)]">
            <div
              className="aspect-[16/10] w-full"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20,33,60,0.18), rgba(20,33,60,0.52)), url(${brandAssets.b2bBackground})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="grid gap-3 p-6 sm:grid-cols-3 sm:p-8">
              <div>
                <p className="text-3xl font-semibold text-white">30 / 60</p>
                <p className="mt-1 text-sm text-white/70">zile pentru măsurarea impactului</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">100%</p>
                <p className="mt-1 text-sm text-white/70">program personalizat pe audit</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-white">Direct</p>
                <p className="mt-1 text-sm text-white/70">livrat de Florin Stoleriu</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
          <div>
            <SectionBadge>Problema de business</SectionBadge>
            <SectionIntro title={b2bPageContent.problem.title} />
          </div>
          <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
            {b2bPageContent.problem.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro title={b2bPageContent.whyStandardFails.title} description={b2bPageContent.whyStandardFails.description} />
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Proces"
          title={b2bPageContent.process.title}
          description="Programul nu pornește dintr-un catalog. Pornește din întrebări bune, audit și un design de intervenție făcut pe realitatea companiei voastre."
        />
        <div className="mt-10">
          <StepCards items={b2bPageContent.process.steps} />
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionBadge>Ce primiți concret</SectionBadge>
            <SectionIntro title={b2bPageContent.outcomes.title} />
            <div className="mt-6 space-y-5 text-base leading-8 text-white/78 sm:text-lg">
              {b2bPageContent.outcomes.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div
            className="min-h-[320px] rounded-[32px] border border-white/12 bg-white/8"
            style={{
              backgroundImage: `linear-gradient(155deg, rgba(20,33,60,0.18), rgba(20,33,60,0.54)), url(${brandAssets.b2bBackground})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Module disponibile"
          title="Construim combinația potrivită pentru echipa voastră"
          description="Modulele pot fi livrate separat sau combinate într-un program complet. Criteriul nu este catalogul, ci nevoia reală a companiei."
        />
        <div className="mt-10 md:max-w-5xl">
          <NumberedModuleGrid items={b2bPageContent.modules} />
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="Participanți"
          title="Ce spun cei care au trecut prin program"
          description="Selecția de mai jos urmărește aceeași promisiune centrală: mai multă claritate, instrumente concrete și efecte vizibile în comportament, nu doar satisfacție imediată."
        />
        <div className="mt-10">
          <TestimonialGrid items={b2bPageContent.testimonials} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-[32px] border border-[#d8dee9] bg-white p-7 shadow-[0_26px_70px_-50px_rgba(20,33,60,0.35)] sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e8711a]">De ce contează cine livrează</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-[1.05] text-[#14213c]">{b2bPageContent.florin.title}</h2>
            <p className="mt-5 text-base leading-8 text-[#52627a] sm:text-lg">{b2bPageContent.florin.description}</p>
          </div>
          <div className="rounded-[32px] border border-[#d8dee9] bg-[#14213c] p-7 text-white shadow-[0_26px_70px_-50px_rgba(20,33,60,0.58)] sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f5b37e]">Pentru ce companii</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-[1.05]">{b2bPageContent.companies.title}</h2>
            <p className="mt-5 text-base leading-8 text-white/78 sm:text-lg">{b2bPageContent.companies.description}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="FAQ"
          title="Întrebări frecvente despre formatul B2B"
          description="Am păstrat în prim-plan întrebările despre structură, facturare, livrare online și măsurarea impactului, pentru că acestea cântăresc cel mai mult într-o decizie de business."
        />
        <div className="mt-10">
          <FAQBlock items={b2bPageContent.faqs} />
        </div>
      </Section>

      <Section>
        <FinalBanner
          title={b2bPageContent.finalCta.title}
          description={b2bPageContent.finalCta.description}
          ctas={[b2bPageContent.finalCta.cta]}
          tone="amber"
        />
      </Section>
    </PageShell>
  );
}
