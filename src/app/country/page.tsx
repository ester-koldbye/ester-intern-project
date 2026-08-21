import { Hero } from "@/components/modules/hero/hero";
import { Tips } from "@/components/modules/tips/tips";
import { FoodDrinks } from "@/components/modules/food-drinks/food-drinks";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { DestinationCard } from "@/components/ui/molecules/destination-card/destination-card";
import Link from "next/link";

export const metadata = {
  title: "Travel recommendations | Country",
  description: "Welcome to the country page of my travel recommendations!",
};

// BREADCRUMB
const ITEMS = [
    { href: "/", label: "Home" },
    { href: "/country", label: "Country" },
];

const Country = () => {
    return (
        <main>
            {/* Hero section with page intro and jump-links */}
            <Hero
                countries={[]}
                heading="Country page"
                description="This is the country page."
                buttons={[
                    { key: "tips", label: "Tips", href: "#tips", },
                    { key: "food-drinks", label: "Food & Drinks", href: "#food-drinks", },
                    { key: "cities", label: "Cities", href: "#cities", },
                    { key: "what-did-we-miss", label: "What We Missed", href: "#what-did-we-miss", },
                ]}
            />
            <div className="py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <Breadcrumbs items={ITEMS} />
            </div>
            <Tips id="tips"/>

            <FoodDrinks id="food-drinks" />

            {/* Cities visited in this country, laid out as a 3-column image grid */}
            <div className="bg-light-blue py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <section className="flex flex-col items-center gap-6 py-6 lg:gap-8 lg:py-8">
                    <div className="px-6 pt-6 text-center">
                        <Heading level={2} size="xl" id="destinations">
                            Cities I visited
                        </Heading>
                    </div>

                    <div className="flex flex-col md:flex-row w-full max-w-360 gap-3 md:gap-5">
                        {/* Column 1 */}
                        <div className="grid w-full gap-3 md:gap-5">
                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/bangkok.jpg"
                                    imageAlt="A scenic view of Bangkok"
                                    label="Bangkok"
                                    size="M"
                                />
                            </Link>

                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/koh-samui.jpg"
                                    imageAlt="A scenic view of Koh Samui"
                                    label="Koh Samui"
                                    size="M"
                                />
                            </Link>
                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/koh-phangan.jpg"
                                    imageAlt="A scenic view of Koh Phangan"
                                    label="Koh Phangan"
                                    size="L"
                                />
                            </Link>
                        </div>
                        {/* Column 2 */}
                        <div className="grid w-full gap-3 md:gap-5">
                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/koh-tao.jpg"
                                    imageAlt="A scenic view of Koh Tao"
                                    label="Koh Tao"
                                    size="L"
                                    className="md:w-xl h-full"
                                />
                            </Link>
                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/krabi.jpg"
                                    imageAlt="A scenic view of Krabi"
                                    label="Krabi"
                                    size="L"
                                    className="md:w-xl h-full"
                                />
                            </Link>
                        </div>
                        {/* Column 3 */}
                        <div className="grid w-full h-full gap-3 md:gap-5">
                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/phiphi.jpg"
                                    imageAlt="A scenic view of Phi Phi"
                                    label="Phi Phi"
                                    size="M"
                                    className="h-full"
                                />
                            </Link>

                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/pai.jpg"
                                    imageAlt="A scenic view of Pai"
                                    label="Pai"
                                    size="M"
                                    className="h-full"
                                />
                            </Link>
                            <Link href="#">
                                <DestinationCard
                                    imageSrc="/destinations/thailand/chiang-mai.jpg"
                                    imageAlt="A scenic view of Chiang Mai"
                                    label="Chiang Mai"
                                    size="M"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            
            <Tips id="what-we-miss"/>
        </main>
    );
};

Country.displayName = "Country";

export default Country;
