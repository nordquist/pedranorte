import type { Locale } from "./config";

/**
 * Route keys used by the content layer. Content never stores raw URLs for internal
 * pages, only route keys, so links stay locale-aware and slugs live in one place.
 */
export const routes = {
  home: "",
  services: "servicos",
  projects: "projetos",
  process: "processo",
  about: "sobre",
  contact: "contactos",
  privacy: "privacidade",
  terms: "termos",
  cookies: "cookies",
} as const;

export type RouteKey = keyof typeof routes;

export function pathFor(locale: Locale, route: RouteKey, ...segments: string[]): string {
  return "/" + [locale, routes[route], ...segments].filter(Boolean).join("/");
}

/** Replaces the locale prefix of a pathname, keeping the rest of the path. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  const [, , ...rest] = pathname.split("/");
  return "/" + [locale, ...rest].filter(Boolean).join("/");
}
