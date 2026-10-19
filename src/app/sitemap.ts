import type { MetadataRoute } from "next";
import { defaultLocale, localeMeta, locales } from "@/i18n/config";
import { pathFor, type RouteKey } from "@/i18n/routes";
import { getProjects, getServices } from "@/content/repository";
import { SITE_URL } from "@/lib/seo";

type Entry = { route: RouteKey; segments?: string[]; priority: number };

/** One entry per page and locale, each listing its language alternates (hreflang). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(defaultLocale), getProjects(defaultLocale)]);

  const entries: Entry[] = [
    { route: "home", priority: 1 },
    { route: "services", priority: 0.9 },
    ...services.map((s) => ({ route: "services" as const, segments: [s.slug], priority: 0.8 })),
    { route: "projects", priority: 0.8 },
    ...projects.map((p) => ({ route: "projects" as const, segments: [p.slug], priority: 0.6 })),
    { route: "process", priority: 0.7 },
    { route: "about", priority: 0.7 },
    { route: "contact", priority: 0.9 },
    { route: "privacy", priority: 0.2 },
    { route: "terms", priority: 0.2 },
    { route: "cookies", priority: 0.2 },
  ];

  const lastModified = new Date();
  const url = (locale: (typeof locales)[number], entry: Entry) =>
    `${SITE_URL}${pathFor(locale, entry.route, ...(entry.segments ?? []))}`;

  return entries.flatMap((entry) =>
    locales.map((locale) => ({
      url: url(locale, entry),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: entry.priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, url(l, entry)])),
      },
    })),
  );
}
