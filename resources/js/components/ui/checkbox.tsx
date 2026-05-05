import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
    'peer relative flex shrink-0 items-center justify-center transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:data-checked:bg-primary',
    {
        variants: {
            variant: {
                default:
                    'size-4 rounded-sm border border-input data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',
                'brand-primary':
                    'size-4.5 rounded-xs border-2 border-brand-neutral-1000 data-checked:border-brand-neutral-1000 data-checked:bg-brand-neutral-1000 data-checked:text-white',
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    },
);

function Checkbox({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(checkboxVariants({ variant }), className)}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
            >
                <CheckIcon strokeWidth={variant === 'brand-primary' ? 3 : 2} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
