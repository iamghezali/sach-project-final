import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const trackVariants = cva(
    'relative grow overflow-hidden rounded-full data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1',
    {
        variants: {
            variant: {
                default: 'bg-muted',
                'brand-primary': 'bg-brand-primary-300/20',
                'brand-neutral': 'bg-brand-neutral-1000',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const rangeVariants = cva('absolute select-none data-horizontal:h-full data-vertical:w-full', {
    variants: {
        variant: {
            default: 'bg-primary',
            'brand-primary': 'bg-brand-primary-300',
            'brand-neutral': 'bg-brand-secondary-300',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const thumbVariants = cva(
    'relative block shrink-0 rounded-full border border-ring ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'size-3 bg-white',
                'brand-primary': 'size-4 bg-white',
                'brand-neutral': 'size-4 border-brand-secondary-300 bg-brand-secondary-300 ring-brand-secondary-300/50',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Slider({
    className,
    defaultValue,
    value,
    variant,
    min = 0,
    max = 100,
    ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & VariantProps<typeof trackVariants>) {
    const _values = React.useMemo(
        () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
        [value, defaultValue, min, max],
    );

    return (
        <SliderPrimitive.Root
            data-slot="slider"
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            className={cn(
                'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                data-slot="slider-track"
                className={cn(trackVariants({ variant }))}
            >
                <SliderPrimitive.Range
                    data-slot="slider-range"
                    className={cn(rangeVariants({ variant }))}
                />
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
                <SliderPrimitive.Thumb
                    data-slot="slider-thumb"
                    key={index}
                    className={cn(thumbVariants({ variant }))}
                />
            ))}
        </SliderPrimitive.Root>
    );
}

export { Slider };
