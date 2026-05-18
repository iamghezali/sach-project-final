import type { JSX } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function FilterStyle(): JSX.Element {
    const stylesFilters = [
        {
            value: 'casual',
            label: 'Casual',
        },
        {
            value: 'formal',
            label: 'Formal',
        },
        {
            value: 'workwear',
            label: 'Workwear',
        },
        {
            value: 'evening',
            label: 'Evening',
        },
        {
            value: 'everyday',
            label: 'Everyday',
        },
    ];

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
