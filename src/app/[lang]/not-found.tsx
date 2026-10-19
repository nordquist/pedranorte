import { lang } from "next/root-params";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getSite } from "@/content/repository";
import { hrefFor } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const value = await lang();
  const locale = isLocale(value) ? value : defaultLocale;
  const { notFound } = await getSite(locale);

  return (
    <section className="flex min-h-[70vh] items-end pt-[72px] xl:pt-[88px]">
      <div className="container-page flex flex-col items-start gap-lg py-3xl lg:py-5xl">
        <p className="type-eyebrow text-accent-default">{notFound.eyebrow}</p>
        <h1 className="type-mobile-h1 text-text-primary lg:type-display-l">{notFound.title}</h1>
        <p className="max-w-[640px] type-body-m text-text-secondary lg:type-body-l">{notFound.description}</p>
        <ButtonLink href={hrefFor(locale, notFound.cta)} withIcon>
          {notFound.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
