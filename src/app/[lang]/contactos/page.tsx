import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getCompany, getHome, getPages, getQuoteForm, getServices, getSite } from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";

export async function generateMetadata({ params }: PageProps<"/[lang]/contactos">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const { contact } = await getPages(locale);
  return pageMetadata({ locale, route: "contact", ...contact.meta });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contactos">) {
  const locale = (await params).lang as Locale;
  const [pages, home, site, form, services, company] = await Promise.all([
    getPages(locale),
    getHome(locale),
    getSite(locale),
    getQuoteForm(locale),
    getServices(locale),
    getCompany(),
  ]);

  return (
    <>
      <PageHero hero={pages.contact.hero} />
      <ContactSection
        locale={locale}
        company={company}
        labels={site.contact}
        form={form}
        services={services}
        image={home.contact.image}
      />
    </>
  );
}
