import { Hero } from "@/components/modules/hero/hero";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";


export const metadata = {
  title: "Travel recommendations | singlepage",
  description: "Welcome to the singlepage page of my travel recommendations!",
};

// BREADCRUMB
const ITEMS = [
    { href: "/", label: "Home" },
    { href: "/country", label: "Country" },
    { href: "/city", label: "City" },
    { href: "/singlepage", label: "Singlepage" },
];

const Singlepage = () => {
    return (
        <main>
            <Hero
                countries={[]}
                heading="Singlepage"
                description="This is the singlepage."
            />
            <div className="py-padding-inline-mobile lg:py-padding-inline px-padding-block-mobile lg:px-padding-xl-block">
                <Breadcrumbs items={ITEMS} />
            </div>
            
        </main>
    );
};

Singlepage.displayName = "Singlepage";

export default Singlepage;
