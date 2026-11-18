import { HomeContent } from "@/components/manus/HomeContent";
import { PageShell } from "@/components/manus/PageShell";
import { FAQBlock } from "@/components/manus/FAQBlock";
import { homepageContent } from "@/components/content/siteContent";

export default function Home() {
  return (
    <PageShell>
      <HomeContent>
        <FAQBlock items={homepageContent.faqs} />
      </HomeContent>
    </PageShell>
  );
}
