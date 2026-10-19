import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { InternalLink, NavLink } from "@/content/types";

export function isExternal(link: NavLink): link is { label: string; href: string } {
  return "href" in link;
}

export function hrefFor(locale: Locale, link: InternalLink): string {
  const path = pathFor(locale, link.route, ...(link.slug ? [link.slug] : []));
  return link.hash ? `${path}#${link.hash}` : path;
}
