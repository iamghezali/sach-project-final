import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const radioGroupItemVariants = cva(
    'group/radio-group-item peer relative flex aspect-square shrink-0 rounded-full outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:data-checked:bg-primary',
    {
        variants: {
            variant: {
                default:
                    'size-4 border border-input data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',

                'brand-primary': 'size-6 border-2 border-brand-neutral-1000',
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    },
);

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            className={cn('grid w-full gap-2', className)}
            {...props}
        />
    );
}

function RadioGroupItem({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioGroupItemVariants>) {
    return (
        <RadioGroupPrimitive.Item
            data-slot="radio-group-item"
            className={cn(radioGroupItemVariants({ variant }), className)}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className={cn('flex size-4 items-center justify-center', variant === 'brand-primary' && 'size-6')}
            >
                <span
                    className={cn(
                        'absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground',
                        variant === 'brand-primary' && 'size-3 bg-brand-neutral-1000',
                    )}
                />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
