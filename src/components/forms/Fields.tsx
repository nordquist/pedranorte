import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/text";
import { Icon } from "@/components/ui/Icon";

/** Figma 07 Components / Input Field (Text | Textarea | Select) and Checkbox. */

const controlClass = (error?: string) =>
  cx(
    "w-full rounded-sm border bg-bg-surface p-md type-body-m text-text-primary transition-[border-color,box-shadow] placeholder:text-text-muted focus:border-accent-default focus:shadow-focus disabled:border-border-subtle disabled:text-action-disabled-text",
    error ? "border-feedback-error" : "border-border-default",
  );

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

function FieldShell({ id, label, error, children, className }: FieldShellProps) {
  return (
    <div className={cx("flex flex-col gap-xs", className)}>
      <label htmlFor={id} className="type-label-m text-text-primary">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="type-caption text-feedback-error">
          {error}
        </p>
      )}
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

const a11yProps = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function TextField({ id, label, error, className, ...props }: FieldProps & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <input {...a11yProps(id, error)} {...props} className={controlClass(error)} />
    </FieldShell>
  );
}

export function TextAreaField({ id, label, error, className, ...props }: FieldProps & Omit<ComponentProps<"textarea">, "id" | "className">) {
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <textarea {...a11yProps(id, error)} {...props} className={cx(controlClass(error), "h-[140px] resize-y")} />
    </FieldShell>
  );
}

interface SelectFieldProps extends ComponentProps<"select"> {
  id: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

export function SelectField({ id, label, placeholder, options, className, ...props }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} className={className}>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          {...props}
          className={cx(controlClass(), "cursor-pointer appearance-none pr-[56px] [&:has(option[value='']:checked)]:text-text-muted")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-md -translate-y-1/2 text-icon-default" />
      </div>
    </FieldShell>
  );
}

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  id: string;
  label: ReactNode;
  error?: string;
}

export function Checkbox({ id, label, error, ...props }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-xs">
      <div className="flex items-start gap-sm">
        <span className="relative mt-[1px] flex size-5 shrink-0">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cx(
              "peer size-5 cursor-pointer appearance-none rounded-sm border transition-colors checked:border-accent-default checked:bg-accent-default",
              error ? "border-feedback-error" : "border-border-strong",
            )}
            {...props}
          />
          <Icon
            name="check"
            size={16}
            className="pointer-events-none absolute inset-0.5 hidden text-action-primary-text peer-checked:block"
          />
        </span>
        <label htmlFor={id} className="flex-1 cursor-pointer type-body-s text-text-secondary">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="type-caption text-feedback-error">
          {error}
        </p>
      )}
    </div>
  );
}
