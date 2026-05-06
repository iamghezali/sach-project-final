import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
    'flex field-sizing-content w-full rounded-lg border bg-transparent text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    {
        variants: {
            variant: {
                default: 'min-h-16 border-input px-2.5 py-2',
                'brand-primary': 'min-h-28 border-brand-neutral-1000 px-4 py-4',
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    },
);

function Textarea({
    className,
    variant = 'default',
    ...props
}: React.ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(textareaVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Textarea };
