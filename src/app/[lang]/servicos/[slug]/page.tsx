import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, type Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import { getHome, getPages, getService, getServices, getSite } from "@/content/repository";
import { hrefFor } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices(defaultLocale);
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/servicos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const service = await getService(locale, slug);
  if (!service) return {};
  return pageMetadata({
    locale,
    route: "services",
    segments: [slug],
    title: service.title,
    description: service.summary,
  });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/servicos/[slug]">) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const [service, services, pages, home, site] = await Promise.all([
    getService(locale, slug),
    getServices(locale),
    getPages(locale),
    getHome(locale),
    getSite(locale),
  ]);
  if (!service) notFound();

  return (
    <>
      <PageHero
        hero={{ eyebrow: pages.services.hero.eyebrow, title: service.title, description: service.summary, image: service.image }}
      />
      <Section>
        <div className="flex flex-col gap-3xl lg:flex-row lg:gap-4xl">
          <div className="flex max-w-measure flex-1 flex-col gap-2xl">
            <Icon name={service.icon} size={32} className="text-accent-default" />
            <p className="type-body-m text-text-secondary lg:type-body-l">{service.intro}</p>
            <div className="flex flex-col gap-lg">
              <h2 className="type-mobile-h3 text-text-primary lg:type-h3">{site.ui.includes}</h2>
              <CheckList items={service.includes} />
            </div>
            <ButtonLink href={hrefFor(locale, site.quoteCta)} withIcon className="self-start">
              {site.quoteCta.label}
            </ButtonLink>
          </div>

          <aside className="flex flex-col gap-md lg:w-[380px] lg:shrink-0">
            <h2 className="type-eyebrow text-text-muted">{site.ui.allServices}</h2>
            <ul className="flex flex-col border-t border-border-subtle">
              {services.map((item) => {
                const current = item.slug === service.slug;
                return (
                  <li key={item.slug} className="border-b border-border-subtle">
                    <Link
                      href={pathFor(locale, "services", item.slug)}
                      aria-current={current ? "page" : undefined}
                      className="group flex items-center gap-md py-md"
                    >
                      <Icon name={item.icon} className="shrink-0 text-accent-default" />
                      <span
                        className={
                          current
                            ? "flex-1 type-h5 text-accent-default"
                            : "flex-1 type-h5 text-text-primary transition-colors group-hover:text-accent-default"
                        }
                      >
                        {item.title}
                      </span>
                      <Icon name="arrow-right" size={20} className="shrink-0 text-icon-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Section>
      <CtaSection locale={locale} cta={home.cta} />
    </>
  );
}
