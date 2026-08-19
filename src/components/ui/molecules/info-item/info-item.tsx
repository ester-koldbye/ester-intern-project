import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/styles/utils";
import { Text } from "@/components/ui/atoms/text/text";

/**
 * A practical-info row: a small icon + bold label on top, with a muted
 * description underneath — e.g. "Mobile ticketing / Use your phone or
 * print your voucher" on an activity's detail page.
 *
 * `icon` defaults to the clock glyph from Figma but takes any node, since
 * this row is meant to repeat with different icons (cancellation policy,
 * duration, etc.) wherever a list of these appears.
 */

// SMALL CLOCK ICON
const ClockIcon = (props: ComponentPropsWithRef<"svg">) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58182 0 0 3.58182 0 8C0 12.4182 3.58182 16 8 16C12.4182 16 16 12.4182 16 8C16 3.58182 12.4182 0 8 0ZM1.45455 8C1.45455 7.14044 1.62385 6.28929 1.95279 5.49516C2.28173 4.70103 2.76386 3.97947 3.37166 3.37166C3.97947 2.76386 4.70103 2.28173 5.49516 1.95279C6.28929 1.62385 7.14044 1.45455 8 1.45455C8.85956 1.45455 9.71071 1.62385 10.5048 1.95279C11.299 2.28173 12.0205 2.76386 12.6283 3.37166C13.2361 3.97947 13.7183 4.70103 14.0472 5.49516C14.3762 6.28929 14.5455 7.14044 14.5455 8C14.5455 9.73596 13.8558 11.4008 12.6283 12.6283C11.4008 13.8558 9.73596 14.5455 8 14.5455C6.26404 14.5455 4.59918 13.8558 3.37166 12.6283C2.14415 11.4008 1.45455 9.73596 1.45455 8ZM8.72727 4.36364C8.72727 4.17075 8.65065 3.98577 8.51426 3.84938C8.37787 3.71299 8.19289 3.63636 8 3.63636C7.80712 3.63636 7.62213 3.71299 7.48574 3.84938C7.34935 3.98577 7.27273 4.17075 7.27273 4.36364V8C7.27273 8.11291 7.29901 8.22426 7.34951 8.32525C7.4 8.42623 7.47331 8.51408 7.56364 8.58182L10.4727 10.7636C10.627 10.8794 10.821 10.9291 11.0119 10.9018C11.2029 10.8745 11.3752 10.7725 11.4909 10.6182C11.6066 10.4639 11.6563 10.2699 11.6291 10.079C11.6018 9.88802 11.4998 9.71573 11.3455 9.6L8.72727 7.63636V4.36364Z"
            fill="currentColor"
        />
    </svg>
);

export type InfoItemProps = ComponentPropsWithRef<"div"> & {
    icon?: ReactNode; /* leading icon, defaults to the clock glyph */
    typeTitle: ReactNode; /* bold label, e.g. "Mobile ticketing" */
    title: ReactNode; /* bold label, e.g. "Mobile ticketing" */
    description?: ReactNode; /* optional muted supporting line underneath */
};

export const InfoItem = ({ icon = <ClockIcon />, typeTitle, title, description, className, ref, ...props }: InfoItemProps) => {
    return (
        <div data-slot="info-item" className={cn("flex w-full flex-col items-start gap-1.5", className)} ref={ref} {...props}>
            <div className="flex items-center gap-2.5">
                <span className="flex size-4 shrink-0 items-center justify-center text-icon-tertiary">{icon}</span>
                
                <div className="flex items-start gap-1">
                    <Text as="span" size="base" weight="bold">
                        {typeTitle}:
                    </Text>
                    <Text as="span" size="base">
                        {title}
                    </Text>

                </div>

            </div>

            {/* Description is omitted when there's no description */}
            {description && (
                <Text size="sm" weight="semibold" textColor="grey" className="pl-6.5">
                    {description}
                </Text>
            )}
        </div>
    );
};

InfoItem.displayName = "InfoItem";
