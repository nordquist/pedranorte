import { notFound } from "next/navigation";

/** Catches unknown paths below a locale so the localized not-found page renders inside the layout. */
export default function CatchAll() {
  notFound();
}
