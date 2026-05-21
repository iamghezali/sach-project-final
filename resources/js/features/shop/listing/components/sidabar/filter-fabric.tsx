import type { JSX } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useShopFilters } from '@/features/shop/listing/hooks/use-shop-filters';

const fabricFilters = [
    { value: 'coton', label: 'Coton' },
    { value: 'linen', label: 'Linen' },
    { value: 'satin', label: 'Satin' },
    { value: 'wool_blend', label: 'Wool blend' },
];

export default function FilterFabric(): JSX.Element {
    const { filters, setFilters } = useShopFilters();

    const selected = filters.category ?? [];

    function handleChange(value: string, checked: boolean) {
        const next = checked ? [...selected, value] : selected.filter((v) => v !== value);

        setFilters({ category: next.length ? next : undefined });
    }

    return (
        <div className="flex flex-col gap-1">
            {fabricFilters.map((fabricFilter, i) => (
                <div
                    className="flex items-center gap-5"
                    key={`filter-fabric-${fabricFilter.value}-${i}`}
                >
                    <Checkbox
                        id={`filter-fabric-${fabricFilter.value}`}
                        variant="brand-primary"
                        checked={selected.includes(fabricFilter.value)}
                        onCheckedChange={(checked) => handleChange(fabricFilter.value, !!checked)}
                    />
                    <Label
                        className="py-0.5 text-base font-normal"
                        htmlFor={`filter-fabric-${fabricFilter.value}`}
                    >
                        {fabricFilter.label}
                    </Label>
                </div>
            ))}
        </div>
    );
}
