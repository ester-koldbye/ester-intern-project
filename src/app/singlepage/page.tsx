// Singlepage: bare-bones page template with just a hero and breadcrumbs (WIP)
import { Hero } from "@/components/modules/hero/hero";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";
import { getNavCountries } from "@/lib/destinations";


// SEO metadata for this route
export const metadata = {
  title: "Travel recommendations | singlepage",
  description: "Welcome to the singlepage page of my travel recommendations!",
};

// BREADCRUMB — no real parent page for this WIP template, so just Home -> Singlepage.
const ITEMS = [
    { href: "/", label: "Home" },
    { href: "/singlepage", label: "Singlepage" },
];

const Singlepage = async () => {
    const countries = await getNavCountries();

    return (
        <main>
            {/* Hero section with page intro, no jump-links on this page */}
            <Hero
                countries={countries}
                heading="Singlepage"
                description="This is the singlepage."
            />
            <div className="py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <Breadcrumbs items={ITEMS} />
            </div>
            {/* TODO: page content goes here */}
        </main>
    );
};

Singlepage.displayName = "Singlepage";

export default Singlepage;
