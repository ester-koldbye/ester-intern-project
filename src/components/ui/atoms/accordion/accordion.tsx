"use client";

import type { ComponentPropsWithRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/styles/utils";

/**
 * Accessible accordion, e.g. the "Foods & Drinks to try" Q&A list on a
 * country page.
 *
 * A thin, styled wrapper around Radix's Accordion primitive — Radix owns all
 * interaction and accessibility behaviour (keyboard nav, `aria-expanded`
 * wiring, focus management), same convention as `DropdownMenu`.
 *
 * The chevron is a local inline SVG rather than the Figma-exported asset, so
 * it can be recolored with `currentColor` and rotated per open/closed state —
 * same reasoning, and the same glyph, as `DropdownMenu`'s chevron.
 *
 * Composition mirrors Radix's own compound-component shape:
 *
 *   <Accordion type="multiple">
 *     <AccordionItem value="green-curry">
 *       <AccordionTrigger>Green Curry</AccordionTrigger>
 *       <AccordionContent>...</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 */

const Accordion = AccordionPrimitive.Root;

export type AccordionItemProps = ComponentPropsWithRef<
    typeof AccordionPrimitive.Item
>;

const AccordionItem = ({ className, ref, ...props }: AccordionItemProps) => (
    <AccordionPrimitive.Item
        data-slot="accordion-item"
        className={cn("border-dark-brown border-t", className)}
        ref={ref}
        {...props}
    />
);

AccordionItem.displayName = "AccordionItem";

/**
 * Figma rotates this same "arrow down" glyph per state rather than swapping
 * glyphs: pointing right (-90°) when closed, pointing up (180°) when open.
 */
const ChevronIcon = () => (
    <svg
        width="17"
        height="12"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 -rotate-90 transition-transform duration-200 group-data-[state=open]:rotate-180"
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

export type AccordionTriggerProps = ComponentPropsWithRef<
    typeof AccordionPrimitive.Trigger
>;

const AccordionTrigger = ({
    className,
    children,
    ref,
    ...props
}: AccordionTriggerProps) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            data-slot="accordion-trigger"
            className={cn(
                "group font-poppins text-md leading-lg text-text-primary flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-semibold outline-none",
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
            <ChevronIcon />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
);

AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = ComponentPropsWithRef<
    typeof AccordionPrimitive.Content
>;

const AccordionContent = ({
    className,
    children,
    ref,
    ...props
}: AccordionContentProps) => (
    <AccordionPrimitive.Content
        data-slot="accordion-content"
        className={cn(
            "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden",
            className,
        )}
        ref={ref}
        {...props}
    >
        <div className="pb-6">{children}</div>
    </AccordionPrimitive.Content>
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
