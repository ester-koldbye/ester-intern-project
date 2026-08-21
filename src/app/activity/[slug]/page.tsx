// Single-activity detail page, e.g. /activity/wat-arun — what ActivityCard's
// "Read more" button links to. Content comes from `getActivity`, which today
// reads a local mock list but is already shaped like an async fetch, so
// swapping it for a real API/CMS call later doesn't change this page.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ActivityGallery, ActivityInfoIcons } from "@/components/modules/activity-gallery/activity-gallery";
import { ActivityAbout } from "@/components/modules/activity-about/activity-about";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { getActivity, getActivitySlugs } from "@/lib/activities";
import { Hero } from "@/components/modules/hero/hero";



const COUNTRIES = [
    { href: "/australia", label: "Australia" },
    { href: "/thailand", label: "Thailand" },
    { href: "/indonesia", label: "Indonesia" },
    { href: "/vietnam", label: "Vietnam" },
    { href: "/italy", label: "Italy" },
];


// Icons per well-known info row, matching Figma's own four (see ActivityInfoIcons) — "Visited" needs none, InfoItem's own default is already the clock glyph.
const ICON_BY_INFO_ID: Record<string, React.ReactNode> = {
    type: ActivityInfoIcons.type,
    price: ActivityInfoIcons.price,
    dresscode: ActivityInfoIcons.dresscode,
};

// Pre-renders every known activity at build time; new slugs added later still work, just rendered on first request instead.
export async function generateStaticParams() {
    const slugs = await getActivitySlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: PageProps<"/activity/[slug]">): Promise<Metadata> {
    const { slug } = await params;
    const activity = await getActivity(slug);

    if (!activity) {
        return { title: "Activity not found" };
    }

    return {
        title: `Travel recommendations | ${activity.heading}`,
        description: `Everything to know about ${activity.heading}.`,
    };
}

const ActivityPage = async ({ params }: PageProps<"/activity/[slug]">) => {
    const { slug } = await params;
    const activity = await getActivity(slug);

    if (!activity) {
        notFound();
    }

    const breadcrumbItems = [
        { href: "/", label: "Home" },
        { href: `/activity/${activity.slug}`, label: activity.heading },
    ];

    return (
        <main>
            {/* Hero section with page intro, no jump-links on this page */}
            <Hero
                countries={COUNTRIES}
                heading={activity.heading}
                description="This is the singlepage."
            />

            <div className="py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
            <ActivityGallery
                heading={activity.heading}
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
