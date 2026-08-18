import type { ButtonHTMLAttributes } from "react";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const variantClasses: Record<NonNullable<IconButtonProps["variant"]>, string> = {
  // Solid orange circle with white arrow
  primary: "border-2 border-orange bg-orange text-white hover:bg-transparent hover:text-orange",

  // Faint orange circle with orange arrow
  secondary: "border-2 border-orange/25 bg-orange/25 text-orange hover:border-orange/50 hover:bg-orange/50",
};

export const IconButton = ({
  variant = "primary",
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`inline-flex size-[43px] shrink-0 cursor-pointer items-center justify-center rounded-full border-solid drop-shadow-[0px_0px_7px_rgba(0,0,0,0.25)] transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <svg
        width="17"
        height="14"
        viewBox="0 0 16.7067 13.9856"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 6.99278H15.646M9.18352 0.530333L15.646 6.99278L9.18352 13.4553"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};
