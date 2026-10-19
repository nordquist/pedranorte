import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { SiteContent } from "@/content/types";
import { hrefFor } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Figma 07 Components / Navbar. Transparent and absolutely positioned so it sits over
 * the hero photograph of every page (Desktop 88 px, Mobile 72 px).
 */
export function Navbar({ locale, site }: { locale: Locale; site: SiteContent }) {
  const items = site.nav.map((link) => ({ label: link.label, href: hrefFor(locale, link) }));
  const cta = { label: site.quoteCta.label, href: hrefFor(locale, site.quoteCta) };

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-border-subtle">
      <div className="container-page flex h-[72px] items-center justify-between gap-lg xl:h-[88px]">
        <Logo href={pathFor(locale, "home")} label={site.brand.homeLink} alt={site.brand.logoAlt} compact className="relative z-50" />

        <nav aria-label={site.menu.main} className="hidden xl:block">
          <NavLinks items={items} className="flex items-center gap-2xl" />
        </nav>

        <div className="flex items-center gap-md xl:gap-lg">
          <LanguageSwitch locale={locale} label={site.menu.language} />
          <div className="hidden xl:block">
            <ButtonLink href={cta.href} variant="secondary" size="m">
              {cta.label}
            </ButtonLink>
          </div>
          <MobileMenu locale={locale} items={items} cta={cta} labels={site.menu} />
        </div>
      </div>
    </header>
  );
}
