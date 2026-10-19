import type { Locale } from "@/i18n/config";
import type { HomeContent } from "@/content/types";
import { hrefFor } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Figma 08/10 Website / Section About. The CTA moves below the photo on mobile. */
export function AboutSection({ locale, about }: { locale: Locale; about: HomeContent["about"] }) {
  const cta = (visibility: string) => (
    <div className={visibility}>
      <ButtonLink href={hrefFor(locale, about.cta)} variant="secondary" className="w-full lg:w-auto">
        {about.cta.label}
      </ButtonLink>
    </div>
  );

  return (
    <Section id="sobre">
      <div className="flex flex-col gap-xl lg:flex-row lg:items-center lg:gap-4xl">
        <div className="flex flex-1 flex-col items-start gap-xl">
          <SectionHeader {...about.heading} className="max-w-none" />
          <ul className="flex flex-col gap-sm lg:gap-md">
            {about.points.map((point) => (
              <li key={point} className="flex items-center gap-sm type-body-s text-text-primary lg:type-body-m">
                <Icon name="check" className="shrink-0 text-accent-default" />
                {point}
              </li>
            ))}
          </ul>
          {cta("hidden lg:block")}
        </div>
        <Photo
          image={about.image}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-[420px] w-full lg:h-[680px] lg:w-[560px] lg:shrink-0"
          imageClassName="object-[center_70%]"
        />
        {cta("lg:hidden")}
      </div>
    </Section>
  );
}
