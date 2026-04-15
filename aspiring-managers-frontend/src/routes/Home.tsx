import {
  AmbientPanel,
  EditorialCard,
  FAQBlock,
  FinalBanner,
  HeroFrame,
  PageShell,
  QuoteBlock,
  Section,
  SectionBadge,
  SectionIntro,
  SiteButton,
  StepCards,
  TestimonialGrid,
} from "@/components/MarketingSite";
import { brandAssets, homepageContent } from "@/components/content/siteContent";

export default function Home() {
  return (
    <PageShell>
      <HeroFrame
        title={homepageContent.hero.title}
        description={homepageContent.hero.description}
        ctas={homepageContent.hero.ctas}
        stats={homepageContent.hero.stats}
        imageSlot={
          <div className="space-y-5">
            <AmbientPanel
              imageUrl={brandAssets.florinPortrait}
              imageSize="contain"
              imagePosition="center top"
              imageBackgroundClass="bg-[#eef2f8]"
              label="Leadership aplicat"
              title="Claritate, structură și decizii mai bune"
              description="Un format construit pentru managerii care trebuie să livreze prin oameni, nu doar prin propriul efort. Designul rămâne curat pe mobil, iar mesajul principal rămâne mereu vizibil."
              dark
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 text-white backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f5b37e]">Decizii dificile</p>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  Delegare, feedback, tensiuni în echipă, relația cu top managementul și ieșirea din modul reactiv.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/12 bg-white/8 p-5 text-white backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f5b37e]">Sprijin real</p>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  Fără teorie generică. Doar instrumente și contexte reale, explicate de cineva care a trecut prin ele.
                </p>
              </div>
            </div>
          </div>
        }
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <SectionBadge>Problema reală</SectionBadge>
            <SectionIntro title={homepageContent.problem.title} />
          </div>
          <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
            {homepageContent.problem.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <SectionBadge>Despre Florin</SectionBadge>
            <SectionIntro title={homepageContent.aboutFlorin.title} />
            <div className="space-y-5 text-base leading-8 text-[#52627a] sm:text-lg">
              {homepageContent.aboutFlorin.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <AmbientPanel
              imageUrl={brandAssets.heroBackground}
              label="Experiență distilată"
              title="Din top management, în mentorat aplicat"
              description="Experiența acumulată în echipe mari, companii diferite și contexte dificile este transformată aici în claritate și instrumente aplicabile."
            />
            <QuoteBlock quote={homepageContent.aboutFlorin.quote} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Servicii"
          title={homepageContent.services.title}
          description="Alegi nivelul de profunzime potrivit pentru etapa în care te afli acum: o sesiune punctuală, un program complet sau un format dedicat companiei tale."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {homepageContent.services.items.map((service, index) => (
            <EditorialCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={service.href}
              cta={service.cta}
              accent={index % 2 === 0 ? "orange" : "navy"}
            />
          ))}
        </div>
      </Section>

      <Section tone="navy" id="quiz">
        <SectionIntro
          eyebrow="Proces"
          title={homepageContent.process.title}
          description="Nu vindem tuturor același lucru. Mai întâi clarificăm unde ești, apoi alegem formatul potrivit pentru tine."
        />
        <div className="mt-10">
          <StepCards items={homepageContent.process.steps} dark />
        </div>
        <div className="mt-8 flex justify-start">
          <SiteButton item={homepageContent.process.cta} fullWidth className="sm:w-auto sm:justify-center" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AmbientPanel
            imageUrl={brandAssets.mentorshipAbstract}
            label="Pentru cine este"
            title="Primii ani de management sunt decisivi"
            description="Dacă vii dintr-un rol de specialist și acum conduci oameni pentru prima dată, ai nevoie de mai mult decât informație. Ai nevoie de orientare, structură și repere clare."
          />
          <div>
            <SectionBadge>Potrivire</SectionBadge>
            <SectionIntro title={homepageContent.audience.title} />
            <p className="mt-6 text-base leading-8 text-[#52627a] sm:text-lg">{homepageContent.audience.description}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionIntro
          eyebrow="Încredere socială"
          title={homepageContent.testimonials.title}
          description="Rezultatele nu se văd doar în starea de spirit, ci în conversații dificile gestionate mai bine, în structură de lucru și în senzația că ziua nu te mai conduce ea pe tine."
        />
        <div className="mt-10">
          <TestimonialGrid items={homepageContent.testimonials.items} />
        </div>
      </Section>

      <Section>
        <SectionIntro
          eyebrow="Întrebări frecvente"
          title="Întrebări pe care le au managerii înainte să înceapă"
          description="Am păstrat răspunsurile concise și clare, astfel încât experiența pe mobil să rămână ușor de parcurs și de scanat."
        />
        <div className="mt-10">
          <FAQBlock items={homepageContent.faqs} />
        </div>
      </Section>

      <Section tone="light" id="discutie-gratuita">
        <FinalBanner
          title={homepageContent.finalCta.title}
          description={homepageContent.finalCta.description}
          ctas={homepageContent.finalCta.ctas}
          note={homepageContent.finalCta.note}
        />
      </Section>
    </PageShell>
  );
}
