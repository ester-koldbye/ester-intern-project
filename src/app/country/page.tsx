import { Hero } from "@/components/modules/hero/hero";
import { FoodDrinks, type FoodDrinksItem } from "@/components/modules/food-drinks/food-drinks";
import { CardsSection } from "@/components/modules/cards-section/cards-section";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { Heading } from "@/components/ui/atoms/heading/heading";
import { DestinationCard } from "@/components/ui/molecules/destination-card/destination-card";
import { TipCard, type TipCardProps } from "@/components/ui/molecules/tip-card/tip-card";
import Link from "next/link";

// Country page: hero, tips, food & drinks, cities visited, and what we missed

// SEO metadata for this route
export const metadata = {
  title: "Travel recommendations | Country",
  description: "Welcome to the country page of my travel recommendations!",
};

// BREADCRUMB
const ITEMS = [
    { href: "/", label: "Home" },
    { href: "/country", label: "Country" },
];

// Placeholder content for "What did we miss" — a flat list, not pre-grouped
// into rows, so it can later be swapped for whatever a fetch/CMS call returns
// and CardsSection will still map it out into the right number of cards.
type MissedItem = Pick<TipCardProps, "title" | "description">;

const WHAT_WE_MISSED: MissedItem[] = [
    {
        title: "Better rain gear",
        description: "Monsoon season hit harder than expected — pack a proper poncho, not just an umbrella.",
    },
    {
        title: "Motorbike lessons before arriving",
        description: "Renting one is cheap and common, but we wish we'd practiced before hitting real traffic.",
    },
    {
        title: "More local SIM data",
        description: "We kept running out of data mid-trip — get a bigger plan than you think you need.",
    },
];

// Placeholder content for "Foods & Drinks to try" — a flat list, ready to be
// swapped for a fetched dish list; FoodDrinks maps it into however many
// columns/rows of accordion entries the data calls for.
const FOOD_DRINKS: FoodDrinksItem[] = [
    {
        title: "Green Curry",
        points: ["Typical thai dish with rice on the rice.", "Can be very spicy."],
    },
    {
        title: "Pad Kaprow",
        points: ["Stir-fried holy basil, usually with pork or chicken.", "Ask for it without egg if you're not into runny yolks."],
    },
    {
        title: "Tom Yum Soup",
        points: ["Hot and sour soup, usually with shrimp.", "One of the spicier options on this list."],
    },
    {
        title: "Mango Sticky Rice",
        points: ["Sweet, coconutty, and everywhere for a reason."],
    },
    {
        title: "Red Curry",
        points: ["Sweet, coconutty, and everywhere for a reason."],
    },
    {
        title: "Coconut Soup",
        points: ["Sweet, coconutty, and everywhere for a reason."],
    },
    {
        title: "Khao Soi",
        points: ["Sweet, coconutty, and everywhere for a reason."],
    },
    {
        title: "Massam Curry",
        points: ["Sweet, coconutty, and everywhere for a reason."],
    },
    {
        title: "Panang Curry",
        points: ["Sweet, coconutty, and everywhere for a reason."],
    },
];

type TipItem = Pick<TipCardProps, "title" | "description">;
const TIPS: TipItem[] = [
    {
        title: "Dont book everything",
        description: "Not everything needs to be booked in advance",
    },
    {
        title: "Try streetfood",
        description:
            "Try the streetfood a local spots - Its so good and way way cheaper",
    },
    {
        title: "Eat spicy food at home",
        description:
            "Before you go, train yourself to eat spicy food (its for your own good)",
    },

    {
        title: "Apps for transportation",
        description:
            "Grab (cheap transport)\n\nBold (cheap transport, but it's often more expensive than grab)",
    },
    {
        title: "Apps for accomendation",
        description:
            "Hostelword (for booking hostels and getting to know the travelers in the hostels that you are staying at)\n\nAgoda (for booking cheap hotels)",
    },
];

const Country = () => {
    return (
        <main>
            {/* HERO SECTION */}
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

            {/* TIPS SECTION */}
            <CardsSection
                id="tips"
                heading="Tips"
                items={TIPS}
                renderItem={(item) => (
                    <TipCard title={item.title} description={item.description} />
                )}
            />

            {/* FOOD & DRINKS SECTION */}
            <FoodDrinks id="food-drinks" items={FOOD_DRINKS} />

            {/* CITIES VISITIED SECTION - laid out as a 3-column image grid */}
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

            {/* WHAT DID WE MISS SECTION */}
            <CardsSection
                id="what-did-we-miss"
                heading="What did we miss?"
                items={WHAT_WE_MISSED}
                renderItem={(item) => (
                    <TipCard title={item.title} description={item.description} />
                )}
            />
        </main>
    );
};

Country.displayName = "Country";

export default Country;
