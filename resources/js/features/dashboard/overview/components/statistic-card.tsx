import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { JSX } from 'react';
import React from 'react';
import ElipseDecoration from '@/features/tailor/stats/components/elipse-decoration';
import { cn } from '@/lib/utils';

const cardVariants = cva('relative flex h-42.5 flex-1 flex-col rounded-2xl p-3 px-4 py-3', {
    variants: {
        variant: {
            primary: 'bg-brand-neutral-alt-100',
            secondary: 'bg-brand-secondary-100',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

const elipseVariants = cva('absolute bottom-0 left-0', {
    variants: {
        variant: {
            primary: 'text-brand-neutral-alt-200',
            secondary: 'text-brand-secondary-200/30',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

interface StatisticCardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {
    title: string;
    description: string;
    count: number;
}

export default function StatisticCard({
    title,
    description,
    count,
    variant = 'primary',
    className,
    ...props
}: StatisticCardProps): JSX.Element {
    const formatCount = String(count).padStart(2, '0');

    return (
        <div
            className={cn(cardVariants({ variant }), className)}
            {...props}
        >
            <div className="z-10 flex h-full flex-col">
                <span className="block text-[1.625rem]/tight font-medium">{title}</span>
                <span className="mt-1.5 block text-lg leading-none">{description}</span>

                <div className="mt-auto ml-auto">
                    <span className="block text-[2.875rem] leading-17.25 font-medium">{formatCount}</span>
                </div>
            </div>
            <ElipseDecoration className={cn(elipseVariants({ variant }))} />
        </div>
    );
}
