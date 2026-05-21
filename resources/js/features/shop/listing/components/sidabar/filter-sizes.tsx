import type { JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useShopFilters } from '@/features/shop/listing/hooks/use-shop-filters';

export default function FilterSizes(): JSX.Element {
    const { filters, setFilters } = useShopFilters();

    return (
        <>
            <ToggleGroup
                type="multiple"
                variant="sizes-filter"
                spacing={2}
                size="filter"
                value={filters.size ?? []}
                onValueChange={(value) => setFilters({ size: value.length ? value : undefined })}
            >
                <ToggleGroupItem value="xs">XS</ToggleGroupItem>
                <ToggleGroupItem value="s">S</ToggleGroupItem>
                <ToggleGroupItem value="m">M</ToggleGroupItem>
                <ToggleGroupItem value="l">L</ToggleGroupItem>
                <ToggleGroupItem
                    value="xl"
                    disabled
                >
                    XL
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="xxl"
                    disabled
                >
                    XXL
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
