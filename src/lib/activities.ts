import type {
    ActivityGalleryImage,
    ActivityInfoItem,
} from "@/components/modules/activity-gallery/activity-gallery";

/**
 * Mock "database" for single-activity pages, nested under their city —
 * `/[country]/[city]/[activity]`, e.g. `/thailand/bangkok/wat-arun` —
 * standing in for a future API/CMS call. Shaped so swapping `getActivity`'s
 * body for a real `fetch` is a drop-in change — callers already `await` it
 * and handle a possible `undefined` (not found), exactly like a network call
 * would.
 *
 * `countrySlug`/`citySlug` are required (not just a display detail) since
 * they're part of the activity's own URL and identity: the same `slug`
 * could exist under two different cities without colliding, the way
 * `getCity`'s `(countrySlug, citySlug)` pair already works in
 * `src/lib/destinations.ts`.
 *
 * All entries below "Wat Arun" are generated from the same trip-notes
 * export as `src/lib/destinations.ts` — one per activity/restaurant/going-out
 * spot/place stayed at, so every `Recommendations` card across the site has
 * somewhere real to link its "Read more" button. Most only have a couple of
 * description bullets (that's genuinely all the notes say) and reuse their
 * city's own photo for `images`, since per-activity photos aren't in
 * `public/` yet.
 */

export type Activity = {
    slug: string;
    /** Which country/city (see `src/lib/destinations.ts`) this activity belongs to — makes up its URL together with `slug`. */
    countrySlug: string;
    citySlug: string;
    heading: string;
    images: ActivityGalleryImage[];
    info: ActivityInfoItem[];
    description: string[];
    pros?: string[];
    cons?: string[];
    /** Address/place name for the "About" section's map — see `ActivityAbout`. */
    mapQuery: string;
};

const ACTIVITIES: Activity[] = [
    {
        slug: "wat-arun",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Wat Arun",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Wat Arun temple at sunset",
            },
            { src: "/destinations/thailand/chiang-mai.jpg", alt: "" },
            { src: "/destinations/thailand/koh-tao.JPG", alt: "" },
            { src: "/destinations/thailand/pai.JPG", alt: "" },
            { src: "/destinations/thailand/krabi.JPG", alt: "" },
            { src: "/destinations/thailand/phiphi.jpg", alt: "" },
        ],
        info: [
            { id: "type", typeTitle: "Type", title: "Temple" },
            { id: "visited", typeTitle: "Visited", title: "December 2022" },
            {
                id: "price",
                typeTitle: "Price",
                title: "We didn't pay",
                description: "But it does cost money",
            },
            {
                id: "dresscode",
                typeTitle: "Dresscode",
                title: "You have do cover up",
            },
        ],
        description: [
            "Very pretty temple.",
            "Perfect sunset spot.",
            "You can take the local boat taxa to get there.",
        ],
        pros: [
            "Free to look at from outside",
            "Right on the river, great photo spot",
            "Rarely crowded before 9am",
        ],
        cons: [
            "Steep steps if you climb the central prang",
            "Strict dress code enforced at the entrance",
        ],
        mapQuery: "Wat Arun, Bangkok, Thailand",
    },
    {
        slug: "khao-san-road",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Khao San Road",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Khao San Road",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Famous street",
            },
        ],
        description: [
            "Lots of markets during the day",
            "Huge nightlife at night (be careful)",
        ],
        mapQuery: "Khao San Road, Bangkok, Thailand",
    },
    {
        slug: "the-sleeping-buddha",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "The Sleeping Buddha",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "The Sleeping Buddha",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["Very beautiful temple", "You need to wear a sarong"],
        mapQuery: "The Sleeping Buddha, Bangkok, Thailand",
    },
    {
        slug: "floating-market",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Floating market",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Floating market",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Floating market",
            },
        ],
        description: [
            "There are tons of different ones",
            "We went to two different ones and weren't sure if they were the right ones haha",
        ],
        mapQuery: "Floating market, Bangkok, Thailand",
    },
    {
        slug: "corgi-in-the-garden",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "CORGI IN THE GARDEN",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "CORGI IN THE GARDEN",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Dog café",
            },
        ],
        description: [
            "Expensive, but 100% worth it",
            "A cafe with lots of corgis you can just hang out with",
        ],
        mapQuery: "CORGI IN THE GARDEN, Bangkok, Thailand",
    },
    {
        slug: "chinatown-bangkok-yaowarat",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Chinatown Bangkok (Yaowarat)",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Chinatown Bangkok (Yaowarat)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "Lots of street food",
            "We weren't brave enough to try any of the food",
            "We recommend going on a guided tour to try the food",
        ],
        mapQuery: "Chinatown Bangkok (Yaowarat), Bangkok, Thailand",
    },
    {
        slug: "the-grand-palace",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "The Grand Palace",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "The Grand Palace",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Palace",
            },
        ],
        description: [
            "Many beautiful temples",
            "A bit expensive but worth it",
            "You need to wear a sarong",
        ],
        mapQuery: "The Grand Palace, Bangkok, Thailand",
    },
    {
        slug: "rajadamnern-muay-thai-stadium-thaiboksning",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Rajadamnern Muay Thai Stadium (Thaiboksning)",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Rajadamnern Muay Thai Stadium (Thaiboksning)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Stadium",
            },
        ],
        description: [
            "A bit expensive, but super fun and definitely worth it",
            "Buy the wristband so you get free refills",
        ],
        mapQuery:
            "Rajadamnern Muay Thai Stadium (Thaiboksning), Bangkok, Thailand",
    },
    {
        slug: "iconsiam",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "ICONSIAM",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "ICONSIAM",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Mall",
            },
        ],
        description: [
            "Perfect for shopping",
            "We ate at one of their rooftop restaurants, with a beautiful view of Bangkok's skyline",
        ],
        mapQuery: "ICONSIAM, Bangkok, Thailand",
    },
    {
        slug: "b-dtur-i-kanalerne",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Bådtur i kanalerne",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Bådtur i kanalerne",
            },
        ],
        info: [],
        description: [
            "A bit expensive but worth it",
            "You sail around Bangkok's canals and see a lot",
        ],
        mapQuery: "Bådtur i kanalerne, Bangkok, Thailand",
    },
    {
        slug: "khao-san-road-2",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Khao San Road",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Khao San Road",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Famous street",
            },
        ],
        description: [
            "Go out here in the evening, but watch out for what you drink",
            "Super strong drinks, but pretty cheap",
        ],
        mapQuery: "Khao San Road, Bangkok, Thailand",
    },
    {
        slug: "7-11",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "7/11",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "7/11",
            },
        ],
        info: [],
        description: ["We mostly ate street food or 7-Eleven"],
        mapQuery: "7/11, Bangkok, Thailand",
    },
    {
        slug: "suneta-hostel-khaosan",
        countrySlug: "thailand",
        citySlug: "bangkok",
        heading: "Suneta Hostel Khaosan",
        images: [
            {
                src: "/destinations/thailand/bangkok.jpg",
                alt: "Suneta Hostel Khaosan",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "4 nights",
            },
        ],
        description: [],
        mapQuery: "Suneta Hostel Khaosan, Bangkok, Thailand",
        pros: ["Super friendly staff", "Breakfast was included"],
        cons: [
            "The breakfast wasn't good",
            "The safety deposit boxes were tiny",
        ],
    },
    {
        slug: "overlap-stone",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "Overlap Stone",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "Overlap Stone",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "Must see in Koh Samui.",
            "Insanely hard to get up there, but sooo cool and definitely worth it.",
        ],
        mapQuery: "Overlap Stone, Koh Samui, Thailand",
    },
    {
        slug: "chaweng-beach",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "Chaweng Beach",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "Chaweng Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Decent enough beach"],
        mapQuery: "Chaweng Beach, Koh Samui, Thailand",
    },
    {
        slug: "big-buddha-temple-wat-phra-yai",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "Big Buddha Temple (Wat Phra Yai)",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "Big Buddha Temple (Wat Phra Yai)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: [
            "Very beautiful temple",
            "We didn't pay for entry",
            "You need to wear a sarong",
        ],
        mapQuery: "Big Buddha Temple (Wat Phra Yai), Koh Samui, Thailand",
    },
    {
        slug: "phra-sangkachai-wat-plai-laem-statue-of-the-chinese-laughing-buddha",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading:
            "Phra Sangkachai Wat Plai Laem (Statue Of The Chinese Laughing Buddha)",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "Phra Sangkachai Wat Plai Laem (Statue Of The Chinese Laughing Buddha)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["One of the three temples on the lake"],
        mapQuery:
            "Phra Sangkachai Wat Plai Laem (Statue Of The Chinese Laughing Buddha), Koh Samui, Thailand",
    },
    {
        slug: "wat-plai-laem",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "Wat Plai Laem",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "Wat Plai Laem",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["One of the three temples on the lake"],
        mapQuery: "Wat Plai Laem, Koh Samui, Thailand",
    },
    {
        slug: "3-templer-statue-of-the-goddess-guanyin",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "3 templer: Statue of the goddess Guanyin",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "3 templer: Statue of the goddess Guanyin",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["One of the three temples on the lake"],
        mapQuery:
            "3 templer: Statue of the goddess Guanyin, Koh Samui, Thailand",
    },
    {
        slug: "massage",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "Massage",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "Massage",
            },
        ],
        info: [],
        description: ["Just google for massage places"],
        mapQuery: "Massage, Koh Samui, Thailand",
    },
    {
        slug: "p-and-t-guesthouse-and-restaurant",
        countrySlug: "thailand",
        citySlug: "koh-samui",
        heading: "P&T Guesthouse & Restaurant",
        images: [
            {
                src: "/destinations/thailand/koh-samui.jpg",
                alt: "P&T Guesthouse & Restaurant",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "P&T Guesthouse & Restaurant, Koh Samui, Thailand",
        pros: [
            "You could get laundry done, rent scooters, book everything through them",
            "Sweet staff",
        ],
        cons: [
            "The rooms just weren't nice",
            "The bathrooms just weren't nice",
            "There was no soap in the bathrooms",
            "Breakfast wasn't included",
        ],
    },
    {
        slug: "amsterdam-bar",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Amsterdam bar",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Amsterdam bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: [
            "Sunset spot",
            "Really great sunset spot but there are a lot of people here",
        ],
        mapQuery: "Amsterdam bar, Koh Phangan, Thailand",
    },
    {
        slug: "haad-rin",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Haad Rin",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Haad Rin",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Good beach when it's clean"],
        mapQuery: "Haad Rin, Koh Phangan, Thailand",
    },
    {
        slug: "rin-nai-beach",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Rin Nai Beach",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Rin Nai Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Sunset spot", "Kind of hidden"],
        mapQuery: "Rin Nai Beach, Koh Phangan, Thailand",
    },
    {
        slug: "full-moon-party",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Full Moon Party",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Full Moon Party",
            },
        ],
        info: [],
        description: [
            "Buy the ticket there",
            "Held at Haad Rin Beach",
            "Fun, though overhyped",
        ],
        mapQuery: "Full Moon Party, Koh Phangan, Thailand",
    },
    {
        slug: "sand-and-tan",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Sand & Tan",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Sand & Tan",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Delicious restaurant, but quite expensive",
            "More western-style food",
        ],
        mapQuery: "Sand & Tan, Koh Phangan, Thailand",
    },
    {
        slug: "bt-restaurant-koh-phangan",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Bt. Restaurant koh phangan",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Bt. Restaurant koh phangan",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Really good and cheap thai food"],
        mapQuery: "Bt. Restaurant koh phangan, Koh Phangan, Thailand",
    },
    {
        slug: "the-cabin-bar-and-grill",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "The Cabin Bar & Grill",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "The Cabin Bar & Grill",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Decent food, but a bit pricey we thought",
            "Really beautiful location",
        ],
        mapQuery: "The Cabin Bar & Grill, Koh Phangan, Thailand",
    },
    {
        slug: "haad-rin-full-moon-village",
        countrySlug: "thailand",
        citySlug: "koh-phangan",
        heading: "Haad Rin full Moon village",
        images: [
            {
                src: "/destinations/thailand/koh-phangan.jpg",
                alt: "Haad Rin full Moon village",
            },
        ],
        info: [
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "4 nights",
            },
        ],
        description: [],
        mapQuery: "Haad Rin full Moon village, Koh Phangan, Thailand",
        pros: [
            "Super sweet and friendly guy",
            "Close to the center and the beach",
            "We had a balcony",
            "Newly renovated",
        ],
        cons: [
            "The beds were really hard",
            "We had gross neighbors who used our toilet",
            "Pretty expensive for the room",
            "The toilets were out in the hallway",
            "Expensive for what we got",
            "Breakfast wasn't included",
            "Didn't look like a hotel",
        ],
    },
    {
        slug: "sun-suwan-360-view-and-sky-bar",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Sun Suwan 360° View & Sky Bar",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Sun Suwan 360° View & Sky Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar / Viewpoint",
            },
        ],
        description: [
            "Very beautiful viewpoint",
            "You have to pay to get into the viewpoint",
        ],
        mapQuery: "Sun Suwan 360° View & Sky Bar, Koh Tao, Thailand",
    },
    {
        slug: "la-bondana-diving",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "La Bondana Diving",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "La Bondana Diving",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Dive center",
            },
        ],
        description: [
            "Best place to get your diving certificate on Koh Tao",
            "Very cheap with a lot included",
            "Super super nice",
        ],
        mapQuery: "La Bondana Diving, Koh Tao, Thailand",
    },
    {
        slug: "queen-s-cabaret",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Queen's Cabaret",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Queen's Cabaret",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Cabaret/nightclub",
            },
        ],
        description: [
            "Rretty cheap and you get a free drink included when you buy a ticket",
            "Really good energy",
            "A must on Koh Tao",
        ],
        mapQuery: "Queen's Cabaret, Koh Tao, Thailand",
    },
    {
        slug: "koh-tao-mini-golf",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Koh Tao Mini Golf",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Koh Tao Mini Golf",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Mini golf course",
            },
        ],
        description: ["Super cozy, though it was a bit run down"],
        mapQuery: "Koh Tao Mini Golf, Koh Tao, Thailand",
    },
    {
        slug: "sairee-beach",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Sairee Beach",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Sairee Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "Main beach",
            "Very long so lots of spots to lay down",
            "Free",
        ],
        mapQuery: "Sairee Beach, Koh Tao, Thailand",
    },
    {
        slug: "shark-bay",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Shark Bay",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Shark Bay",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "Very beautiful beach",
            "Had to pay to get there, but worth it",
        ],
        mapQuery: "Shark Bay, Koh Tao, Thailand",
    },
    {
        slug: "mango-bay",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Mango Bay",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Mango Bay",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "Hard to get to, but a very cozy beach",
            "Free to get in",
        ],
        mapQuery: "Mango Bay, Koh Tao, Thailand",
    },
    {
        slug: "nang-yuan-island",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Nang Yuan Island",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Nang Yuan Island",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Island",
            },
        ],
        description: [
            "Viewpoint on a neighboring island to Koh Tao",
            "You take a taxi boat to get there",
            "You pay to enter the island",
            "You're not allowed to bring plastic bottles onto the island",
        ],
        mapQuery: "Nang Yuan Island, Koh Tao, Thailand",
    },
    {
        slug: "massage",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Massage",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Massage",
            },
        ],
        info: [],
        description: ["Super cheap here"],
        mapQuery: "Massage, Koh Tao, Thailand",
    },
    {
        slug: "jungle-party",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Jungle Party",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Jungle Party",
            },
        ],
        info: [],
        description: [
            "Doesn't always happen, but it's a must if there's a jungle party while you're there",
            "Little hack: bring hand sanitizer and wipe off the 'used' mark for the free drink, so you can get free drinks all night.",
        ],
        mapQuery: "Jungle Party, Koh Tao, Thailand",
    },
    {
        slug: "fishbowl-beach-bar",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Fishbowl Beach Bar",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Fishbowl Beach Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant / Bar",
            },
        ],
        description: [
            "Restaurant that turns into a club at 10pm",
            "The main place to party",
            "Closes pretty early",
            "We had a great time every time we were there",
        ],
        mapQuery: "Fishbowl Beach Bar, Koh Tao, Thailand",
    },
    {
        slug: "995-roasted-duck",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "995 Roasted Duck",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "995 Roasted Duck",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Best food on Koh Tao",
            "Cheapest food (17 kr for a dish and a large beer)",
            "We ate there aaall the time",
            "Come early since it's super popular",
        ],
        mapQuery: "995 Roasted Duck, Koh Tao, Thailand",
    },
    {
        slug: "johns-mad",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Johns mad",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Johns mad",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Street food",
            },
        ],
        description: [
            "Perfect place for late-night food.",
            "John is open from 17-3 maybe",
            "The food is so good that he says he'll refund you if you don't like it.",
        ],
        mapQuery: "Johns mad, Koh Tao, Thailand",
    },
    {
        slug: "lucky-house-koh-tao",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "Lucky House Koh Tao",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "Lucky House Koh Tao",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Lucky House Koh Tao, Koh Tao, Thailand",
        pros: [
            "Good beds",
            "Ok close to everything",
            "Okay sweet staff, they were friendly",
            "Had a balcony",
        ],
        cons: [
            "The bathroom was kind of gross, but it wasn't the worst we've experienced",
            "Breakfast wasn't included",
        ],
    },
    {
        slug: "la-bombona-diving-lbd",
        countrySlug: "thailand",
        citySlug: "koh-tao",
        heading: "La Bombona Diving (LBD)",
        images: [
            {
                src: "/destinations/thailand/koh-tao.JPG",
                alt: "La Bombona Diving (LBD)",
            },
        ],
        info: [
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "La Bombona Diving (LBD), Koh Tao, Thailand",
        pros: [
            "Super sweet staff",
            "Located right where we were diving",
            "We had our own bungalow",
        ],
        cons: ["A lot of noise in the evenings", "The room got insanely hot"],
    },
    {
        slug: "krabi-elephant-house-sanctuary",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "Krabi Elephant HOUSE Sanctuary",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "Krabi Elephant HOUSE Sanctuary",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Animal shelter",
            },
        ],
        description: [
            "Really good elephant sanctuary",
            "You can't ride the elephants",
            "You feed the elephants, take pictures with them, give them a mud bath, wash them in the lake, and get fruit and water yourself too, then it's back to the hostel.",
            "Transport is included in the price",
        ],
        mapQuery: "Krabi Elephant HOUSE Sanctuary, Krabi, Thailand",
    },
    {
        slug: "khongthomnuea-hot-stream-waterfall-krabi-hot-springs",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "KhongThomNuea Hot Stream Waterfall Krabi (Hot springs)",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "KhongThomNuea Hot Stream Waterfall Krabi (Hot springs)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "National park",
            },
        ],
        description: [
            "Tourists had to pay entry",
            "Really lovely warm water",
            "Not too many tourists",
            "Do it while it's still warm right before heading home — it's not nice riding home in wet swimwear in the evening.",
        ],
        mapQuery:
            "KhongThomNuea Hot Stream Waterfall Krabi (Hot springs), Krabi, Thailand",
    },
    {
        slug: "emerald-pool",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "Emerald pool",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "Emerald pool",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "Tourists have to pay entry",
            "Loads of tourists and it wasn't anything super special",
        ],
        mapQuery: "Emerald pool, Krabi, Thailand",
    },
    {
        slug: "pub-crawl",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "Pub Crawl",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "Pub Crawl",
            },
        ],
        info: [],
        description: [
            "Fun, but overhyped",
            "Three different bars, but two of them are at the same location — one upstairs, one downstairs. You could easily sneak along without paying.",
            "Free shots at every location",
        ],
        mapQuery: "Pub Crawl, Krabi, Thailand",
    },
    {
        slug: "boat-party",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "Boat Party",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "Boat Party",
            },
        ],
        info: [],
        description: [
            "Booked on the day through our hostel",
            "Lots of young people on a boat.",
            "We did a bunch of island hopping",
            "Transport to and from the hostel was included",
            "Lunch was included",
            "All drinks had to be bought on the boat",
            "Our stops: Tub Island (first stop, from where we went to Koh Gai), Koh Gai (went from Tub Island to Koh Gai — swam a bit and looked at starfish), Chicken Rock (sailed past it), Ko Ma Tang Ming (where we snorkeled and watched the sunset), Poda Island (stopped and bought chips right before sunset), Secret Beach - Poda Island (where we ate lunch)",
        ],
        mapQuery: "Boat Party, Krabi, Thailand",
    },
    {
        slug: "night-market-street-food",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "Night market (street food)",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "Night market (street food)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Night market",
            },
        ],
        description: ["Super varied food", "Cheap and very delicious food"],
        mapQuery: "Night market (street food), Krabi, Thailand",
    },
    {
        slug: "pack-up-hostel",
        countrySlug: "thailand",
        citySlug: "krabi",
        heading: "Pack-Up Hostel",
        images: [
            {
                src: "/destinations/thailand/krabi.JPG",
                alt: "Pack-Up Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "4 nights",
            },
        ],
        description: [],
        mapQuery: "Pack-Up Hostel, Krabi, Thailand",
        pros: [
            "Breakfast was included",
            "The beds were big",
            "Really sweet staff",
            "Bar, rooftop, lots of things you could book through them",
            "Very social hostel",
        ],
        cons: [
            "They'd pushed the beds so close together that we almost tangled toes with the people across from us",
        ],
    },
    {
        slug: "east-railey-viewpoint",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "East Railey Viewpoint",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "East Railey Viewpoint",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Scenic spot",
            },
        ],
        description: ["It's a hike, so bring/wear shoes"],
        mapQuery: "East Railey Viewpoint, Railey, Thailand",
    },
    {
        slug: "east-railay-bay-beach",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "East Railay Bay Beach",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "East Railay Bay Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Big beach, but lots and lots of tourists"],
        mapQuery: "East Railay Bay Beach, Railey, Thailand",
    },
    {
        slug: "diamond-cave-phra-nang-nai-cave",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "Diamond Cave / Phra Nang Nai Cave",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "Diamond Cave / Phra Nang Nai Cave",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [],
        mapQuery: "Diamond Cave / Phra Nang Nai Cave, Railey, Thailand",
    },
    {
        slug: "princesse-cave",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "Princesse cave",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "Princesse cave",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Right next to Tham Phra Beach"],
        mapQuery: "Princesse cave, Railey, Thailand",
    },
    {
        slug: "railey-beach",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "Railey beach",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "Railey beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "Not a particularly beautiful beach, but with a really beautiful view",
        ],
        mapQuery: "Railey beach, Railey, Thailand",
    },
    {
        slug: "tham-phra-beach",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "Tham Phra Beach",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "Tham Phra Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Beautiful beach, but again lots of tourists"],
        mapQuery: "Tham Phra Beach, Railey, Thailand",
    },
    {
        slug: "viewpoint",
        countrySlug: "thailand",
        citySlug: "railey",
        heading: "Viewpoint",
        images: [
            {
                src: "/destinations/thailand.JPG",
                alt: "Viewpoint",
            },
        ],
        info: [],
        description: ["It's a hike, so bring/wear shoes"],
        mapQuery: "Viewpoint, Railey, Thailand",
    },
    {
        slug: "beaches",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Beaches",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Beaches",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Beaches, Phi Phi, Thailand",
    },
    {
        slug: "b-dtur-privat",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Bådtur (privat)",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Bådtur (privat)",
            },
        ],
        info: [],
        description: [
            "Monkey Bay",
            "Phi Leh",
            "Maya Bay (snorkeling)",
            "Maya Beach",
            "Phi Leh Lagoon",
            "Viking Cave (snorkeling)",
        ],
        mapQuery: "Bådtur (privat), Phi Phi, Thailand",
    },
    {
        slug: "kajaktur",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Kajaktur",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Kajaktur",
            },
        ],
        info: [],
        description: ["Monkey Beach", "Nui Beach (not worth it, but fun)"],
        mapQuery: "Kajaktur, Phi Phi, Thailand",
    },
    {
        slug: "slinky-bar",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Slinky Bar",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Slinky Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: [
            "Definitely the place you get drugged",
            "Watch out for the rum",
            "Here you can get a free bucket if you try the rodeo bull topless as a girl or naked as a guy",
        ],
        mapQuery: "Slinky Bar, Phi Phi, Thailand",
    },
    {
        slug: "reggae-bar",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Reggae Bar",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Reggae Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: [
            "Here tourists Muay Thai fight each other to get a free bucket",
            "Super fun",
            "A bit pricey",
        ],
        mapQuery: "Reggae Bar, Phi Phi, Thailand",
    },
    {
        slug: "backpacker-bar",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Backpacker Bar",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Backpacker Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Weird, weird place", "Lots of people from Scandinavia"],
        mapQuery: "Backpacker Bar, Phi Phi, Thailand",
    },
    {
        slug: "pa-jit",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "PA-JIT",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "PA-JIT",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Very good food",
            "Cheap",
            "Weird service",
            "The family who owned the place showered in the customer bathroom and walked through the restaurant wearing only a towel.",
        ],
        mapQuery: "PA-JIT, Phi Phi, Thailand",
    },
    {
        slug: "tommy-s-bar-and-bistro",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Tommy's Bar and Bistro",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Tommy's Bar and Bistro",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "This is where we had our Christmas dinner",
            "The staff were really sweet",
            "We got an insane amount of food (almost too much)",
        ],
        mapQuery: "Tommy's Bar and Bistro, Phi Phi, Thailand",
    },
    {
        slug: "acqua-restaurant-phi-phi",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "ACQUA Restaurant Phi Phi",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "ACQUA Restaurant Phi Phi",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Good food, but pretty expensive",
            "The staff were so sweet",
            "They surprised Ingeborg with a birthday song and a lava cake without us having to pay for it.",
        ],
        mapQuery: "ACQUA Restaurant Phi Phi, Phi Phi, Thailand",
    },
    {
        slug: "patcharee-bakery",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Patcharee Bakery",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Patcharee Bakery",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café / Bakery",
            },
        ],
        description: [
            "This is where Ingeborg had her birthday breakfast",
            "It was a bit expensive",
            "The food was ok",
            "The place was really Insta-worthy",
        ],
        mapQuery: "Patcharee Bakery, Phi Phi, Thailand",
    },
    {
        slug: "atom-resto-phi-phi",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Atom Resto Phi Phi",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Atom Resto Phi Phi",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Super bad food", "Not worth it"],
        mapQuery: "Atom Resto Phi Phi, Phi Phi, Thailand",
    },
    {
        slug: "chang-grand-resort",
        countrySlug: "thailand",
        citySlug: "phi-phi",
        heading: "Chang Grand Resort",
        images: [
            {
                src: "/destinations/thailand/phiphi.jpg",
                alt: "Chang Grand Resort",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hotel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Chang Grand Resort, Phi Phi, Thailand",
        pros: [
            "There was a horse wandering freely around the hotel, which was really fun (but the horse wasn't that friendly).",
            "Pool",
            "They cleaned the room and you got water every time",
            "Small fridge",
        ],
        cons: ["Was a liiittle bit far away"],
    },
    {
        slug: "santichon-village",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Santichon Village",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Santichon Village",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Chinatown-ish vibe", "Easy to get there by scooter"],
        mapQuery: "Santichon Village, Pai, Thailand",
    },
    {
        slug: "pai-canyon",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Pai Canyon",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Pai Canyon",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "Really beautiful at sunset",
            "Easy to get there by scooter",
        ],
        mapQuery: "Pai Canyon, Pai, Thailand",
    },
    {
        slug: "pham-bok-waterfall",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Pham Bok waterfall",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Pham Bok waterfall",
            },
        ],
        info: [],
        description: [
            "Small waterfall with very few tourists",
            "Easy to get there by scooter",
        ],
        mapQuery: "Pham Bok waterfall, Pai, Thailand",
    },
    {
        slug: "bamboo-bridge",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Bamboo Bridge",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Bamboo Bridge",
            },
        ],
        info: [],
        description: [
            "Very beautiful bridge built by locals",
            "Worth the visit",
            "Easy to get there by scooter",
        ],
        mapQuery: "Bamboo Bridge, Pai, Thailand",
    },
    {
        slug: "tipsy-tubing",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Tipsy tubing",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Tipsy tubing",
            },
        ],
        info: [],
        description: [
            "Insane numbers of young people floating down the river in inner tubes and drinking",
            "Definitely one of the most fun things we did in Thailand",
            "Perfect place to meet a bunch of other young people",
        ],
        mapQuery: "Tipsy tubing, Pai, Thailand",
    },
    {
        slug: "night-market",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Night market",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Night market",
            },
        ],
        info: [],
        description: [
            "Sooooo much delicious food",
            "We got the best green curry there at the market",
        ],
        mapQuery: "Night market, Pai, Thailand",
    },
    {
        slug: "don-t-cry",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Don't Cry",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Don't Cry",
            },
        ],
        info: [],
        description: [
            "Stays open after all the other bars close",
            "A bit of a weird place though",
        ],
        mapQuery: "Don't Cry, Pai, Thailand",
    },
    {
        slug: "bros-music-bar-and-hostel",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Bros Music Bar and Hostel",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Bros Music Bar and Hostel",
            },
        ],
        info: [],
        description: ["Cozy bar with live music"],
        mapQuery: "Bros Music Bar and Hostel, Pai, Thailand",
    },
    {
        slug: "night-market-2",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Night market",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Night market",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Market",
            },
        ],
        description: [
            "Sooooo much delicious food",
            "We got the best green curry there at the market",
        ],
        mapQuery: "Night market, Pai, Thailand",
    },
    {
        slug: "easy-house",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Easy House",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Easy House",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Easy House, Pai, Thailand",
        pros: ["Super sweet staff", "The bathrooms were ok"],
        cons: [
            "The beds were crap",
            "Breakfast wasn't included",
            "Not super social",
        ],
    },
    {
        slug: "abodaya-guesthouse",
        countrySlug: "thailand",
        citySlug: "pai",
        heading: "Abodaya Guesthouse",
        images: [
            {
                src: "/destinations/thailand/pai.JPG",
                alt: "Abodaya Guesthouse",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Guesthouse",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Abodaya Guesthouse, Pai, Thailand",
        pros: [
            "We didn't pay",
            "There were towels, TV, fridge",
            "The staff were sweet",
        ],
        cons: [
            "We didn't get soap",
            "The bathroom was a bit weird",
            "Breakfast wasn't included",
        ],
    },
    {
        slug: "chiang-mai-cabaret-show",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "Chiang Mai Cabaret Show",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "Chiang Mai Cabaret Show",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Cabaret/nightclub",
            },
        ],
        description: ["Drag show"],
        mapQuery: "Chiang Mai Cabaret Show, Chiang Mai, Thailand",
    },
    {
        slug: "elefin-farm-and-cafe",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "Elefin Farm & Cafe",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "Elefin Farm & Cafe",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Coffee bar",
            },
        ],
        description: [
            "Elephant cafe just outside Chiang Mai",
            "Not worth it",
            "The elephants weren't treated suuuper well",
        ],
        mapQuery: "Elefin Farm & Cafe, Chiang Mai, Thailand",
    },
    {
        slug: "anusarn-market",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "Anusarn Market",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "Anusarn Market",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Night market",
            },
        ],
        description: ["Lots of small shops"],
        mapQuery: "Anusarn Market, Chiang Mai, Thailand",
    },
    {
        slug: "kalare-boxing-stadium",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "Kalare Boxing Stadium",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "Kalare Boxing Stadium",
            },
        ],
        info: [],
        description: [
            "Smaller Muay Thai venue",
            "It was fun, but not the biggest place to see it",
        ],
        mapQuery: "Kalare Boxing Stadium, Chiang Mai, Thailand",
    },
    {
        slug: "the-spicy",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "The Spicy",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "The Spicy",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar / Club",
            },
        ],
        description: [
            "They're open when all the other places close",
            "It's kind of a secret club",
        ],
        mapQuery: "The Spicy, Chiang Mai, Thailand",
    },
    {
        slug: "night-market",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "Night Market",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "Night Market",
            },
        ],
        info: [],
        description: [
            "Lots of places where you could get delicious and cheap food",
        ],
        mapQuery: "Night Market, Chiang Mai, Thailand",
    },
    {
        slug: "248-hostel",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "248 Hostel",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "248 Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "248 Hostel, Chiang Mai, Thailand",
        pros: [
            "Friendly guy at reception",
            "We could leave our bags there while we went to Pai",
        ],
        cons: [
            "Looked like a prison",
            "It smelled of mold",
            "You weren't allowed to wear shoes",
            "Breakfast wasn't included",
        ],
    },
    {
        slug: "s-k-house",
        countrySlug: "thailand",
        citySlug: "chiang-mai",
        heading: "S. K. House",
        images: [
            {
                src: "/destinations/thailand/chiang-mai.jpg",
                alt: "S. K. House",
            },
        ],
        info: [
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "S. K. House, Chiang Mai, Thailand",
        pros: ["Sweet staff", "Balcony, big mirror, pool"],
        cons: [
            "Breakfast wasn't included",
            "The bed was hard and creaked a lot",
        ],
    },
    {
        slug: "the-note-cafe",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "The Note Cafe",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "The Note Cafe",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: [
            "Super cute and cozy café - a must",
            "Very Instagram-friendly",
        ],
        mapQuery: "The Note Cafe, Hanoi, Vietnam",
    },
    {
        slug: "old-quarter",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Old Quarter",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Old Quarter",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Quarter",
            },
        ],
        description: ["The old district of Hanoi"],
        mapQuery: "Old Quarter, Hanoi, Vietnam",
    },
    {
        slug: "french-quarter",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "French Quarter",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "French Quarter",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Quarter",
            },
        ],
        description: ["Many French-style buildings", "A bit underwhelming"],
        mapQuery: "French Quarter, Hanoi, Vietnam",
    },
    {
        slug: "vietnamese-women-s-museum",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Vietnamese Women's museum",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Vietnamese Women's museum",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["A really good museum", "Lots of cool women and stories"],
        mapQuery: "Vietnamese Women's museum, Hanoi, Vietnam",
    },
    {
        slug: "hoa-lo-prison-relic",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Hoa Lo Prison Relic",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hoa Lo Prison Relic",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: [
            "Another good museum",
            "You walk around inside the original prison",
        ],
        mapQuery: "Hoa Lo Prison Relic, Hanoi, Vietnam",
    },
    {
        slug: "sky-lotte-observation-deck",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Sky Lotte Observation Deck",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Sky Lotte Observation Deck",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Observation deck",
            },
        ],
        description: [
            "View over all of Hanoi - very pretty",
            "Costs money to go up",
        ],
        mapQuery: "Sky Lotte Observation Deck, Hanoi, Vietnam",
    },
    {
        slug: "c-ng-vi-n-l-nin-lenin-park",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Công viên Lê-nin (Lenin Park)",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Công viên Lê-nin (Lenin Park)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Park",
            },
        ],
        description: [
            "Very nice place to chill",
            "Lots of young people skating",
            "Good place to 'people watch'",
        ],
        mapQuery: "Công viên Lê-nin (Lenin Park), Hanoi, Vietnam",
    },
    {
        slug: "train-street",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Train Street",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Train Street",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "A cozy place to get a coffee",
            "Very Instagram-friendly",
        ],
        mapQuery: "Train Street, Hanoi, Vietnam",
    },
    {
        slug: "hoan-kiem-lake",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Hoan Kiem Lake",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hoan Kiem Lake",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Lake",
            },
        ],
        description: ["Pretty (and big) lake in the center of Hanoi"],
        mapQuery: "Hoan Kiem Lake, Hanoi, Vietnam",
    },
    {
        slug: "ngoc-son-temple",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Ngoc Son Temple",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Ngoc Son Temple",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["A pretty temple on the Hoan Kiem Lake"],
        mapQuery: "Ngoc Son Temple, Hanoi, Vietnam",
    },
    {
        slug: "temple-of-literature",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Temple of Literature",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Temple of Literature",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["Nice temple with loads of history"],
        mapQuery: "Temple of Literature, Hanoi, Vietnam",
    },
    {
        slug: "night-market",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Night market",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Night market",
            },
        ],
        info: [],
        description: ["Lots of shops", "Very cozy, but lots of people"],
        mapQuery: "Night market, Hanoi, Vietnam",
    },
    {
        slug: "ta-hien-beer-street",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Ta Hien Beer Street",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Ta Hien Beer Street",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Lots of bars down the street"],
        mapQuery: "Ta Hien Beer Street, Hanoi, Vietnam",
    },
    {
        slug: "t-m-s-bar",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Tôm's Bar",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Tôm's Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Fun bar on beer street"],
        mapQuery: "Tôm's Bar, Hanoi, Vietnam",
    },
    {
        slug: "terra-o-sky-bar",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Terraço Sky Bar",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Terraço Sky Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Cocktail bar",
            },
        ],
        description: ["Pretty cocktail bar"],
        mapQuery: "Terraço Sky Bar, Hanoi, Vietnam",
    },
    {
        slug: "m-t-vietnamese-restaurant-and-vegetarian-food-1",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "MẸT Vietnamese restaurant & Vegetarian Food 1",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "MẸT Vietnamese restaurant & Vegetarian Food 1",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Really good food but expensive for us"],
        mapQuery:
            "MẸT Vietnamese restaurant & Vegetarian Food 1, Hanoi, Vietnam",
    },
    {
        slug: "banh-mi-25",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Banh Mi 25",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Banh Mi 25",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Sandwich Bar",
            },
        ],
        description: [
            "Cheap and the most recommended place, but it was just okay",
            "A bit overrated",
        ],
        mapQuery: "Banh Mi 25, Hanoi, Vietnam",
    },
    {
        slug: "ph-b-ng-h-ng-tr-ng",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Phở bưng Hàng Trống",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Phở bưng Hàng Trống",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Pho restaurant",
            "Really good food",
            "We don't really know what we ate, but it was delicious and cheap",
        ],
        mapQuery: "Phở bưng Hàng Trống, Hanoi, Vietnam",
    },
    {
        slug: "nha-hang-mr-bay-mien-tay-banh-xeo",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Nha Hang Mr Bay Mien Tay - BANH XEO",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Nha Hang Mr Bay Mien Tay - BANH XEO",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Vietnamese restaurant",
            "Reaaaally good food",
            "A bit expensive but worth it",
            "Order the banh xeo with beef!",
        ],
        mapQuery: "Nha Hang Mr Bay Mien Tay - BANH XEO, Hanoi, Vietnam",
    },
    {
        slug: "x-i-y-n",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Xôi Yến",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Xôi Yến",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Vietnamese restaurant",
            "Really good Vietnamese food and very cheap",
        ],
        mapQuery: "Xôi Yến, Hanoi, Vietnam",
    },
    {
        slug: "hanoi-buffalo-hostel",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Hanoi Buffalo Hostel",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hanoi Buffalo Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Hanoi Buffalo Hostel, Hanoi, Vietnam",
        pros: [
            "Very social hostel",
            "Breakfast was included and was good",
            "Laundry service",
            "Sweet staff",
            "Luxury toilet",
            "Good beds with privacy",
            "Pool",
        ],
        cons: [
            "Breakfast was very early",
            "Could have had more sofas in the common area",
        ],
    },
    {
        slug: "central-backpackers",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Central Backpackers",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Central Backpackers",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Central Backpackers, Hanoi, Vietnam",
        pros: [
            "Breakfast included",
            "Good beds with privacy",
            "Many young people and very social",
            "You can book lots of things through them",
            "Rooftop bar (also where breakfast is served)",
        ],
        cons: [
            "Toilet was less nice",
            "Movie room was really gross",
            "Location was fine but the street was gross",
            "Less clean than Buffalo",
            "Public toilets were very dirty and there were only three",
        ],
    },
    {
        slug: "hanoi-backpackers-and-rooftop-bar",
        countrySlug: "vietnam",
        citySlug: "hanoi",
        heading: "Hanoi Backpackers & Rooftop Bar",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hanoi Backpackers & Rooftop Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Hanoi Backpackers & Rooftop Bar, Hanoi, Vietnam",
        pros: [
            "Crazy good breakfast and it was included",
            "Good beds with duvets",
            "Rooftop bar",
            "Lots of young people",
            "Probably very social but we were only there one night",
            "We stayed for free",
        ],
        cons: ["Bad ventilation in the room"],
    },
    {
        slug: "hideaway-cruise",
        countrySlug: "vietnam",
        citySlug: "ha-long-bay",
        heading: "Hideaway Cruise",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hideaway Cruise",
            },
        ],
        info: [
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "Hideaway Cruise, Ha Long Bay, Vietnam",
        pros: [
            "Seriously luxury rooms and luxury surroundings",
            "Sweetest staff",
            "All food was included",
            "We were served nonstop",
            "They cleaned our rooms",
            "We had private rooms",
        ],
        cons: [
            "Breakfast was kind of boring",
            "We almost had the same food all the time",
            "Alcohol was expensive and the bar closed pretty early",
            "We didn't have hand soap in the room",
        ],
    },
    {
        slug: "jasmin-hostel",
        countrySlug: "vietnam",
        citySlug: "ha-giang-loop",
        heading: "Jasmin Hostel",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Jasmin Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Jasmin Hostel, Ha Giang Loop, Vietnam",
        pros: [
            "Beds were insanely good",
            "Breakfast was delicious",
            "Breakfast included",
        ],
        cons: [
            "Toilets were not nice",
            "Barely any toilet paper anywhere",
            "Cold showers and shared with everyone",
        ],
    },
    {
        slug: "bong-bang-homestay-2",
        countrySlug: "vietnam",
        citySlug: "ha-giang-loop",
        heading: "Bong Bang Homestay 2",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Bong Bang Homestay 2",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Bong Bang Homestay 2, Ha Giang Loop, Vietnam",
        pros: [
            "All food included",
            "Dinner was good",
            "Very beautiful place",
            "Cute dogs",
            "Free happy water with dinner",
        ],
        cons: [
            "Breakfast was nothing special",
            "Music had to be turned off at 22:00",
            "Shared toilets",
        ],
    },
    {
        slug: "meo-vac-clay-house",
        countrySlug: "vietnam",
        citySlug: "ha-giang-loop",
        heading: "Meo Vac Clay House",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Meo Vac Clay House",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Meo Vac Clay House, Ha Giang Loop, Vietnam",
        pros: [
            "All food included",
            "Free happy water with dinner",
            "Beautiful surroundings",
        ],
        cons: [
            "Toilets not great + shared with everyone",
            "Breakfast was fine but nothing special",
            "Music had to be turned off early",
        ],
    },
    {
        slug: "trang-an",
        countrySlug: "vietnam",
        citySlug: "ninh-binh",
        heading: "Trang An",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Trang An",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Boat tour",
            },
        ],
        description: ["Super beautiful but very long"],
        mapQuery: "Trang An, Ninh Binh, Vietnam",
    },
    {
        slug: "the-coop-by-chookie-s",
        countrySlug: "vietnam",
        citySlug: "ninh-binh",
        heading: "The Coop By Chookie's",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "The Coop By Chookie's",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Western food", "The food was okay"],
        mapQuery: "The Coop By Chookie's, Ninh Binh, Vietnam",
    },
    {
        slug: "ducks-farm",
        countrySlug: "vietnam",
        citySlug: "phong-nha",
        heading: "Ducks Farm",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Ducks Farm",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "We didn't make it but really wanted to see them",
            "Highly recommended",
        ],
        mapQuery: "Ducks Farm, Phong Nha, Vietnam",
    },
    {
        slug: "paradise-cave",
        countrySlug: "vietnam",
        citySlug: "phong-nha",
        heading: "Paradise Cave",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Paradise Cave",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Super beautiful", "Buy tickets there and not online"],
        mapQuery: "Paradise Cave, Phong Nha, Vietnam",
    },
    {
        slug: "central-backpackers-hostel-phong-nha",
        countrySlug: "vietnam",
        citySlug: "phong-nha",
        heading: "Central Backpackers Hostel - Phong Nha",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Central Backpackers Hostel - Phong Nha",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "Central Backpackers Hostel - Phong Nha, Phong Nha, Vietnam",
        pros: [
            "Breakfast was included and was delicious",
            "Good rooms with privacy",
            "Nice toilets",
            "There were PUPPIES!",
            "There was a pool",
            "Free beer, shots, drinks at certain times",
            "Friendly staff",
            "Could book things through them",
            "Social hostel",
        ],
        cons: ["A bit boring area"],
    },
    {
        slug: "thu-bon-river",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Thu Bon River",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Thu Bon River",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "River",
            },
        ],
        description: [
            "River in Hoi An where you can take boat rides",
            "Very pretty with a sunset boat tour",
            "Put lanterns in the water",
        ],
        mapQuery: "Thu Bon River, Hoi An, Vietnam",
    },
    {
        slug: "old-town",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Old Town",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Old Town",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Quarter",
            },
        ],
        description: ["Watch the sunset here", "Lots of shops"],
        mapQuery: "Old Town, Hoi An, Vietnam",
    },
    {
        slug: "night-market",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Night Market",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Night Market",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Night market",
            },
        ],
        description: ["Lots of shops"],
        mapQuery: "Night Market, Hoi An, Vietnam",
    },
    {
        slug: "marble-mountains-da-nang",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Marble Mountains (Da Nang)",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Marble Mountains (Da Nang)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Scenic spot",
            },
        ],
        description: ["Very beautiful", "Lots of stairs"],
        mapQuery: "Marble Mountains (Da Nang), Hoi An, Vietnam",
    },
    {
        slug: "skr-ddersyet-t-j",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Skræddersyet tøj",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Skræddersyet tøj",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Tailor",
            },
        ],
        description: [
            "We went to Forty Five tailor",
            "A bit expensive",
            "Be very clear about what you want made",
        ],
        mapQuery: "Skræddersyet tøj, Hoi An, Vietnam",
    },
    {
        slug: "an-bang-beach",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "An Bang Beach",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "An Bang Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "An okay beach",
            "A bit cold when we were there (January)",
        ],
        mapQuery: "An Bang Beach, Hoi An, Vietnam",
    },
    {
        slug: "hoi-an-handicraft-tours",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Hoi An Handicraft Tours",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hoi An Handicraft Tours",
            },
        ],
        info: [],
        description: [
            "Make your own lantern",
            "Only cost 75 DKK",
            "Book in advance",
            "Very cozy and super sweet staff",
        ],
        mapQuery: "Hoi An Handicraft Tours, Hoi An, Vietnam",
    },
    {
        slug: "tiger-tiger-bar",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Tiger Tiger Bar",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Tiger Tiger Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar / Club",
            },
        ],
        description: ["We went there almost every night"],
        mapQuery: "Tiger Tiger Bar, Hoi An, Vietnam",
    },
    {
        slug: "mr-bean-bar",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Mr Bean bar",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Mr Bean bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Mr Bean themed bar"],
        mapQuery: "Mr Bean bar, Hoi An, Vietnam",
    },
    {
        slug: "mad-monkey-hostel",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Mad Monkey (Hostel)",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Mad Monkey (Hostel)",
            },
        ],
        info: [],
        description: ["A hostel", "Cheap alcohol"],
        mapQuery: "Mad Monkey (Hostel), Hoi An, Vietnam",
    },
    {
        slug: "quan-an-binh-dan-cuong",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Quan An Binh Dan Cuong",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Quan An Binh Dan Cuong",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Weird place", "Okay food"],
        mapQuery: "Quan An Binh Dan Cuong, Hoi An, Vietnam",
    },
    {
        slug: "good-eats",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Good Eats",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Good Eats",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Vegetarian restaurant", "Good vegetarian food"],
        mapQuery: "Good Eats, Hoi An, Vietnam",
    },
    {
        slug: "nourish-eatery-caf-and-restaurant",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "nourish eatery. / Café & Restaurant",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "nourish eatery. / Café & Restaurant",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Good vegetarian food"],
        mapQuery: "nourish eatery. / Café & Restaurant, Hoi An, Vietnam",
    },
    {
        slug: "morning-glory-signature",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Morning Glory Signature",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Morning Glory Signature",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Expensive but good"],
        mapQuery: "Morning Glory Signature, Hoi An, Vietnam",
    },
    {
        slug: "banh-mi-phuong",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Banh Mi Phuong",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Banh Mi Phuong",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Sandwich Bar",
            },
        ],
        description: [
            "Really tasty and cheap",
            "A must in Hoi An",
            "We ate here many times",
        ],
        mapQuery: "Banh Mi Phuong, Hoi An, Vietnam",
    },
    {
        slug: "bed-station-hostel-and-pool-bar-h-i-an",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Bed Station Hostel & Pool Bar Hội An",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Bed Station Hostel & Pool Bar Hội An",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "5 nights",
            },
        ],
        description: [],
        mapQuery: "Bed Station Hostel & Pool Bar Hội An, Hoi An, Vietnam",
        pros: [
            "Sweet staff",
            "Pool",
            "They had clean towels",
            "Breakfast was included and was very good",
            "Social, but we didn't mingle a lot",
            "Social, but we didn't really mingle",
        ],
        cons: ["No curtains on the beds", "Mixed toilets and not many of them"],
    },
    {
        slug: "memority-hotel-and-spa",
        countrySlug: "vietnam",
        citySlug: "hoi-an",
        heading: "Memority Hotel & Spa",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Memority Hotel & Spa",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hotel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Memority Hotel & Spa, Hoi An, Vietnam",
        pros: ["Luxury beds", "Pool", "Lots of 'free' items in the bathroom"],
        cons: [""],
    },
    {
        slug: "cu-chi-tunnelerne",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Cu Chi-tunnelerne",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Cu Chi-tunnelerne",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Historic landmark",
            },
        ],
        description: [
            "Book a tour - we had a fun guide",
            "There were a lot of young people on our tour",
        ],
        mapQuery: "Cu Chi-tunnelerne, Ho Chi Minh, Vietnam",
    },
    {
        slug: "t-n-nh-catholic-church",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Tân Định Catholic Church",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Tân Định Catholic Church",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Church",
            },
        ],
        description: ["Catholic Churchx", "Pretty pink church"],
        mapQuery: "Tân Định Catholic Church, Ho Chi Minh, Vietnam",
    },
    {
        slug: "war-remnants-museum",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "War Remnants Museum",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "War Remnants Museum",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: [
            "War museum",
            "Very good museum - we learned a lot from our visit",
        ],
        mapQuery: "War Remnants Museum, Ho Chi Minh, Vietnam",
    },
    {
        slug: "bui-vien-walking-street",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Bui Vien Walking Street",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Bui Vien Walking Street",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "A very long street with loads of bars",
            "Sooo many people (be careful with your pockets)",
        ],
        mapQuery: "Bui Vien Walking Street, Ho Chi Minh, Vietnam",
    },
    {
        slug: "bui-vien-walking-street-2",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Bui Vien Walking Street",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Bui Vien Walking Street",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Street",
            },
        ],
        description: ["Lots of places on the Bui Vien Walking Street"],
        mapQuery: "Bui Vien Walking Street, Ho Chi Minh, Vietnam",
    },
    {
        slug: "sushi-sun",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Sushi Sun",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Sushi Sun",
            },
        ],
        info: [],
        description: ["Sushi place", "Good sushi but not cheap"],
        mapQuery: "Sushi Sun, Ho Chi Minh, Vietnam",
    },
    {
        slug: "the-hungry-pig",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "The Hungry Pig",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "The Hungry Pig",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["It was okay"],
        mapQuery: "The Hungry Pig, Ho Chi Minh, Vietnam",
    },
    {
        slug: "banh-mi",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Banh Mi",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Banh Mi",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Banh Mi, Ho Chi Minh, Vietnam",
    },
    {
        slug: "pizza-4p-s-ben-thanh",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Pizza 4P's Ben Thanh",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Pizza 4P's Ben Thanh",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Pizzeria", "Good pizza", "Pretty but not cheap"],
        mapQuery: "Pizza 4P's Ben Thanh, Ho Chi Minh, Vietnam",
    },
    {
        slug: "hostel",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "Hostel",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Hostel, Ho Chi Minh, Vietnam",
        pros: ["Luxury room (private room)"],
        cons: ["A bit expensive", "Many stairs and breakfast not included"],
    },
    {
        slug: "siagoncucu-hotel",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "SiagonCuCu Hotel",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "SiagonCuCu Hotel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "4 nights",
            },
        ],
        description: [],
        mapQuery: "SiagonCuCu Hotel, Ho Chi Minh, Vietnam",
        pros: [
            "Curtains on the beds",
            "Minimart very close",
            "Walking distance to Bui Vien Walking Street but far enough that there wasn't too much noise to sleep",
            "Super sweet woman at reception",
        ],
        cons: [
            "Breakfast not included",
            'Toilet was very "open" (kind of see through)',
            "Not social",
        ],
    },
    {
        slug: "9-hostel-and-suites",
        countrySlug: "vietnam",
        citySlug: "ho-chi-minh",
        heading: "9 Hostel and suites",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "9 Hostel and suites",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "9 Hostel and suites, Ho Chi Minh, Vietnam",
        pros: ["Cheap and good beds", "Sweet staff"],
        cons: ["The toilets on our floor didn't work"],
    },
    {
        slug: "sand-dunes-red-sand-dunes",
        countrySlug: "vietnam",
        citySlug: "mui-ne",
        heading: "Sand dunes / Red Sand Dunes",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Sand dunes / Red Sand Dunes",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["It's fun! Maybe book a tour, easiest"],
        mapQuery: "Sand dunes / Red Sand Dunes, Mui Ne, Vietnam",
    },
    {
        slug: "mui-ne-beach",
        countrySlug: "vietnam",
        citySlug: "mui-ne",
        heading: "Mui Ne Beach",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Mui Ne Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["You can surf here, but be careful! Lots of people"],
        mapQuery: "Mui Ne Beach, Mui Ne, Vietnam",
    },
    {
        slug: "ihome-backpacker-resort",
        countrySlug: "vietnam",
        citySlug: "mui-ne",
        heading: "IHome Backpacker Resort",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "IHome Backpacker Resort",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
        ],
        description: ["A very popular hostel"],
        mapQuery: "IHome Backpacker Resort, Mui Ne, Vietnam",
    },
    {
        slug: "mui-ne-hill-s-backpackers",
        countrySlug: "vietnam",
        citySlug: "mui-ne",
        heading: "Mui Ne Hill's Backpackers",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Mui Ne Hill's Backpackers",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Mui Ne Hill's Backpackers, Mui Ne, Vietnam",
        pros: ["Cheap"],
        cons: [
            "Gross (we had a dead cockroach in our room the whole time we stayed there)",
            "Bad location",
            "Breakfast not included",
            "Staff not helpful or service-minded",
            "Not social",
        ],
    },
    {
        slug: "crazy-house",
        countrySlug: "vietnam",
        citySlug: "dalat",
        heading: "Crazy house",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Crazy house",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "A must!!!",
            "Very beautiful and fun",
            "Very fun staff",
            "Cheap",
        ],
        mapQuery: "Crazy house, Dalat, Vietnam",
    },
    {
        slug: "mr-rot-secret-tour",
        countrySlug: "vietnam",
        citySlug: "dalat",
        heading: "Mr Rot Secret Tour",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Mr Rot Secret Tour",
            },
        ],
        info: [],
        description: [
            "It's a must!!!!",
            "One of the best things in Vietnam",
            "Can't say much about it",
            "Message me if you want to hear more",
        ],
        mapQuery: "Mr Rot Secret Tour, Dalat, Vietnam",
    },
    {
        slug: "maze-bar",
        countrySlug: "vietnam",
        citySlug: "dalat",
        heading: "Maze bar",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Maze bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["We never made it there but got recommended a lot"],
        mapQuery: "Maze bar, Dalat, Vietnam",
    },
    {
        slug: "tigon-dalat-hostel",
        countrySlug: "vietnam",
        citySlug: "dalat",
        heading: "TIGON DALAT HOSTEL",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "TIGON DALAT HOSTEL",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
        ],
        description: [
            "The food at our hostel was so insanely good that we only ate there",
        ],
        mapQuery: "TIGON DALAT HOSTEL, Dalat, Vietnam",
    },
    {
        slug: "tigon-dalat-hostel-2",
        countrySlug: "vietnam",
        citySlug: "dalat",
        heading: "Tigon Dalat Hostel",
        images: [
            {
                src: "/destinations/vietnam.JPG",
                alt: "Tigon Dalat Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "Tigon Dalat Hostel, Dalat, Vietnam",
        pros: [
            "Really sweet staff",
            "The food was really good",
            "Breakfast was included",
            "Could rent scooters there",
            "Good beds + good facilities (The water pressure was so good!)",
            "Amazing view",
            "Very social place, but we didn't really talk to anyone",
            "Social place, but we didn't really talk to anyone there",
        ],
        cons: ["A bit expensive"],
    },
    {
        slug: "love-ancher-market",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Love Ancher market",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Love Ancher market",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Market",
            },
        ],
        description: [
            "There are lots of beautiful things",
            "It's quite expensive, so you really need to haggle hard on the price",
            "Sunset at The Lawn",
            "Just grab a beer at one of the local warungs next to The Lawn",
        ],
        mapQuery: "Love Ancher market, Canggu, Indonesia",
    },
    {
        slug: "therapy-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Therapy Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Therapy Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Spa",
            },
        ],
        description: [
            "Amazing spa but quite expensive.",
            "You can get a lovely full body massage",
        ],
        mapQuery: "Therapy Canggu, Canggu, Indonesia",
    },
    {
        slug: "pantai-batu-bolong-canggu-beach",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Pantai Batu Bolong (Canggu Beach)",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Pantai Batu Bolong (Canggu Beach)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "The beach in Canggu",
            "Everyone goes here!",
            "Good spot to watch the sunset",
        ],
        mapQuery: "Pantai Batu Bolong (Canggu Beach), Canggu, Indonesia",
    },
    {
        slug: "surf",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Surf",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Surf",
            },
        ],
        info: [],
        description: ["If you can, try to get a surf lesson"],
        mapQuery: "Surf, Canggu, Indonesia",
    },
    {
        slug: "the-lawn-canggu-beach-club",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "The Lawn Canggu Beach Club",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "The Lawn Canggu Beach Club",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Bar at the beach", "Beautiful sunset here"],
        mapQuery: "The Lawn Canggu Beach Club, Canggu, Indonesia",
    },
    {
        slug: "old-man-s",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Old Man's",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Old Man's",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar / Club",
            },
        ],
        description: [
            "Bar close to the beach",
            "There's often a beer pong tournament",
            "There's also a dance floor in the evening",
            "There's apparently a specific day of the week you should go there",
        ],
        mapQuery: "Old Man's, Canggu, Indonesia",
    },
    {
        slug: "luigi-s-hot-pizza-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Luigi's Hot Pizza Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Luigi's Hot Pizza Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant / Club",
            },
        ],
        description: [
            "Italian pizzeria",
            "Go here on Mondays",
            "Super fun club and tasty pizza",
        ],
        mapQuery: "Luigi's Hot Pizza Canggu, Canggu, Indonesia",
    },
    {
        slug: "finns-beach-club",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Finns Beach Club",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Finns Beach Club",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach Club",
            },
        ],
        description: [
            "Didn't make it because I got sick",
            "Supposed to be pretty fun",
        ],
        mapQuery: "Finns Beach Club, Canggu, Indonesia",
    },
    {
        slug: "xbar-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Xbar Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Xbar Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Cheap but only fun in large groups"],
        mapQuery: "Xbar Canggu, Canggu, Indonesia",
    },
    {
        slug: "deus-ex-machina",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Deus Ex Machina",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Deus Ex Machina",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant / Bar / Clothing shop",
            },
        ],
        description: [
            "Also a clothing shop / restaurant",
            "Fun bar on Sundays in groups",
        ],
        mapQuery: "Deus Ex Machina, Canggu, Indonesia",
    },
    {
        slug: "copenhagen-cafe",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Copenhagen Cafe",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Copenhagen Cafe",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: [
            "Delicious Danish brunch food",
            "Quite expensive but 100% worth it, if you miss danish food",
        ],
        mapQuery: "Copenhagen Cafe, Canggu, Indonesia",
    },
    {
        slug: "copenhagen-bakery",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Copenhagen Bakery",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Copenhagen Bakery",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café / Bakery",
            },
        ],
        description: ["Delicious Danish food", "Danish owners from Copenhagen"],
        mapQuery: "Copenhagen Bakery, Canggu, Indonesia",
    },
    {
        slug: "crate-cafe",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Crate Cafe",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Crate Cafe",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: [
            "It's a must",
            "Soooo delicious food and it comes in huge portions",
            "The iced coffee is so good and ridiculously cool",
            "Very Instagram-friendly",
            "Get their iced coffee or a smoothie!",
        ],
        mapQuery: "Crate Cafe, Canggu, Indonesia",
    },
    {
        slug: "woods-pererenan",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "WOODS PERERENAN",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "WOODS PERERENAN",
            },
        ],
        info: [],
        description: ["Really pretty place and delicious breakfast"],
        mapQuery: "WOODS PERERENAN, Canggu, Indonesia",
    },
    {
        slug: "the-shady-shack",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "The Shady Shack",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "The Shady Shack",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Vegetarian restaurant", "Amazing vegetarian food"],
        mapQuery: "The Shady Shack, Canggu, Indonesia",
    },
    {
        slug: "i-am-vegan-babe",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "I Am Vegan Babe",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "I Am Vegan Babe",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Vegan restaurant", "Very good vegan food"],
        mapQuery: "I Am Vegan Babe, Canggu, Indonesia",
    },
    {
        slug: "black-sands-brewery",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Black Sands Brewery",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Black Sands Brewery",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Brewery bar",
            "Very pretty place and good food but a bit expensive",
        ],
        mapQuery: "Black Sands Brewery, Canggu, Indonesia",
    },
    {
        slug: "santorini-greek-restaurant-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Santorini Greek Restaurant Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Santorini Greek Restaurant Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Greek restaurant with cheap delicious food"],
        mapQuery: "Santorini Greek Restaurant Canggu, Canggu, Indonesia",
    },
    {
        slug: "la-brisa-bali-beach-club",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "La Brisa Bali | Beach Club",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "La Brisa Bali | Beach Club",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Good food with a beautiful view of the sea, but quite expensive",
        ],
        mapQuery: "La Brisa Bali | Beach Club, Canggu, Indonesia",
    },
    {
        slug: "penny-lane",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Penny Lane",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Penny Lane",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Balinese restaurant",
            "Very nice place, but the food wasn't great and quite expensive",
            "Would only get a drink there next time for some nice photos XD",
        ],
        mapQuery: "Penny Lane, Canggu, Indonesia",
    },
    {
        slug: "lola-s-cantina-mexicana",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Lola's Cantina Mexicana",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Lola's Cantina Mexicana",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Mexican restaurant",
            "Tasty Mexican food, but a bit expensive",
        ],
        mapQuery: "Lola's Cantina Mexicana, Canggu, Indonesia",
    },
    {
        slug: "yuki-sushi",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "YUKI Sushi",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "YUKI Sushi",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Japanese restaurant",
            "Insanely good sushi, but really expensive",
        ],
        mapQuery: "YUKI Sushi, Canggu, Indonesia",
    },
    {
        slug: "la-baracca",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "La Baracca",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "La Baracca",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant (pizzeria)",
            },
        ],
        description: [
            "Italian restaurant (pizzeria)",
            "Good pizza (ish)",
            "Same chain as in Ubud",
        ],
        mapQuery: "La Baracca, Canggu, Indonesia",
    },
    {
        slug: "luigi-s-hot-pizza-canggu-2",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Luigi's Hot Pizza Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Luigi's Hot Pizza Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant / Club",
            },
        ],
        description: [
            "Super fun club and tasty pizza restaurant",
            "Go here on Mondays",
        ],
        mapQuery: "Luigi's Hot Pizza Canggu, Canggu, Indonesia",
    },
    {
        slug: "moana-fish-eatery",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Moana Fish Eatery",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Moana Fish Eatery",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Seafood restaurant",
            "Cheap and tasty",
            "Delicious fish dishes",
        ],
        mapQuery: "Moana Fish Eatery, Canggu, Indonesia",
    },
    {
        slug: "deus-ex-machina-2",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Deus Ex Machina",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Deus Ex Machina",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant / Bar / Clothing shop",
            },
        ],
        description: [
            "Also a clothing shop / restaurant",
            "Fun bar on Sundays in groups",
        ],
        mapQuery: "Deus Ex Machina, Canggu, Indonesia",
    },
    {
        slug: "lay-day-hostel-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Lay Day Hostel Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Lay Day Hostel Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Surf Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "Lay Day Hostel Canggu, Canggu, Indonesia",
        pros: [
            "Very good atmosphere",
            "Good rooms & private bathrooms",
            "Two pools",
            "Sweet staff who were super chill",
        ],
        cons: ["A bit expensive", "Food wasn't included"],
    },
    {
        slug: "kima-surf-camp-bali-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Kima Surf Camp Bali Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Kima Surf Camp Bali Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel / Surfcamp",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "5 nights",
            },
        ],
        description: [],
        mapQuery: "Kima Surf Camp Bali Canggu, Canggu, Indonesia",
        pros: [
            "Very nice rooms",
            "Very delicious breakfast",
            "Everyone was so sweet",
            "Everything was very nice and clean at Kima",
        ],
        cons: ["Expensive", "Not many young people our age"],
    },
    {
        slug: "lapoint-surf-camp-bali",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "Lapoint Surf Camp Bali",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Lapoint Surf Camp Bali",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Surfcamp",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 weeks",
            },
        ],
        description: [],
        mapQuery: "Lapoint Surf Camp Bali, Canggu, Indonesia",
        pros: [
            "Super social place and really cozy",
            "Lots of young people, Danes, solo travelers",
            "They organize a lot of social activities during the week",
            "Would only stay for a max of two weeks",
        ],
        cons: [
            "Can get expensive over time",
            "It's the same thing every week",
            "It's hard getting up early in the morning to surf",
        ],
    },
    {
        slug: "the-commotion-canggu",
        countrySlug: "indonesia",
        citySlug: "canggu",
        heading: "The Commotion Canggu",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "The Commotion Canggu",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "The Commotion Canggu, Canggu, Indonesia",
        pros: ["The beds were pretty good"],
        cons: [
            "Total catfish!!!!",
            "The room smelled musty",
            "Not cleaned at all and insects everywhere",
            "Rarely anyone at reception",
            "Not particularly social",
        ],
    },
    {
        slug: "monkey-forest",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Monkey forest",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Monkey forest",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Protected natural area",
            },
        ],
        description: [
            "A forrest with a lot of monkeys",
            "Don't look the monkeys in the eyes, they bite!!!",
        ],
        mapQuery: "Monkey forest, Ubud, Indonesia",
    },
    {
        slug: "firefly-eco-lodge",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Firefly Eco Lodge",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Firefly Eco Lodge",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hotel",
            },
        ],
        description: [
            "Really nice pool and accommodation",
            "Pool right by the rice fields. Very beautiful!",
        ],
        mapQuery: "Firefly Eco Lodge, Ubud, Indonesia",
    },
    {
        slug: "tegalalang-rice-terrace",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Tegalalang Rice Terrace",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Tegalalang Rice Terrace",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Rice fields",
            },
        ],
        description: [
            "A must",
            "It's really beautiful to walk around",
            "You don't need to book anything to go here",
        ],
        mapQuery: "Tegalalang Rice Terrace, Ubud, Indonesia",
    },
    {
        slug: "krisik-waterfall",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Krisik waterfall",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Krisik waterfall",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Waterfall",
            },
        ],
        description: [
            "Our favourite waterfall because our guide was so sweet",
            "There are three different waterfalls here",
        ],
        mapQuery: "Krisik waterfall, Ubud, Indonesia",
    },
    {
        slug: "goa-raja-waterfall",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Goa Raja Waterfall",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Goa Raja Waterfall",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Waterfall",
            },
        ],
        description: [
            "Two different waterfalls here",
            "Very beautiful with few tourists",
            "You can also swim there",
        ],
        mapQuery: "Goa Raja Waterfall, Ubud, Indonesia",
    },
    {
        slug: "tibumana",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Tibumana",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Tibumana",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Waterfall",
            },
        ],
        description: ["Very beautiful waterfall"],
        mapQuery: "Tibumana, Ubud, Indonesia",
    },
    {
        slug: "kanto-lampo",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Kanto lampo",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Kanto lampo",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Waterfall",
            },
        ],
        description: [
            "Beautiful waterfall, but there were so many tourists.",
            "We could easily have skipped it",
        ],
        mapQuery: "Kanto lampo, Ubud, Indonesia",
    },
    {
        slug: "healer-prana",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Healer Prana",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Healer Prana",
            },
        ],
        info: [],
        description: [
            "The healer is called Prana. Super sweet man and a truly special experience!",
            "Message Ketut +62 877-6696-2821 for a translator and transport (say where you got the number).",
            "You pay what you want (both Prana and Ketut)",
            "Prana can't receive money by hand, so you put it where he indicates.",
            "The street name is: Jalan Lettu Wayan Sutha II (Sukawati)",
        ],
        mapQuery: "Healer Prana, Ubud, Indonesia",
    },
    {
        slug: "cretya",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Cretya",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Cretya",
            },
        ],
        info: [],
        description: [
            "Free pool with an amazing view of the rice fields",
            "There seem to be quite a few different pools",
        ],
        mapQuery: "Cretya, Ubud, Indonesia",
    },
    {
        slug: "white-water-rafting",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "White water rafting",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "White water rafting",
            },
        ],
        info: [],
        description: [
            "I didn't try i myself, but was told that it was super fun",
        ],
        mapQuery: "White water rafting, Ubud, Indonesia",
    },
    {
        slug: "market",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Market",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Market",
            },
        ],
        info: [],
        description: [
            "There are so many things to buy, but remember to haggle on the price",
        ],
        mapQuery: "Market, Ubud, Indonesia",
    },
    {
        slug: "melting-pot",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Melting Pot",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Melting Pot",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Sports bar",
            },
        ],
        description: [
            "Fine place but we only went because not many other places were open",
        ],
        mapQuery: "Melting Pot, Ubud, Indonesia",
    },
    {
        slug: "la-baracca",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "La baracca",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "La baracca",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant (pizzeria)",
            },
        ],
        description: [
            "Italian restaurant (pizzeria)",
            "Didn't eat anything when I was here because I was sick",
            "La Baracca was okay last time I was there",
        ],
        mapQuery: "La baracca, Ubud, Indonesia",
    },
    {
        slug: "keladi-house",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Keladi House",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Keladi House",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Keladi House, Ubud, Indonesia",
        pros: ["Good beds", "Breakfast is included", "Sweet staff"],
        cons: ["Bad toilets", "Not really a social place"],
    },
    {
        slug: "puri-garden-hotel-and-hostel",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Puri Garden Hotel & Hostel",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Puri Garden Hotel & Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel / Hotel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "Puri Garden Hotel & Hostel, Ubud, Indonesia",
        pros: [
            "Breakfast included",
            "Huge beds and good beds with curtains",
            "So much included for free",
            "Sweet staff",
            "There were puppies some days!",
        ],
        cons: [
            "Shared bathroom",
            "The beds creaked a lot",
            "Small rooms",
            "Way too expensive for a hostel",
        ],
    },
    {
        slug: "firefly-eco-lodge-2",
        countrySlug: "indonesia",
        citySlug: "ubud",
        heading: "Firefly Eco Lodge",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Firefly Eco Lodge",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hotel",
            },
        ],
        description: [],
        mapQuery: "Firefly Eco Lodge, Ubud, Indonesia",
        pros: [
            "Really nice pool and accommodation",
            "Pool right by the rice fields. Very beautiful!",
            "I didn't stay here but got it recommended a lot",
        ],
    },
    {
        slug: "broken-beach",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Broken Beach",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Broken Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "Really beautiful, but a bit hard to get to",
            "We saw manta rays and sea turtles in the water here",
        ],
        mapQuery: "Broken Beach, Nusa Penida, Indonesia",
    },
    {
        slug: "diamond-beach",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Diamond Beach",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Diamond Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "We only saw it from above",
            "Very beautiful, but skip this one if you're short on time",
        ],
        mapQuery: "Diamond Beach, Nusa Penida, Indonesia",
    },
    {
        slug: "tembeling-beach-and-forest",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Tembeling Beach and Forest",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Tembeling Beach and Forest",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "Very very very hard to get to and extremely tough, but very beautiful",
        ],
        mapQuery: "Tembeling Beach and Forest, Nusa Penida, Indonesia",
    },
    {
        slug: "kelingking-beach",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Kelingking Beach",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Kelingking Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "It is free",
            "Must must go here!",
            "You have to walk down to the beach even though it's a long trip",
        ],
        mapQuery: "Kelingking Beach, Nusa Penida, Indonesia",
    },
    {
        slug: "goa-giri-putri-temple",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Goa Giri Putri Temple",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Goa Giri Putri Temple",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: [
            "Hindu temple",
            "Truly beautiful underground temple",
            "Costs money",
        ],
        mapQuery: "Goa Giri Putri Temple, Nusa Penida, Indonesia",
    },
    {
        slug: "snorkeling-with-manta-rays",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Snorkeling with manta rays",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Snorkeling with manta rays",
            },
        ],
        info: [],
        description: [
            "We booked through Harrie: +62 819 1658 3839",
            "We met him at Broken Beach",
        ],
        mapQuery: "Snorkeling with manta rays, Nusa Penida, Indonesia",
    },
    {
        slug: "beach-club",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Beach club",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Beach club",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach club",
            },
        ],
        description: [
            "There isn't really a nightlife scene here.",
            "We went to a beach club which was super expensive, but we were also a big group",
        ],
        mapQuery: "Beach club, Nusa Penida, Indonesia",
    },
    {
        slug: "krusty-krab",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Krusty Krab",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Krusty Krab",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Good burgers and they're cheap",
            "They're close to the harbour",
        ],
        mapQuery: "Krusty Krab, Nusa Penida, Indonesia",
    },
    {
        slug: "sugardaddy-gelato-by-massimo-toya-pakeh",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Sugardaddy Gelato by Massimo Toya Pakeh",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Sugardaddy Gelato by Massimo Toya Pakeh",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Ice cream shop",
            },
        ],
        description: ["Really good ice cream", "Close to Krusty Krab"],
        mapQuery:
            "Sugardaddy Gelato by Massimo Toya Pakeh, Nusa Penida, Indonesia",
    },
    {
        slug: "sunny-cafe-penida",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Sunny cafe Penida",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Sunny cafe Penida",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: ["Tasty and cheap breakfast"],
        mapQuery: "Sunny cafe Penida, Nusa Penida, Indonesia",
    },
    {
        slug: "amok-sunset",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Amok Sunset",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Amok Sunset",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Tasty but expensive food", "Good sunset spot"],
        mapQuery: "Amok Sunset, Nusa Penida, Indonesia",
    },
    {
        slug: "sundi-ocean-bungalow",
        countrySlug: "indonesia",
        citySlug: "nusa-penida",
        heading: "Sundi Ocean Bungalow",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Sundi Ocean Bungalow",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Villa",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Sundi Ocean Bungalow, Nusa Penida, Indonesia",
        pros: [
            "Okay price for a mostly private room (300,000 IDR per night per room)",
            "Had its own pool",
            "Sweet staff",
            "Fun in groups",
        ],
        cons: [
            "We only got one towel",
            "Breakfast wasn't included, but cheap",
            "Such bad water pressure",
            "No soap in the bathroom",
            "The toilets weren't great",
        ],
    },
    {
        slug: "blue-lagoon",
        countrySlug: "indonesia",
        citySlug: "nusa-lembongan",
        heading: "Blue Lagoon",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Blue Lagoon",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Just a beautiful view"],
        mapQuery: "Blue Lagoon, Nusa Lembongan, Indonesia",
    },
    {
        slug: "gala-gala-underground-house",
        countrySlug: "indonesia",
        citySlug: "nusa-lembongan",
        heading: "Gala Gala underground house",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Gala Gala underground house",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["We only saw it from above"],
        mapQuery: "Gala Gala underground house, Nusa Lembongan, Indonesia",
    },
    {
        slug: "devil-s-tears",
        countrySlug: "indonesia",
        citySlug: "nusa-lembongan",
        heading: "Devil's Tears",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Devil's Tears",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: ["Actually super cool", "Would definitely recommend it"],
        mapQuery: "Devil's Tears, Nusa Lembongan, Indonesia",
    },
    {
        slug: "the-old-tree",
        countrySlug: "indonesia",
        citySlug: "nusa-lembongan",
        heading: "The Old tree",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "The Old tree",
            },
        ],
        info: [],
        description: ["Just a beautiful view"],
        mapQuery: "The Old tree, Nusa Lembongan, Indonesia",
    },
    {
        slug: "pange-hostel-lembongan",
        countrySlug: "indonesia",
        citySlug: "nusa-lembongan",
        heading: "Pange Hostel Lembongan",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Pange Hostel Lembongan",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Pange Hostel Lembongan, Nusa Lembongan, Indonesia",
        pros: [
            "Cheap",
            "Good beds and a big room (only four beds per room) 66.5 DKK total for one night",
            "Two bathrooms and showers for one room",
            "We got towels",
            "Sweet staff",
        ],
        cons: [
            "Not much to complain about",
            "Breakfast wasn't included, but that was okay",
            "Not much of a good atmosphere",
        ],
    },
    {
        slug: "snorkeling-with-turtles",
        countrySlug: "indonesia",
        citySlug: "gili-trawangan",
        heading: "Snorkeling with turtles",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Snorkeling with turtles",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Snorkeling with turtles, Gili Trawangan, Indonesia",
    },
    {
        slug: "cykle-rundt-om-en",
        countrySlug: "indonesia",
        citySlug: "gili-trawangan",
        heading: "Cykle rundt om øen",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Cykle rundt om øen",
            },
        ],
        info: [],
        description: [
            "Rent a bike and cycle all the way around the island",
            "Takes about 1-2 hours",
        ],
        mapQuery: "Cykle rundt om øen, Gili Trawangan, Indonesia",
    },
    {
        slug: "tequila-sunrise",
        countrySlug: "indonesia",
        citySlug: "gili-trawangan",
        heading: "Tequila Sunrise",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Tequila Sunrise",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Club",
            },
        ],
        description: ["Everyone and I mean everyone starts here"],
        mapQuery: "Tequila Sunrise, Gili Trawangan, Indonesia",
    },
    {
        slug: "the-jungle-bar",
        countrySlug: "indonesia",
        citySlug: "gili-trawangan",
        heading: "The Jungle Bar",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "The Jungle Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Nightclub",
            },
        ],
        description: [
            "Free shots all the time, but it's a bit of a weird place",
        ],
        mapQuery: "The Jungle Bar, Gili Trawangan, Indonesia",
    },
    {
        slug: "mbox",
        countrySlug: "indonesia",
        citySlug: "gili-trawangan",
        heading: "Mbox",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Mbox",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Mbox, Gili Trawangan, Indonesia",
        pros: [
            "A lot included",
            "Free dinner included",
            "Cheap alcohol, especially shots",
            "Sweet staff and fun volunteers",
            "Okay pool",
            "Very social",
        ],
        cons: [
            "They were a bit gross",
            "The room smelled a bit musty",
            "Didn't feel like they really cleaned properly",
            "The toilets were half disgusting",
            "The pool could be cleaned more often",
            "Dinner wasn't the best, but okay.",
            "Drinks were just a little bit expensive",
        ],
    },
    {
        slug: "villa",
        countrySlug: "indonesia",
        citySlug: "amed",
        heading: "Villa",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Villa",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Villa",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Villa, Amed, Indonesia",
        pros: [
            "Kitchen",
            "Three bathrooms and three bedrooms",
            "Sweet staff",
            "Large villa",
            "Supermarket below us (but expensive)",
            "Kitchen",
        ],
        cons: ["Not much to do in the area"],
    },
    {
        slug: "dolphin-tour",
        countrySlug: "indonesia",
        citySlug: "lovina",
        heading: "Dolphin Tour",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Dolphin Tour",
            },
        ],
        info: [],
        description: [
            "We booked through Menonton Dolphin Lovina: +62 818 0546 9326",
            "We only paid 160,000 per person with breakfast included",
            "Started at 6 and got back to the beach at 12",
        ],
        mapQuery: "Dolphin Tour, Lovina, Indonesia",
    },
    {
        slug: "lovina-central-hostel",
        countrySlug: "indonesia",
        citySlug: "lovina",
        heading: "Lovina Central Hostel",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Lovina Central Hostel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Lovina Central Hostel, Lovina, Indonesia",
        pros: [
            "Breakfast included",
            "Pool",
            "Private bathroom",
            "Private rooms",
            "Super cheap",
            "Check-out at 12",
            "Super chill",
        ],
        cons: [
            "No aircon (very minor downside)",
            "The neighbour sang all night",
        ],
    },
    {
        slug: "puri-sunny-camping",
        countrySlug: "indonesia",
        citySlug: "munduk",
        heading: "Puri Sunny Camping",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Puri Sunny Camping",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hotel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "1 night",
            },
        ],
        description: [],
        mapQuery: "Puri Sunny Camping, Munduk, Indonesia",
        pros: [
            "Breakfast included",
            "Beautiful surroundings",
            "Okay bed",
            "Get water at check-in",
            "Very sweet staff",
            "Huge pool",
        ],
        cons: [
            "There were SO MANY spiders",
            "No air conditioning",
            "Breakfast only",
            "Not much in the area",
            "Located in the middle of nowhere",
            "Not great toilets",
            "A bit gross pool",
        ],
    },
    {
        slug: "markeder",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "Markeder",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Markeder",
            },
        ],
        info: [],
        description: ["You can buy lots of things here"],
        mapQuery: "Markeder, Seminyak, Indonesia",
    },
    {
        slug: "la-favela",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "La Favela",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "La Favela",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Club",
            },
        ],
        description: ["Really fun club"],
        mapQuery: "La Favela, Seminyak, Indonesia",
    },
    {
        slug: "shishi",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "ShiShi",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "ShiShi",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Club",
            },
        ],
        description: [
            "A fun nightclub",
            "A bit more exclusive",
            "Girls get in free",
            "You need to wear nice clothes",
        ],
        mapQuery: "ShiShi, Seminyak, Indonesia",
    },
    {
        slug: "the-dusty-cafe",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "The Dusty Cafe",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "The Dusty Cafe",
            },
        ],
        info: [],
        description: ["Decent food"],
        mapQuery: "The Dusty Cafe, Seminyak, Indonesia",
    },
    {
        slug: "dang-cookies",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "Dang Cookies",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Dang Cookies",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bakery",
            },
        ],
        description: ["Very good cookies"],
        mapQuery: "Dang Cookies, Seminyak, Indonesia",
    },
    {
        slug: "taco-island",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "Taco Island",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Taco Island",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Really delicious tacos"],
        mapQuery: "Taco Island, Seminyak, Indonesia",
    },
    {
        slug: "mbox",
        countrySlug: "indonesia",
        citySlug: "seminyak",
        heading: "Mbox",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Mbox",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "2 nights",
            },
        ],
        description: [],
        mapQuery: "Mbox, Seminyak, Indonesia",
        pros: [
            "Free dinner",
            "Good beds",
            "Privacy at the bed",
            "Many bathrooms and showers",
        ],
        cons: [
            "Super depressing place",
            "Disgusting toilets",
            "Very gross pool (there was a duck in the pool",
            "No light",
            "No connection with staff and the volunteers were a bit like zombies",
            "Not very social",
        ],
    },
    {
        slug: "keckak-fire-dance",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Keckak Fire Dance",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Keckak Fire Dance",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [
            "A bit expensive, but worth it all",
            "Two shows a day, come early to see the sunset show",
            "Buy tickets there",
            "Bring a sarong and watch out for the monkeys",
        ],
        mapQuery: "Keckak Fire Dance, Uluwatu, Indonesia",
    },
    {
        slug: "uluwatu-beach",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Uluwatu Beach",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Uluwatu Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Beautiful beach, but there isn't much to do here"],
        mapQuery: "Uluwatu Beach, Uluwatu, Indonesia",
    },
    {
        slug: "padang-padang-beach",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Padang Padang Beach",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Padang Padang Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Soooo many tourists"],
        mapQuery: "Padang Padang Beach, Uluwatu, Indonesia",
    },
    {
        slug: "uluwatu-temple",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Uluwatu Temple",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Uluwatu Temple",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Temple",
            },
        ],
        description: ["Hindu temple", "Very beautiful"],
        mapQuery: "Uluwatu Temple, Uluwatu, Indonesia",
    },
    {
        slug: "hatch",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Hatch",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Hatch",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Western food", "Music stops early, otherwise very cosy"],
        mapQuery: "Hatch, Uluwatu, Indonesia",
    },
    {
        slug: "savaya-bali",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Savaya Bali",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Savaya Bali",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Nightclub",
            },
        ],
        description: [
            "We never made it here",
            "Insanely expensive, but looks so cool and amazing",
        ],
        mapQuery: "Savaya Bali, Uluwatu, Indonesia",
    },
    {
        slug: "warung-uby-ungasan",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Warung Uby Ungasan",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Warung Uby Ungasan",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Indonesian restaurant",
            "Really cheap and delicious food",
        ],
        mapQuery: "Warung Uby Ungasan, Uluwatu, Indonesia",
    },
    {
        slug: "mana-uluwatu-restaurant-and-bar",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Mana Uluwatu Restaurant & Bar",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Mana Uluwatu Restaurant & Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Decent food, but quite expensive and not the best sunset view",
        ],
        mapQuery: "Mana Uluwatu Restaurant & Bar, Uluwatu, Indonesia",
    },
    {
        slug: "blue-gelato",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Blue Gelato",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Blue Gelato",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Ice cream place",
            },
        ],
        description: ["10/10 - really amazing ice cream"],
        mapQuery: "Blue Gelato, Uluwatu, Indonesia",
    },
    {
        slug: "ivy-nelia-villa",
        countrySlug: "indonesia",
        citySlug: "uluwatu",
        heading: "Ivy Nelia Villa",
        images: [
            {
                src: "/destinations/indonesia.JPG",
                alt: "Ivy Nelia Villa",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Villa",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Ivy Nelia Villa, Uluwatu, Indonesia",
        pros: [
            "A not-too-expensive villa",
            "Big TV in the living room with three bathrooms, three bedrooms, outdoor kitchen, balcony and pool",
            "Super sweet dogs and cats at the villa",
            "The owner was very sweet",
            "Okay location",
        ],
        cons: ["Very dusty (got a lot of allergy)", "Not super super clean"],
    },
    {
        slug: "st-paul-s-cathedral",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "St. Paul's Cathedral",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "St. Paul's Cathedral",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Cathedral",
            },
        ],
        description: ["Beautiful church"],
        mapQuery: "St. Paul's Cathedral, Melbourne, Australia",
    },
    {
        slug: "healesville-sanctuary-zoos-victoria",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Healesville Sanctuary (Zoos Victoria)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Healesville Sanctuary (Zoos Victoria)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Wildlife shelter",
            },
        ],
        description: [
            "Very nice zoo with all kinds of animals and a bird show.",
            "Student discount available",
            "About an hour from central Melbourne",
        ],
        mapQuery: "Healesville Sanctuary (Zoos Victoria), Melbourne, Australia",
    },
    {
        slug: "yarra-river",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Yarra River",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Yarra River",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "River",
            },
        ],
        description: [],
        mapQuery: "Yarra River, Melbourne, Australia",
    },
    {
        slug: "chinatown-melbourne",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Chinatown Melbourne",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Chinatown Melbourne",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Historic landmark",
            },
        ],
        description: [],
        mapQuery: "Chinatown Melbourne, Melbourne, Australia",
    },
    {
        slug: "fitzroy-market-and-area",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Fitzroy Market and area",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Fitzroy Market and area",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Market",
            },
        ],
        description: [],
        mapQuery: "Fitzroy Market and area, Melbourne, Australia",
    },
    {
        slug: "acmi-museum",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "ACMI museum",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "ACMI museum",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["Free", "Pretty cool museum"],
        mapQuery: "ACMI museum, Melbourne, Australia",
    },
    {
        slug: "national-gallery-of-victoria",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "National Gallery of Victoria",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "National Gallery of Victoria",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["Free"],
        mapQuery: "National Gallery of Victoria, Melbourne, Australia",
    },
    {
        slug: "queen-victoria-night-market",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Queen Victoria Night Market",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Queen Victoria Night Market",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Night market",
            },
        ],
        description: ["Only on Wednesdays", "Cosy, but a bit expensive"],
        mapQuery: "Queen Victoria Night Market, Melbourne, Australia",
    },
    {
        slug: "wurundjeri-spur-lookout",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Wurundjeri Spur Lookout",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Wurundjeri Spur Lookout",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Scenic spot",
            },
        ],
        description: ["A lookout spot with a beautiful view"],
        mapQuery: "Wurundjeri Spur Lookout, Melbourne, Australia",
    },
    {
        slug: "queen-victoria-gardens",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Queen Victoria Gardens",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Queen Victoria Gardens",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Park",
            },
        ],
        description: [""],
        mapQuery: "Queen Victoria Gardens, Melbourne, Australia",
    },
    {
        slug: "street-art-laneways",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Street Art Laneways",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Street Art Laneways",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [],
        mapQuery: "Street Art Laneways, Melbourne, Australia",
    },
    {
        slug: "federation-square",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Federation Square",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Federation Square",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Square",
            },
        ],
        description: [],
        mapQuery: "Federation Square, Melbourne, Australia",
    },
    {
        slug: "some-pedestrian-crossing",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Some pedestrian crossing",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Some pedestrian crossing",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Some pedestrian crossing, Melbourne, Australia",
    },
    {
        slug: "see-cockatoos",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "See cockatoos",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "See cockatoos",
            },
        ],
        info: [],
        description: [],
        mapQuery: "See cockatoos, Melbourne, Australia",
    },
    {
        slug: "rooftop-bar-ved-cookie",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Rooftop bar ved Cookie",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Rooftop bar ved Cookie",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Cosy bar"],
        mapQuery: "Rooftop bar ved Cookie, Melbourne, Australia",
    },
    {
        slug: "naked-for-satan",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Naked For Satan",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Naked For Satan",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Nice bar with a fun theme."],
        mapQuery: "Naked For Satan, Melbourne, Australia",
    },
    {
        slug: "natklub",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Natklub",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Natklub",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Nightclub",
            },
        ],
        description: [""],
        mapQuery: "Natklub, Melbourne, Australia",
    },
    {
        slug: "hip-hop-music-spot-bar-up",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Hip-hop music spot (Bar Up?)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Hip-hop music spot (Bar Up?)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Nightclub",
            },
        ],
        description: [""],
        mapQuery: "Hip-hop music spot (Bar Up?), Melbourne, Australia",
    },
    {
        slug: "sushihub",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "Sushihub",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Sushihub",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Sushi takeaway",
            },
        ],
        description: ["Ask to have them cut up"],
        mapQuery: "Sushihub, Melbourne, Australia",
    },
    {
        slug: "with-friends",
        countrySlug: "australia",
        citySlug: "melbourne",
        heading: "With friends",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "With friends",
            },
        ],
        info: [],
        description: [],
        mapQuery: "With friends, Melbourne, Australia",
    },
    {
        slug: "royal-botanic-garden-sydney",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Royal Botanic Garden Sydney",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Royal Botanic Garden Sydney",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Botanical Garden",
            },
        ],
        description: [],
        mapQuery: "Royal Botanic Garden Sydney, Sydney, Australia",
    },
    {
        slug: "sydney-harbour-bridge",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Sydney Harbour Bridge",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Sydney Harbour Bridge",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bridge",
            },
        ],
        description: [],
        mapQuery: "Sydney Harbour Bridge, Sydney, Australia",
    },
    {
        slug: "sunday-market-ved-bondi",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Sunday Market ved Bondi",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Sunday Market ved Bondi",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Market",
            },
        ],
        description: ["Very cosy", "Food is expensive here"],
        mapQuery: "Sunday Market ved Bondi, Sydney, Australia",
    },
    {
        slug: "the-australian-museum",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "The Australian Museum",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Australian Museum",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["Free"],
        mapQuery: "The Australian Museum, Sydney, Australia",
    },
    {
        slug: "sydney-jewish-museum",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Sydney Jewish Museum",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Sydney Jewish Museum",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["Say you're a student to get a discount"],
        mapQuery: "Sydney Jewish Museum, Sydney, Australia",
    },
    {
        slug: "art-gallery-nsw",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Art Gallery NSW",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Art Gallery NSW",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["Free"],
        mapQuery: "Art Gallery NSW, Sydney, Australia",
    },
    {
        slug: "museum-of-contemporary-art",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Museum of Contemporary Art",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Museum of Contemporary Art",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Museum",
            },
        ],
        description: ["Free"],
        mapQuery: "Museum of Contemporary Art, Sydney, Australia",
    },
    {
        slug: "dudley-page-reserve",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Dudley Page Reserve",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Dudley Page Reserve",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Park",
            },
        ],
        description: ["Sunset spot"],
        mapQuery: "Dudley Page Reserve, Sydney, Australia",
    },
    {
        slug: "hyde-park",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Hyde Park",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Hyde Park",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Park",
            },
        ],
        description: [],
        mapQuery: "Hyde Park, Sydney, Australia",
    },
    {
        slug: "st-mary-s-cathedral",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "St Mary's Cathedral",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "St Mary's Cathedral",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Church",
            },
        ],
        description: ["Catholic Church"],
        mapQuery: "St Mary's Cathedral, Sydney, Australia",
    },
    {
        slug: "christison-park",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Christison Park",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Christison Park",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Park",
            },
        ],
        description: [],
        mapQuery: "Christison Park, Sydney, Australia",
    },
    {
        slug: "green-point-reserve",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Green Point Reserve",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Green Point Reserve",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Park",
            },
        ],
        description: [],
        mapQuery: "Green Point Reserve, Sydney, Australia",
    },
    {
        slug: "bondi-to-coogee-coastal-walk",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bondi to Coogee coastal walk",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bondi to Coogee coastal walk",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Route",
            },
        ],
        description: ["Good way to see the different beaches"],
        mapQuery: "Bondi to Coogee coastal walk, Sydney, Australia",
    },
    {
        slug: "city-central-around-town-hall-george-street-pitt-street",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "City Central around Town Hall, George Street, Pitt Street",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "City Central around Town Hall, George Street, Pitt Street",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Town Hall",
            },
        ],
        description: [],
        mapQuery:
            "City Central around Town Hall, George Street, Pitt Street, Sydney, Australia",
    },
    {
        slug: "darling-habour",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Darling Habour",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Darling Habour",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [],
        mapQuery: "Darling Habour, Sydney, Australia",
    },
    {
        slug: "bondi-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bondi Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bondi Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Bondi Beach, Sydney, Australia",
    },
    {
        slug: "tamarama-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Tamarama Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Tamarama Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Surf spot"],
        mapQuery: "Tamarama Beach, Sydney, Australia",
    },
    {
        slug: "bronte-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bronte Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bronte Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Bronte Beach, Sydney, Australia",
    },
    {
        slug: "clovelly-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Clovelly Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Clovelly Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Clovelly Beach, Sydney, Australia",
    },
    {
        slug: "gordon-s-bay",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Gordon's Bay",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Gordon's Bay",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Gordon's Bay, Sydney, Australia",
    },
    {
        slug: "rose-bay-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Rose Bay Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Rose Bay Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Rose Bay Beach, Sydney, Australia",
    },
    {
        slug: "coogee-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Coogee Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Coogee Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Coogee Beach, Sydney, Australia",
    },
    {
        slug: "milk-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Milk Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Milk Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Sunset spot"],
        mapQuery: "Milk Beach, Sydney, Australia",
    },
    {
        slug: "queens-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Queens Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Queens Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Sunset spot"],
        mapQuery: "Queens Beach, Sydney, Australia",
    },
    {
        slug: "camp-cove-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Camp Cove Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Camp Cove Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Camp Cove Beach, Sydney, Australia",
    },
    {
        slug: "bronte-baths",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bronte Baths",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bronte Baths",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Pool",
            },
        ],
        description: [],
        mapQuery: "Bronte Baths, Sydney, Australia",
    },
    {
        slug: "bondi-icebergs-club",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bondi Icebergs Club",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bondi Icebergs Club",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Swimming club",
            },
        ],
        description: ["Very nice", "Right next to Bondi Beach"],
        mapQuery: "Bondi Icebergs Club, Sydney, Australia",
    },
    {
        slug: "bondi-icebergs-pool",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bondi Icebergs Pool",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bondi Icebergs Pool",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Swimmingpool",
            },
        ],
        description: [],
        mapQuery: "Bondi Icebergs Pool, Sydney, Australia",
    },
    {
        slug: "giles-baths",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Giles Baths",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Giles Baths",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Pool",
            },
        ],
        description: [],
        mapQuery: "Giles Baths, Sydney, Australia",
    },
    {
        slug: "sydney-opera-house",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Sydney Opera House",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Sydney Opera House",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Theater",
            },
        ],
        description: [],
        mapQuery: "Sydney Opera House, Sydney, Australia",
    },
    {
        slug: "queens-beach-viewpoint",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Queens Beach Viewpoint",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Queens Beach Viewpoint",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Viewpoint",
            },
        ],
        description: ["A very good place to watch the sunset."],
        mapQuery: "Queens Beach Viewpoint, Sydney, Australia",
    },
    {
        slug: "watsons-bay",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Watsons Bay",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Watsons Bay",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Watsons Bay, Sydney, Australia",
    },
    {
        slug: "bondi-junction",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bondi Junction",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bondi Junction",
            },
        ],
        info: [],
        description: ["Good place to shop"],
        mapQuery: "Bondi Junction, Sydney, Australia",
    },
    {
        slug: "darling-quarter",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Darling Quarter",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Darling Quarter",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Darling Quarter, Sydney, Australia",
    },
    {
        slug: "barangaroo",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Barangaroo",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Barangaroo",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Barangaroo, Sydney, Australia",
    },
    {
        slug: "the-rocks",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "The Rocks",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Rocks",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Quarter",
            },
        ],
        description: [],
        mapQuery: "The Rocks, Sydney, Australia",
    },
    {
        slug: "circular-quay",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Circular Quay",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Circular Quay",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Circular Quay, Sydney, Australia",
    },
    {
        slug: "newtown-enmore-erskinville",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Newtown/Enmore/Erskinville",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Newtown/Enmore/Erskinville",
            },
        ],
        info: [],
        description: [
            "Outside the city but cool artsy places with vintage shops, pubs, live music",
        ],
        mapQuery: "Newtown/Enmore/Erskinville, Sydney, Australia",
    },
    {
        slug: "day-trip-to-manly",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Day trip to Manly",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Day trip to Manly",
            },
        ],
        info: [],
        description: ["Good way to see the opera house and the bridge"],
        mapQuery: "Day trip to Manly, Sydney, Australia",
    },
    {
        slug: "manly-to-spit-bridge-coastal-walk",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Manly To Spit Bridge Coastal Walk",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Manly To Spit Bridge Coastal Walk",
            },
        ],
        info: [],
        description: [],
        mapQuery: "Manly To Spit Bridge Coastal Walk, Sydney, Australia",
    },
    {
        slug: "manly-beach",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Manly Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Manly Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Manly Beach, Sydney, Australia",
    },
    {
        slug: "shelly-beach-manly",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Shelly Beach (Manly)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Shelly Beach (Manly)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Shelly Beach (Manly), Sydney, Australia",
    },
    {
        slug: "flower-bower-beach-manly",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Flower Bower Beach (Manly)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Flower Bower Beach (Manly)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [],
        mapQuery: "Flower Bower Beach (Manly), Sydney, Australia",
    },
    {
        slug: "flower-bower-rockpool-manly",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Flower Bower Rockpool (Manly)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Flower Bower Rockpool (Manly)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Pool",
            },
        ],
        description: [],
        mapQuery: "Flower Bower Rockpool (Manly), Sydney, Australia",
    },
    {
        slug: "cabbage-tree-bay-aquatic-reserve-manly",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Cabbage Tree Bay Aquatic Reserve (Manly)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Cabbage Tree Bay Aquatic Reserve (Manly)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [],
        mapQuery: "Cabbage Tree Bay Aquatic Reserve (Manly), Sydney, Australia",
    },
    {
        slug: "old-mate-s-place",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Old Mate's Place",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Old Mate's Place",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Secret bar"],
        mapQuery: "Old Mate's Place, Sydney, Australia",
    },
    {
        slug: "the-baxter-inn",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "The Baxter Inn",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Baxter Inn",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Secret bar"],
        mapQuery: "The Baxter Inn, Sydney, Australia",
    },
    {
        slug: "establishment-bar",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Establishment Bar",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Establishment Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: [""],
        mapQuery: "Establishment Bar, Sydney, Australia",
    },
    {
        slug: "bangkok-bites",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Bangkok Bites",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bangkok Bites",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Good Thai food"],
        mapQuery: "Bangkok Bites, Sydney, Australia",
    },
    {
        slug: "gelato-messina-bondi",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Gelato Messina Bondi",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Gelato Messina Bondi",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Ice cream place",
            },
        ],
        description: ["Very good ice cream"],
        mapQuery: "Gelato Messina Bondi, Sydney, Australia",
    },
    {
        slug: "the-grumpy-baker",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "The Grumpy Baker",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Grumpy Baker",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bakery",
            },
        ],
        description: [""],
        mapQuery: "The Grumpy Baker, Sydney, Australia",
    },
    {
        slug: "my-little-israel",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "My Little Israel",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "My Little Israel",
            },
        ],
        info: [],
        description: [""],
        mapQuery: "My Little Israel, Sydney, Australia",
    },
    {
        slug: "tamarama-beach-kiosk",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Tamarama Beach Kiosk",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Tamarama Beach Kiosk",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: ["Right at Tamarama Beach"],
        mapQuery: "Tamarama Beach Kiosk, Sydney, Australia",
    },
    {
        slug: "the-italian-bowl",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "The Italian Bowl",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Italian Bowl",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Italian restaurant", "You can BYO"],
        mapQuery: "The Italian Bowl, Sydney, Australia",
    },
    {
        slug: "min-young-to",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "Min Young To",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Min Young To",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: ["Asian restaurant", "You can BYO"],
        mapQuery: "Min Young To, Sydney, Australia",
    },
    {
        slug: "the-boathouse-shelly-beach-manly",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "The Boathouse Shelly Beach (Manly)",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Boathouse Shelly Beach (Manly)",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: ["Asian restaurant"],
        mapQuery: "The Boathouse Shelly Beach (Manly), Sydney, Australia",
    },
    {
        slug: "with-friends",
        countrySlug: "australia",
        citySlug: "sydney",
        heading: "With friends",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "With friends",
            },
        ],
        info: [],
        description: [],
        mapQuery: "With friends, Sydney, Australia",
    },
    {
        slug: "main-beach",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Main Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Main Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "The beach in front of Main Town",
            "Right by the grass",
            "Often live music",
        ],
        mapQuery: "Main Beach, Byron Bay, Australia",
    },
    {
        slug: "clark-s-beach",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Clark's Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Clark's Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Very nice to chill there"],
        mapQuery: "Clark's Beach, Byron Bay, Australia",
    },
    {
        slug: "the-pass",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "The Pass",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Pass",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["The surfing spot", "Very beautiful", "Good café nearby"],
        mapQuery: "The Pass, Byron Bay, Australia",
    },
    {
        slug: "wategos-beach",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Wategos Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Wategos Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: [
            "It's known to walk from the centre to The Lighthouse, which is supposed to be very beautiful",
        ],
        mapQuery: "Wategos Beach, Byron Bay, Australia",
    },
    {
        slug: "the-railway-bar",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "The Railway Bar",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "The Railway Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar",
            },
        ],
        description: ["Very chill bar", "Live music there"],
        mapQuery: "The Railway Bar, Byron Bay, Australia",
    },
    {
        slug: "beach-hotel",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Beach Hotel",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Beach Hotel",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Bar / Club",
            },
        ],
        description: [
            "Insanely expensive",
            "The best place for drinks with great live music all the time",
        ],
        mapQuery: "Beach Hotel, Byron Bay, Australia",
    },
    {
        slug: "casa-luna",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Casa Luna",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Casa Luna",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant / Bar / Club",
            },
        ],
        description: ["Turns into a club sometimes"],
        mapQuery: "Casa Luna, Byron Bay, Australia",
    },
    {
        slug: "bay-kebab",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Bay Kebab",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Bay Kebab",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [
            "Supposed to be the best kebab in Byron, but we weren't big fans",
            "Very expensive",
        ],
        mapQuery: "Bay Kebab, Byron Bay, Australia",
    },
    {
        slug: "bayleaf-cafe",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "BayLeaf Cafe",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "BayLeaf Cafe",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: ["Good brunch spot, but very expensive"],
        mapQuery: "BayLeaf Cafe, Byron Bay, Australia",
    },
    {
        slug: "in-the-pink",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "In The Pink",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "In The Pink",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Ice cream place",
            },
        ],
        description: ["The best ice cream in town", "Highly recommended"],
        mapQuery: "In The Pink, Byron Bay, Australia",
    },
    {
        slug: "twisted-sistas",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Twisted Sistas",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Twisted Sistas",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: ["The best iced coffee and not super expensive"],
        mapQuery: "Twisted Sistas, Byron Bay, Australia",
    },
    {
        slug: "discovery-parks-camping",
        countrySlug: "australia",
        citySlug: "byron-bay",
        heading: "Discovery Parks camping",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Discovery Parks camping",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Camping",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "4 nights",
            },
        ],
        description: [],
        mapQuery: "Discovery Parks camping, Byron Bay, Australia",
        cons: ["Crap"],
    },
    {
        slug: "great-barrier-reef",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Great Barrier Reef",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Great Barrier Reef",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Coral reefs",
            },
        ],
        description: ["Diving or snorkelling"],
        mapQuery: "Great Barrier Reef, Cairns, Australia",
    },
    {
        slug: "daintree-rainforest",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Daintree Rainforest",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Daintree Rainforest",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "National Park",
            },
        ],
        description: [],
        mapQuery: "Daintree Rainforest, Cairns, Australia",
    },
    {
        slug: "josephine-falls",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Josephine Falls",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Josephine Falls",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [],
        mapQuery: "Josephine Falls, Cairns, Australia",
    },
    {
        slug: "millaa-millaa-falls",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Millaa Millaa Falls",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Millaa Millaa Falls",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Attraction",
            },
        ],
        description: [],
        mapQuery: "Millaa Millaa Falls, Cairns, Australia",
    },
    {
        slug: "fitzroy-island",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Fitzroy Island",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Fitzroy Island",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Island",
            },
        ],
        description: [],
        mapQuery: "Fitzroy Island, Cairns, Australia",
    },
    {
        slug: "that-pool",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "That pool",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "That pool",
            },
        ],
        info: [],
        description: [],
        mapQuery: "That pool, Cairns, Australia",
    },
    {
        slug: "gilligans-backpackers",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Gilligans Backpackers",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Gilligans Backpackers",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
        ],
        description: [],
        mapQuery: "Gilligans Backpackers, Cairns, Australia",
    },
    {
        slug: "salt-house",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Salt House",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Salt House",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Restaurant",
            },
        ],
        description: [],
        mapQuery: "Salt House, Cairns, Australia",
    },
    {
        slug: "candy-cafe-bar",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Candy Cafe Bar",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Candy Cafe Bar",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Café",
            },
        ],
        description: [""],
        mapQuery: "Candy Cafe Bar, Cairns, Australia",
    },
    {
        slug: "gilligans-backpackers-2",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Gilligans Backpackers",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Gilligans Backpackers",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Gilligans Backpackers, Cairns, Australia",
    },
    {
        slug: "air-b-and-b",
        countrySlug: "australia",
        citySlug: "cairns",
        heading: "Air B&B",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Air B&B",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Hostel",
            },
            {
                id: "stayed",
                typeTitle: "Length of stay",
                title: "3 nights",
            },
        ],
        description: [],
        mapQuery: "Air B&B, Cairns, Australia",
    },
    {
        slug: "target-beach",
        countrySlug: "australia",
        citySlug: "currarong",
        heading: "Target Beach",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Target Beach",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Beach",
            },
        ],
        description: ["Good surf spot", "A bit difficult to get there"],
        mapQuery: "Target Beach, Currarong, Australia",
    },
    {
        slug: "watersedge",
        countrySlug: "australia",
        citySlug: "currarong",
        heading: "Watersedge",
        images: [
            {
                src: "/destinations/australia.JPG",
                alt: "Watersedge",
            },
        ],
        info: [
            {
                id: "type",
                typeTitle: "Type",
                title: "Holiday home",
            },
        ],
        description: [],
        mapQuery: "Watersedge, Currarong, Australia",
        pros: ["Very large with many rooms"],
    },
];

export const getActivity = async (
    countrySlug: string,
    citySlug: string,
    slug: string,
): Promise<Activity | undefined> =>
    ACTIVITIES.find(
        (activity) =>
            activity.countrySlug === countrySlug &&
            activity.citySlug === citySlug &&
            activity.slug === slug,
    );

export const getActivityParams = async (): Promise<
    { country: string; city: string; activity: string }[]
> =>
    ACTIVITIES.map((activity) => ({
        country: activity.countrySlug,
        city: activity.citySlug,
        activity: activity.slug,
    }));
