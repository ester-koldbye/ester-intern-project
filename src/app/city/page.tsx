import { Hero } from "@/components/modules/hero/hero";
import { Tips } from "@/components/modules/tips/tips";
import { Breadcrumbs } from "@/components/ui/molecules/breadcrumbs/breadcrumbs";


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

const City = () => {
    return (
        <main>
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
            <Tips id="tips"/>

            
            
            <Tips id="what-we-miss"/>
        </main>
    );
};

City.displayName = "City";

export default City;
