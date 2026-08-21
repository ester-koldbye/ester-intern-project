import { Hero } from "@/components/modules/hero/hero";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { DestinationCard } from "@/components/ui/molecules/destination-card/destination-card";
import { Button } from "@/components/ui/atoms/button/button";

// Matches the destinations listed further down the page.
const COUNTRIES = [
    { href: "/australia", label: "Australia" },
    { href: "/thailand", label: "Thailand" },
    { href: "/indonesia", label: "Indonesia" },
    { href: "/vietnam", label: "Vietnam" },
    { href: "/italy", label: "Italy" },
];

const Home = () => {
    return (
        <main>
            <Hero
                countries={COUNTRIES}
                heading="Welcome to my travel recommendations"
                description="Discover the destinations for my recommendations, tips and tricks from my backpacker trip and vacations!"
                buttons={[
                    {
                        key: "destinations",
                        label: "Destinations",
                        // href: "#destinations",
                    },
                    
                ]}
            />
            <div className="bg-light-blue py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <section className="flex flex-col items-center gap-6 py-6 lg:gap-8 lg:py-8">

                    {/* HEADINGS */}
                    <div className="flex flex-col gap-2 px-6 pt-6 text-center">
                        <Heading level={1} size="md" variant="tertiary">
                            City breaks, road trips and local tips!
                        </Heading>
                        <Heading level={2} size="xl" id="destinations">
                            Explore my destinations
                        </Heading>
                    </div>

                    {/* DESTINATION CARDS */}
                    <div className="flex w-full max-w-360 flex-col gap-3 md:gap-5">
                        <div className="grid w-full gap-3 sm:grid-cols-2 md:gap-5">
                            <Link href="/">
                                <DestinationCard
                                    imageSrc="/destinations/australia.jpg"
                                    imageAlt="A scenic view of Australia"
                                    label="Australia"
                                    size="L"
                                />
                            </Link>

                            <Link href="/">
                                <DestinationCard
                                    imageSrc="/destinations/thailand.jpg"
                                    imageAlt="A scenic view of Thailand"
                                    label="Thailand"
                                    size="L"
                                />
                            </Link>
                        </div>
                        <div className="grid w-full gap-3 sm:grid-cols-3 md:gap-5">
                            <Link href="/">
                                <DestinationCard
                                    imageSrc="/destinations/indonesia.jpg"
                                    imageAlt="A scenic view of Indonesia"
                                    label="Indonesia"
                                    size="M"
                                />
                            </Link>
                            
                            <Link href="/">
                                <DestinationCard
                                    imageSrc="/destinations/vietnam.jpg"
                                    imageAlt="A scenic view of Vietnam"
                                    label="Vietnam"
                                    size="M"
                                />
                            </Link>
                            
                            <Link href="/">
                                <DestinationCard
                                    imageSrc="/destinations/italy.jpg"
                                    imageAlt="A scenic view of Italy"
                                    label="Italy"
                                    size="M"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <Button textColor="light" className="hover:text-text-primary">
                        See all the destinations
                    </Button>
                </section>
            </div>
        </main>
    );
};

Home.displayName = "Home";

export default Home;
