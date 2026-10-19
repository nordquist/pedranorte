import type { Company } from "@/content/types";
import { LOGO_IMAGE, SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

/** schema.org GeneralContractor (a LocalBusiness) for rich results and local search. */
export function OrganizationJsonLd({ company, description }: { company: Company; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.brand,
    legalName: company.legalEntity,
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_IMAGE}`,
    image: `${SITE_URL}${SOCIAL_IMAGE.src}`,
    description,
    email: company.email,
    telephone: company.phone,
    ...(company.vatNumber && { vatID: company.vatNumber }),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.countryCode,
    },
    areaServed: { "@type": "Country", name: company.address.country },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
