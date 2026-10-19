import type { Metadata } from "next";
import { locales, localeMeta, defaultLocale, type Locale } from "@/i18n/config";
import { pathFor, type RouteKey } from "@/i18n/routes";
import { getSite } from "@/content/repository";

export const SITE_URL = "https://pedranorte.eu";

/** Social media (SoMe) card, cropped from /images/some-bg-png.png to the 1200×630 Open Graph size. */
export const SOCIAL_IMAGE = { src: "/images/some-og.jpg", width: 1200, height: 630 };

/** Logo used in structured data: the dark mark, readable on the white backgrounds used by search engines. */
export const LOGO_IMAGE = "/images/on-bright-icon.png";

interface PageMetadataInput {
  locale: Locale;
  route: RouteKey;
  segments?: string[];
  title: string;
  description: string;
  absoluteTitle?: boolean;
}

/** Builds per-page metadata: canonical URL, hreflang alternates, Open Graph and Twitter. */
export async function pageMetadata({
  locale,
  route,
  segments = [],
  title,
  description,
  absoluteTitle = false,
}: PageMetadataInput): Promise<Metadata> {
  const site = await getSite(locale);
  const url = pathFor(locale, route, ...segments);
  const languages = Object.fromEntries(
    locales.map((l) => [localeMeta[l].hreflang, pathFor(l, route, ...segments)]),
  );
  const image = { url: SOCIAL_IMAGE.src, width: SOCIAL_IMAGE.width, height: SOCIAL_IMAGE.height, alt: site.meta.socialImageAlt };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": pathFor(defaultLocale, route, ...segments) },
    },
    openGraph: {
      type: "website",
      siteName: "Pedra Norte",
      title,
      description,
      url,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
