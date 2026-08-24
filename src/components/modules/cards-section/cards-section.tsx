import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Heading } from "@/components/ui/atoms/heading/heading";

/**
 * Generic "heading + rows of cards" section — the reusable shell behind
 * `Tips` (and any other section that's just a heading over a wrapping grid
 * of cards, e.g. "What did we miss"). Unlike `Tips`, this component doesn't
 * know about tips or `TipCard` specifically: it takes a flat `items` array
 * plus a `renderItem` render-prop, so any card shape/content can be plugged
 * in and the heading is fully caller-controlled.
 *
 * `items` is chunked into rows of `perRow` (default 3) automatically, rather
 * than requiring the caller to pre-group them into rows like `Tips.rows`
 * does. That means the number of cards — and rows — simply follows whatever
 * `items` contains: once tip/miss content is fetched from an API or CMS, the
 * fetched array can be passed straight in as `items` with no restructuring.
 */

export type CardsSectionProps<TItem> = Omit<
    ComponentPropsWithRef<"section">,
    "children"
> & {
    heading?: ReactNode;
    items: TItem[];
    /** Renders one card for one item. Lets this section stay agnostic of the card shape (TipCard, or anything else). */
    renderItem: (item: TItem, index: number) => ReactNode;
    /** Cards per row before wrapping to a new row. Defaults to 3, matching `Tips`' own default grouping. */
    perRow?: number;
};

const chunk = <TItem,>(items: TItem[], size: number): TItem[][] => {
    if (size <= 0) return [items];

    const rows: TItem[][] = [];
    for (let i = 0; i < items.length; i += size) {
        rows.push(items.slice(i, i + size));
    }
    return rows;
};

export const CardsSection = <TItem,>({
    heading,
    items,
    renderItem,
    perRow = 3,
    className,
    ref,
    ...props
}: CardsSectionProps<TItem>) => {
    const rows = chunk(items, perRow);
    return (
        <section
            data-slot="cards-section"
            className={cn(
                "bg-bg-light-blue py-padding-inline-mobile lg:py-padding-xl-inline px-padding-block-mobile lg:px-padding-xl-block flex w-full flex-col items-start gap-12 lg:gap-20",
                className,
            )}
            ref={ref}
            {...props}
        >
            {heading && (
                <Heading level={2} size="xl" weight="semibold">
                    {heading}
                </Heading>
            )}

            {rows.map((row, rowIndex) => (
                <div
                    // Rows are a pure layout split of one flat list, not separate data — index is fine.
                    key={rowIndex}
                    className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12"
                >
                    {row.map((item, itemIndex) => (
                        <div
                            key={rowIndex * perRow + itemIndex}
                            className="flex w-full flex-1"
                        >
                            {renderItem(item, rowIndex * perRow + itemIndex)}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
};

CardsSection.displayName = "CardsSection";
