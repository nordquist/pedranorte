import type { RouteKey } from "@/i18n/routes";

/**
 * Content contracts. Every page reads content exclusively through these interfaces
 * (see repository.ts), so the JSON files can later be replaced by a CMS or database
 * without touching components.
 */

export type IconName =
  | "home"
  | "layers"
  | "paint-roller"
  | "frame"
  | "droplets"
  | "shield-check"
  | "clock"
  | "phone"
  | "mail"
  | "map-pin"
  | "check"
  | "hammer"
  | "ruler"
  | "hard-hat"
  | "globe";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface InternalLink {
  label: string;
  route: RouteKey;
  slug?: string;
  hash?: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export type NavLink = InternalLink | ExternalLink;

export interface SectionHeading {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface PageHero extends SectionHeading {
  image: ImageAsset;
}

/* Company data is locale independent. */
export interface Company {
  brand: string;
  legalEntity: string;
  vatNumber: string;
  url: string;
  email: string;
  phone: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    countryCode: string;
  };
}

export interface SiteContent {
  meta: PageMeta & { tagline: string; socialImageAlt: string };
  brand: { logoAlt: string; homeLink: string };
  skipToContent: string;
  nav: InternalLink[];
  quoteCta: InternalLink;
  menu: { main: string; open: string; close: string; language: string };
  footer: {
    tagline: string;
    legalEntityNote: string;
    navigationTitle: string;
    servicesTitle: string;
    legalTitle: string;
    legal: NavLink[];
    copyright: string;
  };
  contact: {
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hours: string;
  };
  ui: {
    learnMore: string;
    viewProject: string;
    discover: string;
    allServices: string;
    allProjects: string;
    includes: string;
    scope: string;
    sampleProject: string;
    breadcrumbHome: string;
  };
  notFound: { eyebrow: string; title: string; description: string; cta: InternalLink };
}

export interface QuoteFormContent {
  title: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    workType: { label: string; placeholder: string; otherOption: string };
    message: { label: string; placeholder: string };
  };
  consent: { before: string; link: string; after: string };
  submit: string;
  sending: string;
  required: string;
  invalidEmail: string;
  success: { title: string; description: string };
  error: string;
}

export interface HomeContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    titleLight: string;
    titleBold: string;
    body: string;
    primaryCta: InternalLink;
    secondaryCta: InternalLink;
    highlights: string[];
    discover: string;
    image: ImageAsset;
  };
  about: {
    heading: SectionHeading;
    points: string[];
    cta: InternalLink;
    image: ImageAsset;
  };
  services: {
    heading: SectionHeading;
    ctaCard: { title: string; description: string; cta: InternalLink };
  };
  process: { heading: SectionHeading };
  projects: { heading: SectionHeading; cta: InternalLink };
  principles: { heading: SectionHeading; image: ImageAsset };
  cta: {
    titleLight: string;
    titleBold: string;
    body: string;
    primaryCta: InternalLink;
    secondaryCta: InternalLink;
  };
  contact: { heading: SectionHeading; image: ImageAsset };
}

export interface Service {
  slug: string;
  icon: IconName;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  includes: string[];
  image: ImageAsset;
}

export interface Project {
  slug: string;
  category: string;
  title: string;
  meta: string;
  summary: string;
  scope: string[];
  image: ImageAsset;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface Principle {
  icon: IconName;
  title: string;
  description: string;
}

export interface ContentPage {
  meta: PageMeta;
  hero: PageHero;
  body?: string[];
}

export interface PagesContent {
  services: ContentPage;
  projects: ContentPage;
  process: ContentPage;
  about: ContentPage & { valuesHeading: SectionHeading; teamNote: string };
  contact: ContentPage;
}

export interface LegalPage {
  meta: PageMeta;
  title: string;
  updated: string;
  notice: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export type LegalPageKey = "privacy" | "terms" | "cookies";

export interface LocaleContent {
  site: SiteContent;
  form: QuoteFormContent;
  home: HomeContent;
  pages: PagesContent;
  services: Service[];
  projects: Project[];
  process: ProcessStep[];
  principles: Principle[];
  legal: Record<LegalPageKey, LegalPage>;
}
