import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Syne } from "next/font/google";
import "@/styles/theme.css";
import { ReportWebVitals } from "@/components/web-vitals";
import { Footer } from "@/components/modules/footer/footer";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-poppins-sans",
    display: "swap",
});

// TODO: swap for the real Syne asset (e.g. via next/font) once it's hooked up. For now, self-hosted via next/font/google to match Poppins.
const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-syne-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Esters Travel Recommendations",
    description: "welcome to the my travel recommendations!",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <html lang="en" className={`${poppins.variable} ${syne.variable}`}>
            <body className="antialiased">
                <ReportWebVitals />
                {children}
                <Footer />
            </body>
        </html>
    );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
