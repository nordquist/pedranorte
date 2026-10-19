import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { InternalLink, Project, SectionHeading } from "@/content/types";
import { hrefFor } from "@/lib/links";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ProjectsSectionProps {
  locale: Locale;
  projects: Project[];
  heading?: SectionHeading;
  cta?: InternalLink;
  tone?: "page" | "surface";
}

/** Figma 08/10 Website / Section Projects. The "view all" link moves below the cards on mobile. */
export function ProjectsSection({ locale, projects, heading, cta, tone = "surface" }: ProjectsSectionProps) {
  const ctaLink = (visibility: string) =>
    cta && (
      <div className={visibility}>
        <ButtonLink href={hrefFor(locale, cta)} variant="ghost" size="m" withIcon>
          {cta.label}
        </ButtonLink>
      </div>
    );

  return (
    <Section tone={tone} id="projetos">
      <div className="flex flex-col gap-2xl lg:gap-3xl">
        {heading && (
          <div className="flex items-end justify-between gap-lg">
            <SectionHeader {...heading} />
            {ctaLink("hidden shrink-0 lg:block")}
          </div>
        )}
        <ul className="grid gap-2xl md:grid-cols-2 lg:grid-cols-3 lg:gap-lg">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} href={pathFor(locale, "projects", project.slug)} />
            </li>
          ))}
        </ul>
        {ctaLink("lg:hidden")}
      </div>
    </Section>
  );
}
