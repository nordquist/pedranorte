import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getHome, getPages, getPrinciples, getProcessSteps } from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export async function generateMetadata({ params }: PageProps<"/[lang]/processo">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const { process } = await getPages(locale);
  return pageMetadata({ locale, route: "process", ...process.meta });
}

export default async function ProcessPage({ params }: PageProps<"/[lang]/processo">) {
  const locale = (await params).lang as Locale;
  const [pages, home, steps, principles] = await Promise.all([
    getPages(locale),
    getHome(locale),
    getProcessSteps(locale),
    getPrinciples(locale),
  ]);

  return (
    <>
      <PageHero hero={pages.process.hero} />
      <ProcessSection steps={steps} showDetails />
      <PrinciplesSection heading={home.principles.heading} principles={principles} image={home.principles.image} />
      <CtaSection locale={locale} cta={home.cta} />
    </>
  );
}
