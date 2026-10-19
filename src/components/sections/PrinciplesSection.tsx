import type { ImageAsset, Principle, SectionHeading } from "@/content/types";
import { PrincipleItem } from "@/components/cards/PrincipleItem";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface PrinciplesSectionProps {
  heading: SectionHeading;
  principles: Principle[];
  image: ImageAsset;
}

/** Figma 08/10 Website / Section Principles: the page's high-contrast (Light mode) section. */
export function PrinciplesSection({ heading, principles, image }: PrinciplesSectionProps) {
  return (
    <Section tone="light">
      <div className="flex flex-col gap-2xl lg:flex-row lg:items-center lg:gap-4xl">
        <Photo
          image={image}
          sizes="(min-width: 1024px) 520px, 100vw"
          className="order-last h-[420px] w-full lg:order-first lg:h-[640px] lg:w-[520px] lg:shrink-0"
        />
        <div className="flex flex-1 flex-col gap-2xl">
          <SectionHeader {...heading} className="max-w-none" />
          <ul className="flex flex-col gap-xl">
            {principles.map((principle) => (
              <li key={principle.title}>
                <PrincipleItem principle={principle} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
