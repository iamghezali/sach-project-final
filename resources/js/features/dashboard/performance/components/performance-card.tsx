import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import type { JSX } from 'react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ElipseDecoration from '@/features/dashboard/performance/components/elipse-decoration';
import { formatPrice } from '@/lib/format-price';
import { cn } from '@/lib/utils';

export type DateRangeOption = '7d' | '30d' | 'all';

export const DATE_RANGE_LABELS: Record<DateRangeOption, string> = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    all: 'All time',
};

const cardVariants = cva('relative flex h-42.5 flex-1 flex-col rounded-2xl p-3 px-4 py-3', {
    variants: {
        variant: {
            primary: 'bg-brand-neutral-alt-100',
            secondary: 'bg-brand-secondary-100',
        },
    },
    defaultVariants: { variant: 'primary' },
});

const elipseVariants = cva('absolute bottom-0 left-0', {
    variants: {
        variant: {
            primary: 'text-brand-neutral-alt-200',
            secondary: 'text-brand-secondary-200/30',
        },
    },
    defaultVariants: { variant: 'primary' },
});

interface PerformanceCardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {
    title: string;
    count: number;
    isCurrency?: boolean;
    isLoading?: boolean;
    dateRange?: DateRangeOption;
    onDateRangeChange?: (value: DateRangeOption) => void;
}

function PerformanceCard({
    title,
    count,
    variant = 'primary',
    isCurrency = false,
    isLoading = false,
    dateRange,
    onDateRangeChange,
    className,
    ...props
}: PerformanceCardProps): JSX.Element {
    const formatCount = String(count).padStart(2, '0');

    return (
        <div
            className={cn(cardVariants({ variant }), className)}
            {...props}
        >
            <div className="z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                    <span className="block text-[1.625rem]/tight font-medium">{title}</span>

                    {dateRange && onDateRangeChange && (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex shrink-0 items-center gap-1 font-medium opacity-70 hover:opacity-100">
                                {DATE_RANGE_LABELS[dateRange]} <ChevronDownIcon className="size-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {Object.entries(DATE_RANGE_LABELS).map(([value, label]) => (
                                    <DropdownMenuItem
                                        key={value}
                                        onSelect={() => onDateRangeChange(value as DateRangeOption)}
                                    >
                                        {label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                <div className="mt-auto ml-auto">
                    {isLoading ? (
                        <div className="mr-3 flex h-16 items-center justify-center">
                            <Loader2 className="size-8 animate-spin opacity-50" />
                        </div>
                    ) : (
                        <span className="block text-[2.875rem] leading-17.25 font-medium">
                            {isCurrency ? formatPrice(count) + ' DZD' : formatCount}
                        </span>
                    )}
                </div>
            </div>
            <ElipseDecoration className={cn(elipseVariants({ variant }))} />
        </div>
    );
}

interface PerformanceQueryResult {
    data?: { count: number };
    isLoading: boolean;
}

interface PerformanceCardContainerProps {
    title: string;
    variant?: 'primary' | 'secondary';
    isCurrency?: boolean;
    defaultRange?: DateRangeOption;
    useDataQuery: (dateRange: DateRangeOption) => PerformanceQueryResult;
}

export function PerformanceCardContainer({
    title,
    variant,
    isCurrency,
    defaultRange = '30d',
    useDataQuery,
}: PerformanceCardContainerProps) {
    const [dateRange, setDateRange] = useState<DateRangeOption>(defaultRange);
    const { data, isLoading } = useDataQuery(dateRange);

    return (
        <PerformanceCard
            title={title}
            variant={variant}
            isCurrency={isCurrency}
            count={data?.count ?? 0}
            isLoading={isLoading}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
        />
    );
}
