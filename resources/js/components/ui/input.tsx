import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    'w-full min-w-0 rounded-lg border text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    {
        variants: {
            variant: {
                default: 'h-8 border-input bg-transparent px-2.5 py-1',
                'brand-primary': 'h-12 border-brand-neutral-1000 px-4 py-1',
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    },
);

function Input({
    className,
    type,
    variant = 'default',
    ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(inputVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Input };
