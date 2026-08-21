import type { ActivityGalleryImage, ActivityInfoItem } from "@/components/modules/activity-gallery/activity-gallery";

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
            { src: "/destinations/thailand/bangkok.jpg", alt: "Wat Arun temple at sunset" },
            { src: "/destinations/thailand/chiang-mai.jpg", alt: "" },
            { src: "/destinations/thailand/koh-tao.JPG", alt: "" },
            { src: "/destinations/thailand/pai.JPG", alt: "" },
            { src: "/destinations/thailand/krabi.JPG", alt: "" },
            { src: "/destinations/thailand/phiphi.jpg", alt: "" },
        ],
        info: [
            { id: "type", typeTitle: "Type", title: "Temple" },
            { id: "visited", typeTitle: "Visited", title: "December 2022" },
            { id: "price", typeTitle: "Price", title: "We didn't pay", description: "But it does cost money" },
            { id: "dresscode", typeTitle: "Dresscode", title: "You have do cover up" },
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
