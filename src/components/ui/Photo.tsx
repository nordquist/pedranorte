import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { cx } from "@/lib/text";

/**
 * Photo frame (Figma 06 Imagery): radius/sm corners, cropped with object-cover so
 * source files of any resolution fill the slot defined in the layout.
 * The frame size comes from `className` (height or aspect ratio).
 */
interface PhotoProps {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
}

export function Photo({ image, className, imageClassName, sizes, priority }: PhotoProps) {
  return (
    <div className={cx("relative overflow-hidden rounded-sm bg-bg-elevated", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cx("object-cover", imageClassName)}
      />
    </div>
  );
}
