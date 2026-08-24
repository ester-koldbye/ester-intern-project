import Link from "next/link";
import { Hero } from "@/components/modules/hero/hero";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { DestinationCard } from "@/components/ui/molecules/destination-card/destination-card";
import { Button } from "@/components/ui/atoms/button/button";
import { getAllCountries, getNavCountries } from "@/lib/destinations";

const Home = async () => {
    const [countries, navCountries] = await Promise.all([
        getAllCountries(),
        getNavCountries(),
    ]);

    // First two show large (matches Figma's 2-up row); the rest show medium in a 3-up row below.
    const [featuredCountries, otherCountries] = [countries.slice(0, 2), countries.slice(2)];

    return (
        <main>
            <Hero
                countries={navCountries}
                heading="Welcome to my travel recommendations"
                description="Discover the destinations for my recommendations, tips and tricks from my backpacker trip and vacations!"
                buttons={[
                    {
                        key: "destinations",
                        label: "Destinations",
                        href: "#destinations",
                    },
                ]}
            />
            <div className="bg-light-blue py-padding-inline-mobile lg:py-padding-xl-inline px-padding-block-mobile lg:px-padding-xl-block">
                <section className="flex flex-col items-center gap-6 lg:gap-8">

                    {/* HEADINGS */}
                    <div className="flex flex-col gap-2 text-center">
                        <Heading level={1} size="md" variant="tertiary">
                            City breaks, road trips and local tips!
                        </Heading>
                        <Heading level={2} size="xl" id="destinations">
                            Explore my destinations
                        </Heading>
                    </div>

                    {/* DESTINATION CARDS */}
                    <div className="flex w-full max-w-360 flex-col gap-3 md:gap-5">
                        {/* First two countries */}
                        <div className="grid w-full gap-3 sm:grid-cols-2 md:gap-5">
                            {featuredCountries.map((country) => (
                                <Link key={country.slug} href={`/${country.slug}`}>
                                    <DestinationCard
                                        imageSrc={country.imageSrc}
                                        imageAlt={country.imageAlt}
                                        label={country.name}
                                        size={country.size}
                                    />
                                </Link>
                            ))}
                        </div>
                        {/* Next three countries */}
                        <div className="grid w-full gap-3 sm:grid-cols-3 md:gap-5">
                            {otherCountries.map((country) => (
                                <Link key={country.slug} href={`/${country.slug}`}>
                                    <DestinationCard
                                        imageSrc={country.imageSrc}
                                        imageAlt={country.imageAlt}
                                        label={country.name}
                                        size={country.size}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* BUTTON */}
                    <Button asChild textColor="light" className="hover:text-text-primary">
                        <a href="#destinations">See all the destinations</a>
                    </Button>
                </section>
            </div>
        </main>
    );
};

Home.displayName = "Home";

export default Home;
