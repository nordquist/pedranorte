import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { HomeContent } from "@/content/types";
import { hrefFor } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Figma 08/10 Website / Section Hero: full-bleed P01 with graphite overlays. */
export function HomeHero({ locale, hero }: { locale: Locale; hero: HomeContent["hero"] }) {
  return (
    <section className="relative flex min-h-[780px] flex-col overflow-hidden lg:min-h-[880px]">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] lg:object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-bg-page/25 from-20% via-bg-page/88 via-75% to-bg-page/97 lg:hidden" />
      <div aria-hidden="true" className="absolute inset-0 hidden bg-linear-to-r from-bg-page/95 via-bg-page/55 via-55% to-bg-page/20 lg:block" />
      <div aria-hidden="true" className="absolute inset-0 hidden bg-linear-to-b from-bg-page/0 from-45% to-bg-page/92 lg:block" />

      <div className="relative container-page flex flex-1 flex-col justify-end gap-md pt-[72px] pb-xl lg:gap-lg lg:pt-[88px] lg:pb-4xl">
        <p className="type-eyebrow text-accent-default">{hero.eyebrow}</p>
        <h1 className="type-mobile-display text-text-primary lg:type-display-xl">
          <span className="block font-light">{hero.titleLight}</span>
          <span className="block">{hero.titleBold}</span>
        </h1>
        <p className="max-w-[560px] type-body-m text-text-secondary lg:type-body-l">{hero.body}</p>
        <div className="flex flex-col gap-sm sm:flex-row sm:gap-md">
          <ButtonLink href={hrefFor(locale, hero.primaryCta)} withIcon className="w-full sm:w-auto">
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hrefFor(locale, hero.secondaryCta)} variant="secondary" className="w-full sm:w-auto">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>

        <div className="mt-3xl hidden items-center justify-between border-t border-border-subtle pt-lg lg:flex">
          <ul className="flex gap-3xl">
            {hero.highlights.map((highlight, index) => (
              <li key={highlight} className="flex items-center gap-sm">
                <span className="type-label-s text-accent-default">{String(index + 1).padStart(2, "0")}</span>
                <span className="type-h5 text-text-primary">{highlight}</span>
              </li>
            ))}
          </ul>
          <Link href="#sobre" className="flex items-center gap-xs rounded-sm type-nav text-text-secondary transition-colors hover:text-text-primary">
            {hero.discover}
            <Icon name="chevron-down" />
          </Link>
        </div>
      </div>
    </section>
  );
}
