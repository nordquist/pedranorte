import { ButtonLink } from "@/components/ui/Button";

/** Figma 08 Website / Service CTA Card (accent/subtle surface). */
export function ServiceCtaCard({ title, description, cta }: { title: string; description: string; cta: { label: string; href: string } }) {
  return (
    <div className="flex h-full flex-col items-start justify-between gap-lg rounded-sm bg-accent-subtle p-lg lg:p-xl">
      <div className="flex flex-col gap-md lg:gap-sm">
        <h3 className="type-mobile-h3 text-text-primary lg:type-h3">{title}</h3>
        <p className="type-body-s text-text-secondary lg:type-body-m">{description}</p>
      </div>
      <ButtonLink href={cta.href} size="m" withIcon>
        {cta.label}
      </ButtonLink>
    </div>
  );
}
