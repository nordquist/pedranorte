import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getHome, getPages, getProcessSteps, getServices, getSite } from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export async function generateMetadata({ params }: PageProps<"/[lang]/servicos">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const { services } = await getPages(locale);
  return pageMetadata({ locale, route: "services", ...services.meta });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/servicos">) {
  const locale = (await params).lang as Locale;
  const [pages, home, site, services, steps] = await Promise.all([
    getPages(locale),
    getHome(locale),
    getSite(locale),
    getServices(locale),
    getProcessSteps(locale),
  ]);

  return (
    <>
      <PageHero hero={pages.services.hero} />
      <ServicesSection locale={locale} services={services} ctaCard={home.services.ctaCard} learnMore={site.ui.learnMore} />
      <ProcessSection heading={home.process.heading} steps={steps} />
      <CtaSection locale={locale} cta={home.cta} />
    </>
  );
}
