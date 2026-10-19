import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/text";

/**
 * Figma 01 Brand / Logo/Horizontal (On Dark): mark + "Pedra" Light + "Norte" Bold.
 * "compact" is the mobile navbar size (70% of the desktop lockup).
 */
interface LogoProps {
  href: string;
  /** Accessible name of the link, e.g. "Pedra Norte — página inicial". */
  label: string;
  /** Description of the mark image. */
  alt: string;
  compact?: boolean;
  className?: string;
}

export function Logo({ href, label, alt, compact, className }: LogoProps) {
  return (
    <Link href={href} aria-label={label} className={cx("inline-flex shrink-0 items-center rounded-sm", className)}>
      <span className={cx("flex items-center", compact ? "gap-[11px] xl:gap-md" : "gap-md")}>
        <Image
          src="/brand/mark-on-dark.svg"
          alt={alt}
          width={88}
          height={48}
          unoptimized
          className={cx(compact ? "h-[34px] w-[62px] xl:h-12 xl:w-[88px]" : "h-12 w-[88px]")}
        />
        <span
          className={cx(
            "font-display font-light whitespace-nowrap tracking-[0.01em] text-[#e9e9e8]",
            compact ? "text-[21px] xl:text-[30px]" : "text-[30px]",
          )}
        >
          Pedra <span className="font-bold">Norte</span>
        </span>
      </span>
    </Link>
  );
}
