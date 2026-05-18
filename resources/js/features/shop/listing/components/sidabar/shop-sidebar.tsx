import type { JSX } from 'react';
import FilterCategories from '@/features/shop/listing/components/sidabar/filter-categories';
import FilterColors from '@/features/shop/listing/components/sidabar/filter-colors';
import FilterFabric from '@/features/shop/listing/components/sidabar/filter-fabric';
import FilterPricing from '@/features/shop/listing/components/sidabar/filter-pricing';
import FilterSizes from '@/features/shop/listing/components/sidabar/filter-sizes';
import FilterStyle from '@/features/shop/listing/components/sidabar/filter-style';
import {
    FilterAccordion,
    FilterAccordionContent,
    FilterAccordionItem,
    FilterAccordionTrigger,
} from '@/features/shop/listing/components/sidabar/filters-accordion';

export default function ShopSidebar(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-2xl/tight font-semibold text-brand-neutral-1000">Filters</span>

            <FilterAccordion
                type="multiple"
                defaultValue={['category', 'size', 'color', 'style', 'fabric', 'price']}
            >
                <FilterAccordionItem value="category">
                    <FilterAccordionTrigger>Category</FilterAccordionTrigger>
                    <FilterAccordionContent>
                        <FilterCategories />
                    </FilterAccordionContent>
                </FilterAccordionItem>

                <FilterAccordionItem value="size">
                    <FilterAccordionTrigger>Size</FilterAccordionTrigger>
                    <FilterAccordionContent>
                        <FilterSizes />
                    </FilterAccordionContent>
                </FilterAccordionItem>

                <FilterAccordionItem value="color">
                    <FilterAccordionTrigger>Color</FilterAccordionTrigger>
                    <FilterAccordionContent>
                        <FilterColors />
                    </FilterAccordionContent>
                </FilterAccordionItem>

                <FilterAccordionItem value="style">
                    <FilterAccordionTrigger>Style</FilterAccordionTrigger>
                    <FilterAccordionContent>
                        <FilterStyle />
                    </FilterAccordionContent>
                </FilterAccordionItem>

                <FilterAccordionItem value="fabric">
                    <FilterAccordionTrigger>Fabric</FilterAccordionTrigger>
                    <FilterAccordionContent>
                        <FilterFabric />
                    </FilterAccordionContent>
                </FilterAccordionItem>

                <FilterAccordionItem value="price">
                    <FilterAccordionTrigger>Price</FilterAccordionTrigger>
                    <FilterAccordionContent className="pt-6 pb-4">
                        <FilterPricing />
                    </FilterAccordionContent>
                </FilterAccordionItem>
            </FilterAccordion>
        </div>
    );
}
