import type { Principle } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

/** Figma 07 Components / Principle Item. */
export function PrincipleItem({ principle }: { principle: Principle }) {
  return (
    <div className="flex items-start gap-lg">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-sm border border-border-default">
        <Icon name={principle.icon} size={28} className="text-accent-default" />
      </div>
      <div className="flex flex-col gap-xs">
        <h3 className="type-h5 text-text-primary">{principle.title}</h3>
        <p className="type-body-s text-text-secondary">{principle.description}</p>
      </div>
    </div>
  );
}
