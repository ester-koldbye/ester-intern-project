import type { FoodDrinksItem } from "@/components/modules/food-drinks/food-drinks";
import type { RecommendationItem } from "@/components/modules/recommendations/recommendations";
import type { TipCardProps } from "@/components/ui/molecules/tip-card/tip-card";

/**
 * Mock "database" for the whole destination hierarchy — home page ->
 * country (`/[country]`) -> city (`/[country]/[city]`) — standing in for a
 * future API/CMS call, same convention as `src/lib/activities.ts`.
 *
 * Every country/city is a "stub" (slug, name, thumbnail) so the home page's
 * destination grid, a country's "Cities I visited" grid, and every page's
 * nav dropdown can always list and link to it. `content` is separate and
 * optional: a stub with `content` renders its full page (tips, food &
 * drinks, recommendations, ...); a stub without it renders a "coming soon"
 * page instead of 404ing, since the destination is real, its write-up just
 * isn't ready yet. Only Thailand/Bangkok has content today — swapping any of
 * this for real fetched data later doesn't change the pages that read it.
 */

export type TipItem = Pick<TipCardProps, "title" | "description">;

export type DestinationSize = "S" | "M" | "L";

export type CountryContent = {
    tips: TipItem[];
    foodDrinks: FoodDrinksItem[];
    whatDidWeMiss: TipItem[];
};

export type Country = {
    slug: string;
    name: string;
    imageSrc: string;
    imageAlt?: string;
    size: DestinationSize;
    content?: CountryContent;
};

export type CityContent = {
    tips: TipItem[];
    recommendations: RecommendationItem[];
    whatDidWeMiss: TipItem[];
};

export type City = {
    slug: string;
    countrySlug: string;
    name: string;
    imageSrc: string;
    imageAlt?: string;
    size: DestinationSize;
    content?: CityContent;
};

const COUNTRIES: Country[] = [
    {
        slug: "thailand",
        name: "Thailand",
        imageSrc: "/destinations/thailand.JPG",
        imageAlt: "A scenic view of Thailand",
        size: "L",
        content: {
            tips: [
                {
                    title: "Dont book everything",
                    description: "Not everything needs to be booked in advance",
                },
                {
                    title: "Try streetfood",
                    description: "Try the streetfood a local spots - Its so good and way way cheaper",
                },
                {
                    title: "Eat spicy food at home",
                    description: "Before you go, train yourself to eat spicy food (its for your own good)",
                },
                {
                    title: "Apps for transportation",
                    description: "Grab (cheap transport)\n\nBold (cheap transport, but it's often more expensive than grab)",
                },
                {
                    title: "Apps for accomendation",
                    description: "Hostelword (for booking hostels and getting to know the travelers in the hostels that you are staying at)\n\nAgoda (for booking cheap hotels)",
                },
            ],
            foodDrinks: [
                { title: "Green Curry", points: ["Typical thai dish with rice on the rice.", "Can be very spicy."] },
                { title: "Pad Kaprow", points: ["Stir-fried holy basil, usually with pork or chicken.", "Ask for it without egg if you're not into runny yolks."] },
                { title: "Tom Yum Soup", points: ["Hot and sour soup, usually with shrimp.", "One of the spicier options on this list."] },
                { title: "Mango Sticky Rice", points: ["Sweet, coconutty, and everywhere for a reason."] },
                { title: "Red Curry", points: ["Sweet, coconutty, and everywhere for a reason."] },
                { title: "Coconut Soup", points: ["Sweet, coconutty, and everywhere for a reason."] },
                { title: "Khao Soi", points: ["Sweet, coconutty, and everywhere for a reason."] },
                { title: "Massam Curry", points: ["Sweet, coconutty, and everywhere for a reason."] },
                { title: "Panang Curry", points: ["Sweet, coconutty, and everywhere for a reason."] },
            ],
            whatDidWeMiss: [
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
            ],
        },
    },
    {
        slug: "australia",
        name: "Australia",
        imageSrc: "/destinations/australia.JPG",
        imageAlt: "A scenic view of Australia",
        size: "L",
    },
    {
        slug: "indonesia",
        name: "Indonesia",
        imageSrc: "/destinations/indonesia.JPG",
        imageAlt: "A scenic view of Indonesia",
        size: "M",
    },
    {
        slug: "vietnam",
        name: "Vietnam",
        imageSrc: "/destinations/vietnam.JPG",
        imageAlt: "A scenic view of Vietnam",
        size: "M",
    },
    {
        slug: "italy",
        name: "Italy",
        imageSrc: "/destinations/italy.JPG",
        imageAlt: "A scenic view of Italy",
        size: "M",
    },
];

const CITIES: City[] = [
    {
        slug: "bangkok",
        countrySlug: "thailand",
        name: "Bangkok",
        imageSrc: "/destinations/thailand/bangkok.jpg",
        imageAlt: "A scenic view of Bangkok",
        size: "M",
        content: {
            tips: [
                {
                    title: "Dont book everything",
                    description: "Not everything needs to be booked in advance",
                },
                {
                    title: "Try streetfood",
                    description: "Try the streetfood a local spots - Its so good and way way cheaper",
                },
                {
                    title: "Eat spicy food at home",
                    description: "Before you go, train yourself to eat spicy food (its for your own good)",
                },
            ],
            recommendations: [
                {
                    id: "wat-arun",
                    category: "activities",
                    imageSrc: "/destinations/thailand/bangkok.jpg",
                    tag: "Temple",
                    location: "Bangkok",
                    locationHref: "https://maps.google.com",
                    title: "Wat Arun",
                    description: "One of Bangkok's most famous temples, especially striking around sunset.",
                    // Links to the real activity detail page (gallery + info panel) — see src/app/[country]/[city]/[activity]/page.tsx
                    readMoreHref: "/thailand/bangkok/wat-arun",
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
            ],
            whatDidWeMiss: [
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
            ],
        },
    },
    { slug: "koh-samui", countrySlug: "thailand", name: "Koh Samui", imageSrc: "/destinations/thailand/koh-samui.jpg", imageAlt: "A scenic view of Koh Samui", size: "M" },
    { slug: "koh-phangan", countrySlug: "thailand", name: "Koh Phangan", imageSrc: "/destinations/thailand/koh-phangan.jpg", imageAlt: "A scenic view of Koh Phangan", size: "L" },
    { slug: "koh-tao", countrySlug: "thailand", name: "Koh Tao", imageSrc: "/destinations/thailand/koh-tao.JPG", imageAlt: "A scenic view of Koh Tao", size: "L" },
    { slug: "krabi", countrySlug: "thailand", name: "Krabi", imageSrc: "/destinations/thailand/krabi.JPG", imageAlt: "A scenic view of Krabi", size: "L" },
    { slug: "phi-phi", countrySlug: "thailand", name: "Phi Phi", imageSrc: "/destinations/thailand/phiphi.jpg", imageAlt: "A scenic view of Phi Phi", size: "M" },
    { slug: "pai", countrySlug: "thailand", name: "Pai", imageSrc: "/destinations/thailand/pai.JPG", imageAlt: "A scenic view of Pai", size: "M" },
    { slug: "chiang-mai", countrySlug: "thailand", name: "Chiang Mai", imageSrc: "/destinations/thailand/chiang-mai.jpg", imageAlt: "A scenic view of Chiang Mai", size: "M" },
];

export const getAllCountries = async (): Promise<Country[]> => COUNTRIES;

export const getCountry = async (slug: string): Promise<Country | undefined> =>
    COUNTRIES.find((country) => country.slug === slug);

export const getCountrySlugs = async (): Promise<string[]> =>
    COUNTRIES.map((country) => country.slug);

export const getCitiesForCountry = async (countrySlug: string): Promise<City[]> =>
    CITIES.filter((city) => city.countrySlug === countrySlug);

export const getCity = async (countrySlug: string, citySlug: string): Promise<City | undefined> =>
    CITIES.find((city) => city.countrySlug === countrySlug && city.slug === citySlug);

export const getCitySlugParams = async (): Promise<{ country: string; city: string }[]> =>
    CITIES.map((city) => ({ country: city.countrySlug, city: city.slug }));

/** Shape `Navigation`/`Hero`'s own `countries` prop expects. */
export const getNavCountries = async (): Promise<{ href: string; label: string }[]> =>
    COUNTRIES.map((country) => ({ href: `/${country.slug}`, label: country.name }));
