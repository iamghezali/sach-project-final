import type { JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useShopFilters } from '@/features/shop/listing/hooks/use-shop-filters';

type HexColor = `#${string}`;

interface Props {
    color: HexColor;
}

const DisplayColor = ({ color }: Props) => (
    <div
        className="size-12 rounded-lg ring-[0.5px] ring-neutral-400"
        style={{
            backgroundColor: color,
            color: color,
        }}
    ></div>
);

export default function FilterColors(): JSX.Element {
    const { filters, setFilters } = useShopFilters();

    return (
        <ToggleGroup
            className="flex flex-wrap"
            type="multiple"
            variant="colors-filter"
            size="filter"
            spacing={3}
            value={filters.color ?? []}
            onValueChange={(value) => setFilters({ color: value.length ? value : undefined })}
        >
            <ToggleGroupItem value="white">
                <DisplayColor color="#EBE7E9" />
            </ToggleGroupItem>

            <ToggleGroupItem value="brown">
                <DisplayColor color="#794B33" />
            </ToggleGroupItem>

            <ToggleGroupItem value="blue">
                <DisplayColor color="#747682" />
            </ToggleGroupItem>

            <ToggleGroupItem value="beige">
                <DisplayColor color="#B6A496" />
            </ToggleGroupItem>

            <ToggleGroupItem value="black">
                <DisplayColor color="#353336" />
            </ToggleGroupItem>

            <ToggleGroupItem value="silver">
                <DisplayColor color="#C9CCC6" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
