import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getHome, getProject, getProjects, getSite } from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects(defaultLocale);
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const project = await getProject(locale, slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    route: "projects",
    segments: [slug],
    title: project.title,
    description: project.summary,
  });
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projetos/[slug]">) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const [project, projects, home, site] = await Promise.all([
    getProject(locale, slug),
    getProjects(locale),
    getHome(locale),
    getSite(locale),
  ]);
  if (!project) notFound();

  return (
    <>
      <PageHero hero={{ eyebrow: project.category, title: project.title, description: project.summary, image: project.image }} />
      <Section>
        <div className="flex flex-col gap-2xl lg:flex-row lg:items-start lg:gap-4xl">
          <div className="flex flex-1 flex-col items-start gap-xl">
            <Badge label={site.ui.sampleProject} />
            <h2 className="type-mobile-h3 text-text-primary lg:type-h3">{site.ui.scope}</h2>
            <CheckList items={project.scope} />
          </div>
          <Photo
            image={project.image}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="aspect-[3/2] w-full lg:w-[640px] lg:shrink-0"
          />
        </div>
      </Section>
      <ProjectsSection
        locale={locale}
        projects={projects.filter((p) => p.slug !== project.slug)}
        heading={{ eyebrow: home.projects.heading.eyebrow, title: site.ui.allProjects }}
        cta={home.projects.cta}
      />
      <CtaSection locale={locale} cta={home.cta} />
    </>
  );
}
