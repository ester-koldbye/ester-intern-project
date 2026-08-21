// City page: hero with jump-links to city-level sections (tips, activities, etc.)
import { Hero } from "@/components/modules/hero/hero";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { CardsSection } from "@/components/modules/cards-section/cards-section";
import { TipCard, type TipCardProps } from "@/components/ui/molecules/tip-card/tip-card";

// SEO metadata for this route
export const metadata = {
  title: "Travel recommendations | City",
  description: "Welcome to the city page of my travel recommendations!",
};

// BREADCRUMB
const ITEMS = [
    { href: "/", label: "Home" },
    { href: "/country", label: "Country" },
    { href: "/city", label: "City" },
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
const City = () => {
    return (
        <main>
            {/* Hero section with page intro and jump-links to sections below */}
            <Hero
                countries={[]}
                heading="City page"
                description="This is the city page."
                buttons={[
                    { key: "tips", label: "Tips", href: "#tips", },
                    { key: "activities", label: "Activities", href: "#activities", },
                    { key: "going-out", label: "Going out", href: "#going-out", },
                    { key: "where-to-eat", label: "Where to eat", href: "#where-to-eat", },
                    { key: "accommondation", label: "Accommondation", href: "#accommondation", },
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

            {/* TODO: activities, going-out, where-to-eat and accommondation sections are still missing */}

            
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

City.displayName = "City";

export default City;
