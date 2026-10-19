import Image from "next/image";
import type { PageHero as PageHeroContent } from "@/content/types";

/**
 * Hero for sub-pages: same treatment as the home hero (full-bleed photo, graphite
 * overlay, navbar on top) at a reduced height.
 */
export function PageHero({ hero }: { hero: PageHeroContent }) {
  return (
    <section className="relative flex min-h-[480px] flex-col overflow-hidden lg:min-h-[560px]">
      <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-bg-page/40 via-bg-page/80 to-bg-page/95 lg:bg-linear-to-r lg:from-bg-page/95 lg:via-bg-page/70 lg:to-bg-page/40" />

      <div className="relative container-page flex flex-1 flex-col justify-end gap-md pt-[72px] pb-3xl lg:gap-lg lg:pt-[88px] lg:pb-4xl">
        {hero.eyebrow && <p className="type-eyebrow text-accent-default">{hero.eyebrow}</p>}
        <h1 className="max-w-[900px] type-mobile-h1 text-text-primary lg:type-display-l">{hero.title}</h1>
        {hero.description && <p className="max-w-[640px] type-body-m text-text-secondary lg:type-body-l">{hero.description}</p>}
      </div>
    </section>
  );
}
