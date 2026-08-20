import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Heading } from "@/components/ui/atoms/heading/heading";
import {
    TipCard,
    type TipCardProps,
} from "@/components/ui/molecules/tip-card/tip-card";

/**
 * Full-bleed "Tips" section on a country page, e.g. the "Dont book
 * everything" / "Try streetfood" / ... rows under the hero — Figma's "Tips"
 * component (https://library.relume.io/components/stats-1).
 *
 * Composed from `TipCard` molecules laid out in `rows`, since Figma groups
 * tips into rows of differing widths (3-up, then 2-up for the longer
 * app-recommendation entries) rather than one evenly wrapping grid. Rows
 * stack on mobile and go side-by-side from `lg` up, same convention as
 * `Footer`.
 *
 * `rows` defaults to the country page's own copy so the section renders
 * as-is when dropped onto a new page; pass `rows` to swap in another
 * country's tips.
 */

export type TipItem = Pick<TipCardProps, "title" | "description">;

const DEFAULT_ROWS: TipItem[][] = [
    [
        {
            title: "Dont book everything",
            description: "Not everything needs to be booked in advance",
        },
        {
            title: "Try streetfood",
            description:
                "Try the streetfood a local spots - Its so good and way way cheaper",
        },
        {
            title: "Eat spicy food at home",
            description:
                "Before you go, train yourself to eat spicy food (its for your own good)",
        },
    ],
    [
        {
            title: "Apps for transportation",
            description:
                "Grab (cheap transport)\n\nBold (cheap transport, but it's often more expensive than grab)",
        },
        {
            title: "Apps for accomendation",
            description:
                "Hostelword (for booking hostels and getting to know the travelers in the hostels that you are staying at)\n\nAgoda (for booking cheap hotels)",
        },
    ],
];

export type TipsProps = Omit<ComponentPropsWithRef<"section">, "children"> & {
    heading?: ReactNode;
    rows?: TipItem[][];
};

export const Tips = ({
    heading = "Tips",
    rows = DEFAULT_ROWS,
    className,
    ref,
    ...props
}: TipsProps) => {
    return (
        <section
            data-slot="tips"
            className={cn(
                "bg-bg-light-blue px-padding-inline-mobile py-padding-block-mobile lg:px-padding-xl-inline lg:py-padding-xl-block flex w-full flex-col items-start gap-12 lg:gap-20",
                className,
            )}
            ref={ref}
            {...props}
        >
            <Heading level={2} size="2xl" weight="semibold">
                {heading}
            </Heading>

            {rows.map((row, rowIndex) => (
                <div
                    // Rows have no stable id of their own — index is fine, the list is static per page.
                    key={rowIndex}
                    className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12"
                >
                    {row.map((tip, tipIndex) => (
                        <TipCard
                            key={tipIndex}
                            title={tip.title}
                            description={tip.description}
                        />
                    ))}
                </div>
            ))}
        </section>
    );
};

Tips.displayName = "Tips";
