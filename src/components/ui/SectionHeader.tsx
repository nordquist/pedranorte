import type { SectionHeading } from "@/content/types";
import { cx } from "@/lib/text";

/** Figma 07 Components / Section Header (Align = Left | Center). */
interface SectionHeaderProps extends SectionHeading {
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "left", as: Heading = "h2", className }: SectionHeaderProps) {
  return (
    <div
      className={cx(
        "flex max-w-measure flex-col gap-md",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <p className="type-eyebrow text-accent-default">{eyebrow}</p>}
      <Heading className="type-mobile-h2 text-text-primary lg:type-h1">{title}</Heading>
      {description && <p className="type-body-m text-text-secondary lg:type-body-l">{description}</p>}
    </div>
  );
}
