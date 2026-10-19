import "server-only";
import type { Locale } from "@/i18n/config";
import type { Company, LegalPageKey, LocaleContent } from "./types";
import company from "./data/company.json";
import pt from "./data/pt";
import en from "./data/en";

/**
 * Single entry point for all site content. Functions are async on purpose:
 * swapping the local JSON for a CMS/database only means changing this file.
 */
const content: Record<Locale, LocaleContent> = { pt, en };

export async function getCompany(): Promise<Company> {
  return company;
}

export async function getSite(locale: Locale) {
  return content[locale].site;
}

export async function getQuoteForm(locale: Locale) {
  return content[locale].form;
}

export async function getHome(locale: Locale) {
  return content[locale].home;
}

export async function getPages(locale: Locale) {
  return content[locale].pages;
}

export async function getServices(locale: Locale) {
  return content[locale].services;
}

export async function getService(locale: Locale, slug: string) {
  return content[locale].services.find((s) => s.slug === slug);
}

export async function getProjects(locale: Locale) {
  return content[locale].projects;
}

export async function getProject(locale: Locale, slug: string) {
  return content[locale].projects.find((p) => p.slug === slug);
}

export async function getProcessSteps(locale: Locale) {
  return content[locale].process;
}

export async function getPrinciples(locale: Locale) {
  return content[locale].principles;
}

export async function getLegalPage(locale: Locale, key: LegalPageKey) {
  return content[locale].legal[key];
}
