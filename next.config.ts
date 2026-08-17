import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    poweredByHeader: false,
    // enable this if you need to debug production builds - dont forget to disable it again when you are done!
    // productionBrowserSourceMaps: true,
    reactStrictMode: true,
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        // report these metrics in the ReportWebVitals component
        webVitalsAttribution: ["FCP", "LCP", "CLS", "TTFB", "INP"],
    },
};

export default nextConfig;
