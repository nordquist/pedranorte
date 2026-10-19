import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getCompany, getHome, getPages, getPrinciples } from "@/content/repository";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/text";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { CheckList } from "@/components/ui/CheckList";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[lang]/sobre">): Promise<Metadata> {
  const locale = (await params).lang as Locale;
  const { about } = await getPages(locale);
  return pageMetadata({ locale, route: "about", ...about.meta });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre">) {
  const locale = (await params).lang as Locale;
  const [pages, home, principles, company] = await Promise.all([
    getPages(locale),
    getHome(locale),
    getPrinciples(locale),
    getCompany(),
  ]);
  const { about } = pages;

  return (
    <>
      <PageHero hero={about.hero} />
      <Section>
        <div className="flex flex-col gap-2xl lg:flex-row lg:items-center lg:gap-4xl">
          <div className="flex max-w-measure flex-1 flex-col gap-xl">
            {about.body?.map((paragraph) => (
              <p key={paragraph} className="type-body-m text-text-secondary lg:type-body-l">
                {paragraph}
              </p>
            ))}
            <CheckList items={home.about.points} />
            <p className="type-caption text-text-muted">{fill(about.teamNote, { legalEntity: company.legalEntity })}</p>
          </div>
          <Photo
            image={home.hero.image}
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[4/5] w-full lg:w-[520px] lg:shrink-0"
            imageClassName="object-[75%_center]"
          />
        </div>
      </Section>
      <PrinciplesSection heading={about.valuesHeading} principles={principles} image={home.principles.image} />
      <CtaSection locale={locale} cta={home.cta} />
    </>
  );
}
