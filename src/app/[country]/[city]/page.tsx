// City page, e.g. /thailand/bangkok — hero with jump-links, tips, filterable
// recommendations, and what we missed. Content comes from `getCity`, shaped
// like an async fetch. A city that exists but has no write-up yet renders
// ComingSoon instead of 404ing — only an unknown country/city pair does that.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/modules/hero/hero";
import { CardsSection } from "@/components/modules/cards-section/cards-section";
import { Recommendations } from "@/components/modules/recommendations/recommendations";
import { ComingSoon } from "@/components/modules/coming-soon/coming-soon";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { TipCard } from "@/components/ui/molecules/tip-card/tip-card";
import {
    getCity,
    getCountry,
    getCitySlugParams,
    getNavCountries,
} from "@/lib/destinations";

export async function generateStaticParams() {
    const params = await getCitySlugParams();
    return params;
}

export async function generateMetadata({
    params,
}: PageProps<"/[country]/[city]">): Promise<Metadata> {
    const { country: countrySlug, city: citySlug } = await params;
    const city = await getCity(countrySlug, citySlug);

    if (!city) {
        return { title: "Destination not found" };
    }

    return {
        title: `Travel recommendations | ${city.name}`,
        description: `Welcome to the ${city.name} page of my travel recommendations!`,
    };
}

const CityPage = async ({ params }: PageProps<"/[country]/[city]">) => {
    const { country: countrySlug, city: citySlug } = await params;
    const [city, country, navCountries] = await Promise.all([
        getCity(countrySlug, citySlug),
        getCountry(countrySlug),
        getNavCountries(),
    ]);

    if (!city || !country) {
        notFound();
    }

    const breadcrumbItems = [
        { href: "/", label: "Home" },
        { href: `/${country.slug}`, label: country.name },
        { href: `/${country.slug}/${city.slug}`, label: city.name },
    ];

    return (
        <main>
            {/* Hero section with page intro and jump-links to sections below */}
            <Hero
                countries={navCountries}
                activeCountryHref={`/${country.slug}`}
                heading={city.name}
                description={`This is the ${city.name} page.`}
                buttons={
                    city.content
                        ? [
                            { key: "tips", label: "Tips", href: "#tips" },
                            { key: "recommendations", label: "Recommendations", href: "#recommendations" },
                            { key: "what-did-we-miss", label: "What We Missed", href: "#what-did-we-miss" },
                        ]
                        : []
                }
            />
            <div className="py-padding-inline-mobile lg:py-padding-xl-inline px-padding-block-mobile lg:px-padding-xl-block">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            {!city.content ? (
                <ComingSoon
                    heading={`${city.name} — coming soon`}
                    description={`We haven't written up ${city.name} yet — check back soon!`}
                />
            ) : (
                <>
                    {/* TIPS SECTION */}
                    <CardsSection
                        id="tips"
                        heading="Tips"
                        items={city.content.tips}
                        renderItem={(item) => (
                            <TipCard title={item.title} description={item.description} />
                        )}
                    />

                    {/* MY RECOMMENDATIONS SECTION — activities/where-to-eat/going-out/accommodations, filterable by category */}
                    <Recommendations id="recommendations" items={city.content.recommendations} />

                    {/* WHAT DID WE MISS SECTION */}
                    <CardsSection
                        id="what-did-we-miss"
                        heading="What did we miss?"
                        items={city.content.whatDidWeMiss}
                        renderItem={(item) => (
                            <TipCard title={item.title} description={item.description} />
                        )}
                    />
                </>
            )}
        </main>
    );
};

CityPage.displayName = "CityPage";

export default CityPage;
