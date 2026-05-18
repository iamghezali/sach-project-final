import type { JSX } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function FilterFabric(): JSX.Element {
    const fabricFilters = [
        {
            value: 'coton',
            label: 'Coton',
        },
        {
            value: 'linen',
            label: 'Linen',
        },
        {
            value: 'satin',
            label: 'Satin',
        },
        {
            value: 'wool_blend',
            label: 'Wool blend',
        },
    ];

    return (
        <div className="flex flex-col gap-1">
            {fabricFilters.map((stylesFilter, i) => (
                <div
                    className="flex items-center gap-5"
                    key={`filter-style-${stylesFilter.value}-${i}`}
                >
                    <Checkbox
                        id={`filter-style-${stylesFilter.value}`}
                        variant="brand-primary"
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
