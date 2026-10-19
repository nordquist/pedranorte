import type { ProcessStep as ProcessStepContent, SectionHeading } from "@/content/types";
import { ProcessStep } from "@/components/cards/ProcessStep";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface ProcessSectionProps {
  steps: ProcessStepContent[];
  heading?: SectionHeading;
  showDetails?: boolean;
}

/** Figma 08/10 Website / Section Process: four numbered steps. */
export function ProcessSection({ steps, heading, showDetails }: ProcessSectionProps) {
  return (
    <Section id="processo">
      <div className="flex flex-col gap-2xl lg:gap-4xl">
        {heading && <SectionHeader {...heading} />}
        <ol className="grid gap-xl md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <ProcessStep step={step} showDetails={showDetails} />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
