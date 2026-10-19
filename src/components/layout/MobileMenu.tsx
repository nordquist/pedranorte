"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavLinks, type NavItem } from "./NavLinks";

interface MobileMenuProps {
  locale: Locale;
  items: NavItem[];
  cta: NavItem;
  labels: { open: string; close: string; language: string };
}

/** Full-screen navigation for viewports below the desktop navbar breakpoint. */
export function MobileMenu({ locale, items, cta, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.open}
        className="relative z-50 flex size-10 items-center justify-center rounded-sm text-icon-default"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg-page pt-[72px]">
          <div className="container-page flex flex-1 flex-col gap-2xl border-t border-border-subtle py-xl">
            <NavLinks items={items} onNavigate={close} className="flex flex-col gap-xs [&_a]:type-mobile-h3 [&_a]:normal-case [&_a]:tracking-normal" />
            <div className="mt-auto flex flex-col gap-lg">
              <ButtonLink href={cta.href} onClick={close} withIcon fullWidth>
                {cta.label}
              </ButtonLink>
              <LanguageSwitch locale={locale} label={labels.language} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
