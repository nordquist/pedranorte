import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import {
  getCompany,
  getHome,
  getPrinciples,
  getProcessSteps,
  getProjects,
  getQuoteForm,
  getServices,
  getSite,
} from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const home = await getHome(locale);
  return pageMetadata({ locale, route: "home", ...home.meta, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = (await params).lang as Locale;
  const [home, site, services, projects, steps, principles, form, company] = await Promise.all([
    getHome(locale),
    getSite(locale),
    getServices(locale),
    getProjects(locale),
    getProcessSteps(locale),
    getPrinciples(locale),
    getQuoteForm(locale),
    getCompany(),
  ]);

  return (
    <>
      <OrganizationJsonLd company={company} description={home.meta.description} />
      <HomeHero locale={locale} hero={home.hero} />
      <AboutSection locale={locale} about={home.about} />
      <ServicesSection
        locale={locale}
        heading={home.services.heading}
        services={services}
        ctaCard={home.services.ctaCard}
        learnMore={site.ui.learnMore}
      />
      <ProcessSection heading={home.process.heading} steps={steps} />
      <ProjectsSection locale={locale} heading={home.projects.heading} projects={projects} cta={home.projects.cta} />
      <PrinciplesSection heading={home.principles.heading} principles={principles} image={home.principles.image} />
      <CtaSection locale={locale} cta={home.cta} />
      <ContactSection
        locale={locale}
        heading={home.contact.heading}
        company={company}
        labels={site.contact}
        form={form}
        services={services}
        image={home.contact.image}
      />
    </>
  );
}
