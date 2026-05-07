import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
    "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline: 'border border-input bg-transparent hover:bg-muted',

                'brand-co-type': [
                    'inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-brand-neutral-alt-500 text-black disabled:bg-brand-neutral-200 disabled:text-brand-neutral-500',
                    'hover:border-brand-primary-100/50 hover:bg-brand-primary-100/70 data-[state=on]:border-brand-primary-100 data-[state=on]:bg-brand-primary-100',
                ],

                'brand-co-gender': [
                    'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-brand-neutral-alt-500 text-black disabled:text-brand-neutral-alt-500',
                    'hover:border-[#D89DBA]/70 hover:bg-[#D89DBA]/50 data-[state=on]:border-[#D89DBA] data-[state=on]:bg-[#D89DBA]',
                ],

                'brand-co-sizes': [
                    'flex-1 rounded-lg bg-brand-shade-white text-brand-neutral-1000 hover:bg-brand-neutral-1000/90 hover:text-white disabled:bg-brand-neutral-200 disabled:text-brand-neutral-500',
                    'data-[state=on]:bg-brand-neutral-1000 data-[state=on]:text-white',
                ],
                'brand-co-measurment-type': [
                    'items-center justify-center rounded-lg border border-brand-neutral-alt-500',
                    'hover:border-brand-primary-100/50 hover:bg-brand-primary-100/70 data-[state=on]:border-brand-primary-100 data-[state=on]:bg-brand-primary-100',
                ],
            },
            size: {
                default: 'h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
                sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: 'h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',

                'brand-co-item': 'h-12 font-normal',
                'brand-co-size-item': 'h-12 text-sm font-medium',

                'brand-co-measurment-type': "h-48 w-78 [&_svg:not([class*='size-'])]:size-20",
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Toggle({
    className,
    variant = 'default',
    size = 'default',
    ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
    return (
        <TogglePrimitive.Root
            data-slot="toggle"
            className={cn(toggleVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Toggle, toggleVariants };
