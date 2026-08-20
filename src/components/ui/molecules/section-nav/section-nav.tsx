"use client";

import type { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Button, type ButtonProps } from "@/components/ui/atoms/button/button";

/**
 * A row of jump-links to the H2 sections on a page, e.g. "Overview / Itinerary
 * / What's included / Reviews" at the top of a long recommendation page.
 *
 * Add one item per H2 you want a button for. `id` must match the `id` you
 * put on that H2 (e.g. `<Heading level={2} id="itinerary">`) — this module
 * doesn't read the page's headings itself, so if a page adds or removes an
 * H2, add or remove the matching item here too.
 *
 * Clicking a button smooth-scrolls to its section and moves focus there
 * (so keyboard/screen-reader users land on it, not just the viewport), then
 * falls back to the browser's default instant jump if JS hasn't loaded yet
 * or the target id can't be found.
 */

export type SectionNavItem = {
  /** Matches the `id` on the target H2. Also used as the React key. */
  id: string;
  label: ReactNode;
};

export type SectionNavProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  items: SectionNavItem[];
  variant?: ButtonProps["variant"];
  textColor?: ButtonProps["textColor"];
  size?: ButtonProps["size"];
};

export const SectionNav = ({
  items,
  variant = "secondary",
  textColor,
  size = "M",
  className,
  ref,
  ...props
}: SectionNavProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return; // no match on the page yet — let the browser's default #hash jump handle it

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`); // keep the URL/back button in sync without re-triggering the scroll

    // Move focus to the section so keyboard/screen-reader users land there too, not just the viewport.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="Sidenavigation" data-slot="section-nav" className={cn(className)} ref={ref} {...props}>
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <Button asChild variant={variant} textColor={textColor} size={size}>
              <a href={`#${item.id}`} onClick={(event) => handleClick(event, item.id)}>
                {item.label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

SectionNav.displayName = "SectionNav";
