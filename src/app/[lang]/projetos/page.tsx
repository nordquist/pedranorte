import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getHome, getPages, getProjects } from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const { projects } = await getPages(locale);
  return pageMetadata({ locale, route: "projects", ...projects.meta });
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projetos">) {
  const locale = (await params).lang as Locale;
  const [pages, home, projects] = await Promise.all([getPages(locale), getHome(locale), getProjects(locale)]);

  return (
    <>
      <PageHero hero={pages.projects.hero} />
      <ProjectsSection locale={locale} projects={projects} tone="page" />
      <CtaSection locale={locale} cta={home.cta} />
    </>
  );
}
