import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind classes and resolves conflicts (e.g. "p-2 p-4" -> "p-4")
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
