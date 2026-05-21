import { useState } from 'react';
import type { JSX } from 'react';
import { Slider } from '@/components/ui/slider';

export default function FilterPricing(): JSX.Element {
    const [value, setValue] = useState([4500, 23000]);

    return (
        <>
            <Slider
                className="w-full"
                value={value}
                onValueChange={setValue}
                min={1000}
                max={50000}
                step={2000}
                variant="brand-neutral"
                disabled
            />

            <div className="mt-2 flex w-full basis-full items-center justify-between text-sm font-medium text-brand-neutral-1000/80">
                <span>{value[0]} DZD</span>
                <span>{value[1]} DZD</span>
            </div>
        </>
    );
}
