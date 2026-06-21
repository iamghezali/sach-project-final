import type { JSX } from 'react';
import React from 'react';
import { cn } from '@/lib/utils';

export default function Container({ children, className, ...props }: React.ComponentProps<'div'>): JSX.Element {
    return (
        <div
            {...props}
            className={cn('rounded-2xl border border-brand-neutral-alt-400 bg-brand-shade-white px-4 py-5', className)}
        >
            {children}
        </div>
    );
}
