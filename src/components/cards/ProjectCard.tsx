import Link from "next/link";
import type { Project } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

/** Figma 07 Components / Project Card (Default | Hover: title and arrow turn sand). */
export function ProjectCard({ project, href }: { project: Project; href: string }) {
  return (
    <Link href={href} className="group flex flex-col gap-md rounded-sm">
      <Photo
        image={project.image}
        sizes="(min-width: 1024px) 410px, (min-width: 768px) 50vw, 100vw"
        className="h-[300px] w-full"
      />
      <p className="type-eyebrow text-accent-default">{project.category}</p>
      <div className="flex items-center gap-sm">
        <h3 className="flex-1 type-h4 text-text-primary transition-colors group-hover:text-accent-default">
          {project.title}
        </h3>
        <Icon name="arrow-up-right" className="shrink-0 text-icon-default transition-colors group-hover:text-accent-default" />
      </div>
      <p className="type-body-s text-text-muted">{project.meta}</p>
    </Link>
  );
}
