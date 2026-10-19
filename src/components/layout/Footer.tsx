import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Company, NavLink, Service, SiteContent } from "@/content/types";
import { hrefFor, isExternal } from "@/lib/links";
import { fill } from "@/lib/text";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

interface FooterProps {
  locale: Locale;
  site: SiteContent;
  services: Service[];
  company: Company;
}

const linkClass = "type-body-s rounded-sm text-text-secondary transition-colors hover:text-text-primary";

function FooterColumn({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="type-eyebrow text-text-muted">{title}</h2>
      <ul className="mt-sm flex flex-col gap-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ locale, link }: { locale: Locale; link: NavLink }) {
  if (isExternal(link)) {
    return (
      <li>
        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {link.label}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={hrefFor(locale, link)} className={linkClass}>
        {link.label}
      </Link>
    </li>
  );
}

/** Figma 08–11 Website / Section Footer. */
export function Footer({ locale, site, services, company }: FooterProps) {
  const { footer } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-page pt-3xl pb-xl lg:pt-4xl lg:pb-2xl">
      <div className="container-page flex flex-col gap-2xl lg:gap-3xl">
        <div className="grid grid-cols-2 gap-x-lg gap-y-2xl lg:flex lg:gap-4xl">
          <div className="col-span-2 flex flex-col gap-sm lg:w-[380px] lg:shrink-0 lg:gap-md">
            <Logo href={pathFor(locale, "home")} label={site.brand.homeLink} alt={site.brand.logoAlt} />
            <p className="type-h5 text-text-primary lg:type-h4">{footer.tagline}</p>
            <p className="type-caption text-text-muted">
              {fill(footer.legalEntityNote, { legalEntity: company.legalEntity })}
              {company.vatNumber && ` NIF ${company.vatNumber}.`}
            </p>
          </div>

          <FooterColumn title={footer.navigationTitle} className="lg:flex-1">
            {site.nav.map((link) => (
              <FooterLink key={link.route} locale={locale} link={link} />
            ))}
          </FooterColumn>

          <FooterColumn title={footer.servicesTitle} className="lg:flex-1">
            {services.map((service) => (
              <FooterLink
                key={service.slug}
                locale={locale}
                link={{ label: service.shortTitle, route: "services", slug: service.slug }}
              />
            ))}
          </FooterColumn>

          <FooterColumn title={footer.legalTitle} className="col-span-2 lg:flex-1">
            {footer.legal.map((link) => (
              <FooterLink key={link.label} locale={locale} link={link} />
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col-reverse gap-md border-t border-border-subtle pt-lg lg:flex-row lg:items-center lg:justify-between">
          <p className="type-caption text-text-muted">{fill(footer.copyright, { year })}</p>
          <LanguageSwitch locale={locale} label={site.menu.language} />
        </div>
      </div>
    </footer>
  );
}
