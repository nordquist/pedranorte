import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Company, ImageAsset, QuoteFormContent, SectionHeading, Service, SiteContent } from "@/content/types";
import { ContactDetails } from "@/components/cards/ContactDetails";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ContactSectionProps {
  locale: Locale;
  company: Company;
  labels: SiteContent["contact"];
  form: QuoteFormContent;
  services: Service[];
  image: ImageAsset;
  heading?: SectionHeading;
}

/**
 * Figma 08/10 Website / Section Contact: company details + "Pedido de orçamento" form.
 * The map photo (P08) sits under the details on desktop and after the form on mobile.
 */
export function ContactSection({ locale, company, labels, form, services, image, heading }: ContactSectionProps) {
  const photo = (className: string) => (
    <Photo image={image} sizes="(min-width: 1024px) 544px, 100vw" className={className} />
  );

  return (
    <Section id="contactos">
      <div className="flex flex-col gap-2xl lg:flex-row lg:items-start lg:gap-4xl">
        <div className="flex flex-1 flex-col gap-2xl">
          {heading && <SectionHeader {...heading} className="max-w-none" />}
          <ContactDetails company={company} labels={labels} />
          {photo("hidden h-[260px] w-full lg:block")}
        </div>

        <div id="pedido" className="rounded-sm border border-border-subtle bg-bg-surface p-lg lg:w-[640px] lg:shrink-0 lg:p-2xl">
          <QuoteForm
            locale={locale}
            content={form}
            workTypes={services.map((s) => ({ value: s.slug, label: s.title }))}
            privacyHref={pathFor(locale, "privacy")}
          />
        </div>

        {photo("h-[200px] w-full lg:hidden")}
      </div>
    </Section>
  );
}
