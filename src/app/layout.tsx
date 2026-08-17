import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/theme.css";
import { ReportWebVitals } from "@/components/web-vitals";

export const metadata: Metadata = {
    title: "akqa-dendach-nextjs-template",
    description: "welcome to the best next.js boilerplate ever!",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className="antialiased">
                <ReportWebVitals />
                {children}
            </body>
        </html>
    );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
