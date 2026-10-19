import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/text";
import { Icon } from "./Icon";

/** Figma 07 Components / Button: Type × Size × State. */
type Variant = "primary" | "secondary" | "ghost";
type Size = "l" | "m";

interface StyleProps {
  variant?: Variant;
  size?: Size;
  withIcon?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-action-primary-bg text-action-primary-text hover:bg-action-primary-bg-hover disabled:bg-action-disabled-bg disabled:text-action-disabled-text",
  secondary:
    "border border-border-strong text-text-primary hover:border-text-primary hover:bg-bg-elevated disabled:border-border-subtle disabled:text-action-disabled-text disabled:bg-transparent",
  ghost: "text-text-primary hover:text-accent-default disabled:text-action-disabled-text",
};

const sizes: Record<Size, string> = {
  l: "type-button-l px-xl py-md",
  m: "type-button-m px-lg py-sm",
};

export function buttonClasses({ variant = "primary", size = "l", fullWidth, className }: StyleProps) {
  return cx(
    "inline-flex items-center justify-center gap-sm rounded-sm whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

function ButtonContent({ children, size = "l", withIcon }: { children: React.ReactNode; size?: Size; withIcon?: boolean }) {
  return (
    <>
      {children}
      {withIcon && <Icon name="arrow-right" size={size === "l" ? 20 : 16} />}
    </>
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentProps<typeof Link>, "className">;

export function ButtonLink({ variant, size, withIcon, fullWidth, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, fullWidth, className })} {...props}>
      <ButtonContent size={size} withIcon={withIcon}>
        {children}
      </ButtonContent>
    </Link>
  );
}

type ButtonProps = StyleProps & Omit<ComponentProps<"button">, "className">;

export function Button({ variant, size, withIcon, fullWidth, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, fullWidth, className })} {...props}>
      <ButtonContent size={size} withIcon={withIcon}>
        {children}
      </ButtonContent>
    </button>
  );
}
