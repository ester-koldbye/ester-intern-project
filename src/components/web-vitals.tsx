"use client";
import { useReportWebVitals } from "next/web-vitals";

const ReportWebVitals = () => {
    useReportWebVitals((metric) => {
        if (process.env.NODE_ENV === "production") {
            return;
        }
        // eslint-disable-next-line no-console
        console.log(metric);
    });

    return null;
};

export { ReportWebVitals };
