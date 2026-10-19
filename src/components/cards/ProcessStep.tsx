import type { ProcessStep as ProcessStepContent } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

/** Figma 07 Components / Process Step. `showDetails` adds the checklist used on the Process page. */
export function ProcessStep({ step, showDetails }: { step: ProcessStepContent; showDetails?: boolean }) {
  return (
    <div className="flex flex-col gap-md">
      <p className="type-number-display text-accent-default" aria-hidden="true">
        {step.number}
      </p>
      <div className="h-px w-full bg-border-default" />
      <h3 className="type-h4 text-text-primary">{step.title}</h3>
      <p className="type-body-s text-text-secondary">{step.description}</p>
      {showDetails && (
        <ul className="flex flex-col gap-sm pt-xs">
          {step.details.map((detail) => (
            <li key={detail} className="flex items-start gap-sm type-body-s text-text-primary">
              <Icon name="check" size={20} className="mt-[1px] shrink-0 text-accent-default" />
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
