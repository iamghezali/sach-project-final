import type { JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function FilterSizes(): JSX.Element {
    return (
        <>
            <ToggleGroup
                type="multiple"
                variant="sizes-filter"
                spacing={2}
                size="filter"
                defaultValue={['l']}
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
