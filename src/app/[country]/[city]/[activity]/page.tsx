// Single-activity detail page, e.g. /thailand/bangkok/wat-arun — what
// ActivityCard's "Read more" button links to. Nested under its city so the
// URL matches the real country -> city -> activity hierarchy. Content comes
// from `getActivity`, which today reads a local mock list but is already
// shaped like an async fetch, so swapping it for a real API/CMS call later
// doesn't change this page.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ActivityGallery, ActivityInfoIcons } from "@/components/modules/activity-gallery/activity-gallery";
import { ActivityAbout } from "@/components/modules/activity-about/activity-about";
import { Hero } from "@/components/modules/hero/hero";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { getActivity, getActivityParams } from "@/lib/activities";
import { getCountry, getCity, getNavCountries } from "@/lib/destinations";

// Icons per well-known info row, matching Figma's own four (see ActivityInfoIcons) — "Visited" needs none, InfoItem's own default is already the clock glyph.
const ICON_BY_INFO_ID: Record<string, React.ReactNode> = {
    type: ActivityInfoIcons.type,
    price: ActivityInfoIcons.price,
    dresscode: ActivityInfoIcons.dresscode,
};

// Pre-renders every known activity at build time; new slugs added later still work, just rendered on first request instead.
export async function generateStaticParams() {
    return getActivityParams();
}

export async function generateMetadata({
    params,
}: PageProps<"/[country]/[city]/[activity]">): Promise<Metadata> {
    const { country, city, activity: activitySlug } = await params;
    const activity = await getActivity(country, city, activitySlug);

    if (!activity) {
        return { title: "Activity not found" };
    }

    return {
        title: `Travel recommendations | ${activity.heading}`,
        description: `Everything to know about ${activity.heading}.`,
    };
}

const ActivityPage = async ({
    params,
}: PageProps<"/[country]/[city]/[activity]">) => {
    const { country: countrySlug, city: citySlug, activity: activitySlug } = await params;

    const [activity, country, city, navCountries] = await Promise.all([
        getActivity(countrySlug, citySlug, activitySlug),
        getCountry(countrySlug),
        getCity(countrySlug, citySlug),
        getNavCountries(),
    ]);

    if (!activity || !country || !city) {
        notFound();
    }

    const breadcrumbItems = [
        { href: "/", label: "Home" },
        { href: `/${country.slug}`, label: country.name },
        { href: `/${country.slug}/${city.slug}`, label: city.name },
        { href: `/${country.slug}/${city.slug}/${activity.slug}`, label: activity.heading },
    ];

    return (
        <main>
            {/* Hero section with page intro, no jump-links on this page */}
            <Hero
                backgroundSrc={city.imageSrc} /* TODO: have an activity image */
                countries={navCountries}
                activeCountryHref={`/${country.slug}`}
                heading={activity.heading}
                description={`Everything to know about ${activity.heading}.`}
            />

            <div className="px-padding-inline-mobile md:px-padding-m-inline lg:px-padding-xl-inline py-padding-block-mobile md:py-padding-m-block lg:py-padding-xl-block">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
            <ActivityGallery
                heading={activity.heading}
                headingLevel={2}
                images={activity.images}
                info={activity.info.map((item) => ({
                    ...item,
                    icon: item.icon ?? ICON_BY_INFO_ID[item.id],
                }))}
            />
            <ActivityAbout
                description={activity.description}
                pros={activity.pros}
                cons={activity.cons}
                mapQuery={activity.mapQuery}
            />
        </main>
    );
};

ActivityPage.displayName = "ActivityPage";

export default ActivityPage;
