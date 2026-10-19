import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import type { RouteKey } from "@/i18n/routes";
import type { LegalPageKey } from "@/content/types";
import { getCompany, getLegalPage } from "@/content/repository";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { pageMetadata } from "./seo";

/** Builds the metadata + page pair shared by the privacy, terms and cookies routes. */
export function legalPage(key: LegalPageKey & RouteKey) {
  type Props = { params: Promise<{ lang: string }> };

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = (await params).lang as Locale;
    const page = await getLegalPage(locale, key);
    return pageMetadata({ locale, route: key, ...page.meta });
  }

  async function Page({ params }: Props) {
    const locale = (await params).lang as Locale;
    const [page, company] = await Promise.all([getLegalPage(locale, key), getCompany()]);
    return <LegalPageView page={page} company={company} />;
  }

  return { generateMetadata, Page };
}
