import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Droplets,
  Frame,
  Globe,
  Hammer,
  HardHat,
  House,
  Layers,
  Mail,
  MapPin,
  Menu,
  PaintRoller,
  Phone,
  Ruler,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

/** Figma 05 Iconography: Lucide outline geometry, 24 px grid, 1.75 px stroke. */
const icons: Record<IconName | "arrow-right" | "arrow-up-right" | "chevron-down" | "menu" | "close", LucideIcon> = {
  home: House,
  layers: Layers,
  "paint-roller": PaintRoller,
  frame: Frame,
  droplets: Droplets,
  "shield-check": ShieldCheck,
  clock: Clock,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  check: Check,
  hammer: Hammer,
  ruler: Ruler,
  "hard-hat": HardHat,
  globe: Globe,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  menu: Menu,
  close: X,
};

export type AnyIconName = keyof typeof icons;

interface IconProps {
  name: AnyIconName;
  size?: 16 | 20 | 24 | 28 | 32;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.75} aria-hidden="true" className={className} />;
}
