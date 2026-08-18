"use client";

import type { ComponentPropsWithRef } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/styles/utils";

/**
 * Accessible dropdown navigation menu, e.g. the "Countries" menu in the header.
 *
 * A thin, styled wrapper around Radix's DropdownMenu primitive. Radix owns all
 * interaction and accessibility behaviour (keyboard nav, focus trapping,
 * outside-click / Escape dismissal, `aria-*` wiring) — this file only adds the
 * design system's look, following the same `asChild`-first pattern as every
 * other atom here.
 *
 * Composition mirrors Radix's own compound-component shape:
 *
 *   <DropdownMenu>
 *     <DropdownMenuTrigger>Countries</DropdownMenuTrigger>
 *     <DropdownMenuContent align="end">
 *       <DropdownMenuItem asChild active={pathname === "/thailand"}>
 *         <Link href="/thailand">Thailand</Link>
 *       </DropdownMenuItem>
 *       ...
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 */

const DropdownMenu = DropdownMenuPrimitive.Root;

const dropdownMenuTriggerVariants = cva(
  "group inline-flex cursor-pointer items-center gap-2 font-poppins font-semibold tracking-[0.32px] outline-none transition-colors",
  {
    variants: {
      variant: {
        // White text, e.g. on the dark hero header
        primary: "text-text-secondary hover:text-text-tertiary data-[state=open]:text-text-tertiary",

        // Dark text, e.g. on light backgrounds
        secondary: "text-text-primary hover:text-text-tertiary data-[state=open]:text-text-tertiary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const ChevronIcon = () => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type DropdownMenuTriggerProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.Trigger> &
  VariantProps<typeof dropdownMenuTriggerVariants>;

const DropdownMenuTrigger = ({
  variant,
  className,
  children,
  ref,
  ...props // any remaining Radix Trigger props (asChild, onClick, aria-*, etc.) get spread onto the trigger
}: DropdownMenuTriggerProps) => (
  <DropdownMenuPrimitive.Trigger
    data-slot="dropdown-menu-trigger"
    className={cn(dropdownMenuTriggerVariants({ variant, className }))}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronIcon />
  </DropdownMenuPrimitive.Trigger>
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export type DropdownMenuContentProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>;

const DropdownMenuContent = ({
  className,
  sideOffset = 8,
  ref,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 flex min-w-40 flex-col gap-3 rounded-lg bg-white p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.1)]",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className,
      )}
      ref={ref}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

DropdownMenuContent.displayName = "DropdownMenuContent";

const dropdownMenuItemVariants = cva(
  "cursor-pointer font-poppins text-sm leading-sm font-regular outline-none transition-colors select-none",
  {
    variants: {
      variant: {
        // Not the current page
        default: "text-text-primary hover:text-text-tertiary focus-visible:text-text-tertiary",

        // Current page, e.g. Thailand while browsing Thailand pages
        active: "text-text-tertiary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type DropdownMenuItemProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    /** Marks this item as the current page, styling it like `variant="active"`. Overrides `variant`. */
    active?: boolean;
  };

const DropdownMenuItem = ({
  variant,
  active = false,
  className,
  ref,
  ...props
}: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    data-slot="dropdown-menu-item"
    className={cn(dropdownMenuItemVariants({ variant: active ? "active" : variant, className }))}
    ref={ref}
    {...props}
  />
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
