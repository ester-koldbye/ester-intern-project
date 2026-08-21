// City page: hero with jump-links to city-level sections (tips, recommendations, etc.)
import { Hero } from "@/components/modules/hero/hero";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { CardsSection } from "@/components/modules/cards-section/cards-section";
import { Recommendations, type RecommendationItem } from "@/components/modules/recommendations/recommendations";
import { TipCard, type TipCardProps } from "@/components/ui/molecules/tip-card/tip-card";

// SEO metadata for this route
export const metadata = {
  title: "Travel recommendations | City",
  description: "Welcome to the city page of my travel recommendations!",
};

const COUNTRIES = [
    { href: "/australia", label: "Australia" },
    { href: "/thailand", label: "Thailand" },
    { href: "/indonesia", label: "Indonesia" },
    { href: "/vietnam", label: "Vietnam" },
    { href: "/italy", label: "Italy" },
];

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
];
// Placeholder content for "My recommendations" — a flat list, not pre-split
// per category, so it's ready to be swapped for a fetched activity list per
// city; Recommendations both filters and maps it out into however many cards
// each category actually has.
const RECOMMENDATIONS: RecommendationItem[] = [
    {
        id: "wat-arun",
        category: "activities",
        imageSrc: "/destinations/thailand/bangkok.jpg",
        tag: "Temple",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Wat Arun",
        description: "One of Bangkok's most famous temples, especially striking around sunset.",
        // Links to the real activity detail page (gallery + info panel) — see src/app/activity/[slug]/page.tsx
        readMoreHref: "/activity/wat-arun",
        favorite: true,
    },
    {
        id: "island-hopping",
        category: "activities",
        imageSrc: "/destinations/thailand/phiphi.jpg",
        tag: "Boat trip",
        location: "Koh Phi Phi",
        locationHref: "https://maps.google.com",
        title: "Island hopping tour",
        readMoreHref: "/",
    },
    {
        id: "cooking-class",
        category: "activities",
        imageSrc: "/destinations/thailand/koh-samui.jpg",
        tag: "Class",
        location: "Chiang Mai",
        locationHref: "https://maps.google.com",
        title: "Thai cooking class",
        readMoreHref: "/",
    },
    // Where to eat: nothing marked as a favorite yet — renders as a plain
    // "Where to eat" heading over a hero+stack of everything, no "Other" split.
    {
        id: "night-bazaar",
        category: "where-to-eat",
        imageSrc: "/destinations/thailand/bangkok.jpg",
        tag: "Famous street",
        location: "Bangkok",
        locationHref: "https://maps.google.com",
        title: "Night bazaar street food",
        readMoreHref: "/",
    },
    // Going out: one favorite and nothing else — matches Figma's own "Going
    // out spots" example (a single hero card, no "Other" section).
    {
        id: "full-moon-party",
        category: "going-out",
        imageSrc: "/destinations/thailand/koh-phangan.jpg",
        tag: "Party",
        location: "Koh Phangan",
        locationHref: "https://maps.google.com",
        title: "Full Moon Party",
        readMoreHref: "/",
        favorite: true,
    },
    {
        id: "riverside-hostel",
        category: "accommodations",
        imageSrc: "/destinations/thailand/krabi.JPG",
        tag: "Hostel",
        location: "Krabi",
        locationHref: "https://maps.google.com",
        title: "Riverside hostel",
        readMoreHref: "/",
    },
];

const City = () => {
    return (
        <main>
            {/* Hero section with page intro and jump-links to sections below */}
            <Hero
                countries={COUNTRIES}
                heading="City page"
                description="This is the city page."
                buttons={[
                    { key: "tips", label: "Tips", href: "#tips", },
                    { key: "recommendations", label: "Recommendations", href: "#recommendations", },
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

            {/* MY RECOMMENDATIONS SECTION — activities/where-to-eat/going-out/accommodations, filterable by category */}
            <Recommendations id="recommendations" items={RECOMMENDATIONS} />

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
