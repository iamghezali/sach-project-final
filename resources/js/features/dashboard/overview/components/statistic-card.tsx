import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
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
    isLoading?: boolean;
}

function StatisticCard({
    title,
    description,
    count,
    variant = 'primary',
    isLoading = false,
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
                    {isLoading ? (
                        <div className="mr-3 flex h-16 items-center justify-center">
                            <Loader2 className="size-8 animate-spin opacity-50" />
                        </div>
                    ) : (
                        <span className="block text-[2.875rem] leading-17.25 font-medium">{formatCount}</span>
                    )}
                </div>
            </div>
            <ElipseDecoration className={cn(elipseVariants({ variant }))} />
        </div>
    );
}

interface StatisticQueryResult {
    data?: { count: number };
    isLoading: boolean;
}

interface StatisticCardContainerProps {
    title: string;
    description: string;
    variant?: 'primary' | 'secondary';
    useDataQuery: () => StatisticQueryResult;
}

export function StatisticCardContainer({ title, description, variant, useDataQuery }: StatisticCardContainerProps) {
    const { data, isLoading } = useDataQuery();

    return (
        <StatisticCard
            title={title}
            description={description}
            variant={variant}
            count={data?.count ?? 0}
            isLoading={isLoading}
        />
    );
}
