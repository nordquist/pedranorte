import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { HomeContent, SectionHeading, Service } from "@/content/types";
import { hrefFor } from "@/lib/links";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ServiceCtaCard } from "@/components/cards/ServiceCtaCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ServicesSectionProps {
  locale: Locale;
  services: Service[];
  ctaCard: HomeContent["services"]["ctaCard"];
  learnMore: string;
  heading?: SectionHeading;
}

/** Figma 08/10 Website / Section Services: 3-column grid ending with the CTA card. */
export function ServicesSection({ locale, services, ctaCard, learnMore, heading }: ServicesSectionProps) {
  return (
    <Section tone="surface" id="servicos">
      <div className="flex flex-col gap-xl lg:gap-3xl">
        {heading && <SectionHeader {...heading} align="center" />}
        <ul className="grid gap-md md:grid-cols-2 lg:grid-cols-3 lg:gap-lg">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} href={pathFor(locale, "services", service.slug)} linkLabel={learnMore} />
            </li>
          ))}
          <li>
            <ServiceCtaCard
              title={ctaCard.title}
              description={ctaCard.description}
              cta={{ label: ctaCard.cta.label, href: hrefFor(locale, ctaCard.cta) }}
            />
          </li>
        </ul>
      </div>
    </Section>
  );
}
