// Country page, e.g. /thailand — hero, tips, food & drinks, cities visited,
// and what we missed. Content comes from `getCountry`, which today reads a
// local mock list but is already shaped like an async fetch. A country that
// exists but has no write-up yet (see src/lib/destinations.ts) renders
// ComingSoon instead of 404ing — only a genuinely unknown slug does that.
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/modules/hero/hero";
import { FoodDrinks } from "@/components/modules/food-drinks/food-drinks";
import { CardsSection } from "@/components/modules/cards-section/cards-section";
import { ComingSoon } from "@/components/modules/coming-soon/coming-soon";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { DestinationCard } from "@/components/ui/molecules/destination-card/destination-card";
import { TipCard } from "@/components/ui/molecules/tip-card/tip-card";
import {
    getCountry,
    getCountrySlugs,
    getCitiesForCountry,
    getNavCountries,
} from "@/lib/destinations";

export async function generateStaticParams() {
    const slugs = await getCountrySlugs();
    return slugs.map((country) => ({ country }));
}

export async function generateMetadata({
    params,
}: PageProps<"/[country]">): Promise<Metadata> {
    const { country: countrySlug } = await params;
    const country = await getCountry(countrySlug);

    if (!country) {
        return { title: "Destination not found" };
    }

    return {
        title: `Travel recommendations | ${country.name}`,
        description: `Welcome to the ${country.name} page of my travel recommendations!`,
    };
}

const CountryPage = async ({ params }: PageProps<"/[country]">) => {
    const { country: countrySlug } = await params;
    const [country, navCountries] = await Promise.all([
        getCountry(countrySlug),
        getNavCountries(),
    ]);

    if (!country) {
        notFound();
    }

    const cities = country.content ? await getCitiesForCountry(country.slug) : [];

    const breadcrumbItems = [
        { href: "/", label: "Home" },
        { href: `/${country.slug}`, label: country.name },
    ];

    return (
        <main>
            {/* HERO SECTION */}
            <Hero
                countries={navCountries}
                activeCountryHref={`/${country.slug}`}
                heading={country.name}
                description={`This is the ${country.name} page.`}
                buttons={
                    country.content
                        ? [
                              { key: "tips", label: "Tips", href: "#tips" },
                              { key: "food-drinks", label: "Food & Drinks", href: "#food-drinks" },
                              { key: "cities", label: "Cities", href: "#cities" },
                              { key: "what-did-we-miss", label: "What We Missed", href: "#what-did-we-miss" },
                          ]
                        : []
                }
            />
            <div className="py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            {!country.content ? (
                <ComingSoon
                    heading={`${country.name} — coming soon`}
                    description={`We haven't written up ${country.name} yet — check back soon!`}
                />
            ) : (
                <>
                    {/* TIPS SECTION */}
                    <CardsSection
                        id="tips"
                        heading="Tips"
                        items={country.content.tips}
                        renderItem={(item) => (
                            <TipCard title={item.title} description={item.description} />
                        )}
                    />

                    {/* FOOD & DRINKS SECTION */}
                    <FoodDrinks id="food-drinks" items={country.content.foodDrinks} />

                    {/* CITIES VISITED SECTION - laid out as a 3-column image grid */}
                    {cities.length > 0 && (
                        <div className="bg-light-blue py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                            <section className="flex flex-col items-center gap-6 py-6 lg:gap-8 lg:py-8">
                                <div className="px-6 pt-6 text-center">
                                    <Heading level={2} size="xl" id="cities">
                                        Cities I visited
                                    </Heading>
                                </div>

                                <div className="flex flex-col md:flex-row w-full max-w-360 gap-3 md:gap-5">
                                    {/* Three columns, cities distributed round-robin so any number of cities lays out evenly. */}
                                    {[0, 1, 2].map((columnIndex) => (
                                        <div key={columnIndex} className="grid w-full gap-3 md:gap-5">
                                            {cities
                                                .filter((_, cityIndex) => cityIndex % 3 === columnIndex)
                                                .map((city) => (
                                                    <Link key={city.slug} href={`/${country.slug}/${city.slug}`}>
                                                        <DestinationCard
                                                            imageSrc={city.imageSrc}
                                                            imageAlt={city.imageAlt}
                                                            label={city.name}
                                                            size={city.size}
                                                        />
                                                    </Link>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* WHAT DID WE MISS SECTION */}
                    <CardsSection
                        id="what-did-we-miss"
                        heading="What did we miss?"
                        items={country.content.whatDidWeMiss}
                        renderItem={(item) => (
                            <TipCard title={item.title} description={item.description} />
                        )}
                    />
                </>
            )}
        </main>
    );
};

CountryPage.displayName = "CountryPage";

export default CountryPage;
