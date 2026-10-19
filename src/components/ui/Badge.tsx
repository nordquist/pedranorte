import { cx } from "@/lib/text";

/** Figma 07 Components / Badge (Style = Outline | Filled). */
export function Badge({ label, filled }: { label: string; filled?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-sm px-sm py-xs type-eyebrow",
        filled ? "bg-accent-default text-action-primary-text" : "border border-accent-default text-accent-default",
      )}
    >
      {label}
    </span>
  );
}
