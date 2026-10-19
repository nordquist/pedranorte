import Link from "next/link";
import type { Service } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

/** Figma 07 Components / Service Card (Default | Hover). The whole card is the link. */
export function ServiceCard({ service, href, linkLabel }: { service: Service; href: string; linkLabel: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col items-start gap-lg rounded-sm border border-border-subtle bg-bg-surface p-xl transition-colors duration-200 hover:border-accent-default hover:bg-bg-elevated"
    >
      <Icon name={service.icon} size={32} className="text-accent-default" />
      <h3 className="type-h4 text-text-primary">{service.title}</h3>
      <p className="type-body-s text-text-secondary">{service.summary}</p>
      <span className="mt-auto inline-flex items-center gap-sm py-sm pr-lg type-button-m text-text-primary transition-colors group-hover:text-accent-default">
        {linkLabel}
        <Icon name="arrow-right" size={16} />
      </span>
    </Link>
  );
}
