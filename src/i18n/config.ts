export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeMeta: Record<Locale, { label: string; hreflang: string; ogLocale: string }> = {
  pt: { label: "PT", hreflang: "pt-PT", ogLocale: "pt_PT" },
  en: { label: "EN", hreflang: "en", ogLocale: "en_GB" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
