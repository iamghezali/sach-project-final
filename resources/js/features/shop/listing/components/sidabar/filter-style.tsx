import type { JSX } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useShopFilters } from '@/features/shop/listing/hooks/use-shop-filters';

const stylesFilters = [
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'workwear', label: 'Workwear' },
    { value: 'evening', label: 'Evening' },
    { value: 'everyday', label: 'Everyday' },
];

export default function FilterStyle(): JSX.Element {
    const { filters, setFilters } = useShopFilters();

    const selected = filters.category ?? [];

    function handleChange(value: string, checked: boolean) {
        const next = checked ? [...selected, value] : selected.filter((v) => v !== value);

        setFilters({ category: next.length ? next : undefined });
    }

    return (
        <div className="flex flex-col gap-1">
            {stylesFilters.map((stylesFilter, i) => (
                <div
                    className="flex items-center gap-5"
                    key={`filter-style-${stylesFilter.value}-${i}`}
                >
                    <Checkbox
                        id={`filter-style-${stylesFilter.value}`}
                        variant="brand-primary"
                        checked={selected.includes(stylesFilter.value)}
                        onCheckedChange={(checked) => handleChange(stylesFilter.value, !!checked)}
                    />
                    <Label
                        className="py-0.5 text-base font-normal"
                        htmlFor={`filter-style-${stylesFilter.value}`}
                    >
                        {stylesFilter.label}
                    </Label>
                </div>
            ))}
        </div>
    );
}
