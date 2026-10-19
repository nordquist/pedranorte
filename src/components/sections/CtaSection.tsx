import type { Locale } from "@/i18n/config";
import type { HomeContent } from "@/content/types";
import { hrefFor } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** Figma 08/10 Website / Section CTA on bg/elevated. */
export function CtaSection({ locale, cta }: { locale: Locale; cta: HomeContent["cta"] }) {
  return (
    <Section tone="elevated">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-lg md:items-center md:text-center lg:gap-xl">
        <h2 className="type-mobile-h1 text-text-primary lg:type-display-l">
          <span className="font-light">{cta.titleLight}</span> {cta.titleBold}
        </h2>
        <p className="max-w-[640px] type-body-m text-text-secondary lg:type-body-l">{cta.body}</p>
        <div className="flex flex-col gap-lg sm:flex-row sm:gap-md">
          <ButtonLink href={hrefFor(locale, cta.primaryCta)} withIcon className="w-full sm:w-auto">
            {cta.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hrefFor(locale, cta.secondaryCta)} variant="secondary" className="w-full sm:w-auto">
            {cta.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
