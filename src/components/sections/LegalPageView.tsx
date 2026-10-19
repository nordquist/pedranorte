import type { Company, LegalPage } from "@/content/types";
import { fill } from "@/lib/text";

/** Text page for legal content: plain header (no photo) and readable measure. */
export function LegalPageView({ page, company }: { page: LegalPage; company: Company }) {
  const values = {
    legalEntity: company.legalEntity,
    email: company.email,
    address: `${company.address.street}, ${company.address.postalCode} ${company.address.city}`,
  };

  return (
    <article className="pt-[72px] xl:pt-[88px]">
      <div className="container-page">
        <div className="flex max-w-measure flex-col gap-2xl py-3xl lg:py-5xl">
        <header className="flex flex-col gap-md">
          <h1 className="type-mobile-h1 text-text-primary lg:type-h1">{page.title}</h1>
          <p className="type-caption text-text-muted">{page.updated}</p>
          <p className="rounded-sm border border-accent-default px-md py-sm type-body-s text-accent-default">{page.notice}</p>
        </header>
        {page.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-md">
            <h2 className="type-mobile-h3 text-text-primary lg:type-h3">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-body-m text-text-secondary">
                {fill(paragraph, values)}
              </p>
            ))}
          </section>
        ))}
        </div>
      </div>
    </article>
  );
}
