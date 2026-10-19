import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { getCompany, getServices, getSite } from "@/content/repository";
import { SITE_URL } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#1b1c1d",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const site = await getSite(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site.meta.title, template: "%s · Pedra Norte" },
    description: site.meta.description,
    applicationName: "Pedra Norte",
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [site, services, company] = await Promise.all([getSite(lang), getServices(lang), getCompany()]);

  return (
    <html lang={localeMeta[lang].hreflang} className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-sm bg-action-primary-bg px-lg py-sm type-button-m text-action-primary-text focus:not-sr-only focus:fixed focus:top-md focus:left-md"
        >
          {site.skipToContent}
        </a>
        <Navbar locale={lang} site={site} />
        <main id="conteudo">{children}</main>
        <Footer locale={lang} site={site} services={services} company={company} />
      </body>
    </html>
  );
}
