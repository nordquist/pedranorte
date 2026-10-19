import type { ReactNode } from "react";
import { cx } from "@/lib/text";

/**
 * Page section with the standard rhythm (64 px mobile / 128 px desktop).
 * Tones alternate bg/page and bg/surface; "light" switches the semantic tokens
 * to the Light mode for the one high-contrast section per page.
 */
type Tone = "page" | "surface" | "elevated" | "light";

const tones: Record<Tone, string> = {
  page: "bg-bg-page",
  surface: "bg-bg-surface",
  elevated: "bg-bg-elevated",
  light: "bg-bg-page",
};

interface SectionProps {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}

export function Section({ tone = "page", id, className, children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      data-theme={tone === "light" ? "light" : undefined}
      className={cx("py-3xl lg:py-5xl", tones[tone], className)}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
