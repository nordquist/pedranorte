import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/**
 * Every page lives under /pt or /en. Requests without a locale prefix are redirected,
 * using the browser's Accept-Language when it prefers English, Portuguese otherwise.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const languages = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = languages.find((l) => isLocale(l.lang));
  return match && isLocale(match.lang) ? match.lang : defaultLocale;
}

export const config = {
  // Skip Next internals, the API, metadata files and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
