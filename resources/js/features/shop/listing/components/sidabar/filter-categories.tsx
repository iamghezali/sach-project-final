import type { JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useShopFilters } from '@/features/shop/listing/hooks/use-shop-filters';

export default function FilterCategories(): JSX.Element {
    const { filters, setFilters } = useShopFilters();

    return (
        <ToggleGroup
            className="flex flex-wrap"
            type="multiple"
            variant="categories-filter"
            size="filter"
            spacing={3}
            value={filters.category ?? []}
            onValueChange={(value) => setFilters({ category: value.length ? value : undefined })}
        >
            <ToggleGroupItem value="dresses">Dresses</ToggleGroupItem>
            <ToggleGroupItem value="sets">Sets</ToggleGroupItem>
            <ToggleGroupItem value="tops">Tops</ToggleGroupItem>
            <ToggleGroupItem value="vests">Vests</ToggleGroupItem>
            <ToggleGroupItem value="abayas">Abayas</ToggleGroupItem>
            <ToggleGroupItem value="everyday_Wear">Everyday Wear</ToggleGroupItem>
            <ToggleGroupItem
                value="pullovers"
                disabled
            >
                Pullovers
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
