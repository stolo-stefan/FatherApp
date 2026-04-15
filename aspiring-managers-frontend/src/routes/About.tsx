import {
  BulletBeliefs,
  FinalBanner,
  PageShell,
  QuoteBlock,
  Section,
  SectionBadge,
  SectionIntro,
  SplitStory,
} from "@/components/MarketingSite";
import { aboutPageContent, brandAssets } from "@/components/content/siteContent";

export default function About() {
  return (
    <PageShell>
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.3rem] leading-[0.97] sm:text-[3rem] lg:text-[4.4rem]">
              {aboutPageContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {aboutPageContent.hero.description}
            </p>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-white/12 bg-white/6 shadow-[0_40px_80px_-52px_rgba(0,0,0,0.55)]">
            <div
              className="aspect-[16/10] w-full"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20,33,60,0.14), rgba(20,33,60,0.46)), url(${brandAssets.heroBackground})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f5b37e]">Experiență practică</p>
              <p className="mt-3 text-sm leading-7 text-white/76 sm:text-base">
                De la echipe locale la responsabilități de board și reorganizări dificile, experiența acumulată aici este baza pe care a fost construit Aspiring Managers.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SplitStory title={aboutPageContent.story.title} paragraphs={aboutPageContent.story.paragraphs} />
      </Section>

      <Section tone="muted">
        <SplitStory
          title={aboutPageContent.lessons.title}
          paragraphs={aboutPageContent.lessons.paragraphs}
          quote={aboutPageContent.lessons.quote}
        />
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionIntro title={aboutPageContent.mission.title} />
          </div>
          <p className="text-base leading-8 text-[#52627a] sm:text-lg">{aboutPageContent.mission.description}</p>
        </div>
      </Section>

      <Section tone="navy">
        <SectionIntro
          eyebrow=""
          title={aboutPageContent.beliefs.title}
          description="Aceste principii nu vin din citate motivaționale, ci din ani de management real, în roluri, companii și contexte foarte diferite."
        />
        <div className="mt-10">
          <BulletBeliefs items={aboutPageContent.beliefs.items} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            <SectionIntro title={aboutPageContent.future.title} />
            <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
              {aboutPageContent.future.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <QuoteBlock quote={aboutPageContent.future.signature} />
        </div>
      </Section>

      <Section>
        <FinalBanner
          title={aboutPageContent.cta.title}
          description={aboutPageContent.cta.description}
          ctas={[aboutPageContent.cta.cta]}
          tone="amber"
        />
      </Section>
    </PageShell>
  );
}
