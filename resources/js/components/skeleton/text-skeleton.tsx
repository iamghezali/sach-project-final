import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Leading = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

const leadingValues: Record<Leading, number> = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
};

function resolveLeading(leading: Leading | number): number {
    return typeof leading === 'number' ? leading : leadingValues[leading];
}

interface TextSkeletonProps {
    leading?: Leading | number;
    lines?: number;
    lastLineWidth?: string;
    className?: string;
}

export function TextSkeleton({ leading = 'normal', lines = 1, lastLineWidth = 'w-2/5', className }: TextSkeletonProps) {
    const margin = `${(resolveLeading(leading) - 1) / 2}em`;
    const style = { marginTop: margin, marginBottom: margin };

    if (lines === 1) {
        return (
            <Skeleton
                className={cn('block h-[1em] w-full', className)}
                style={style}
            />
        );
    }

    return (
        <div className={className}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn('block h-[1em]', i === lines - 1 ? lastLineWidth : 'w-full')}
                    style={style}
                />
            ))}
        </div>
    );
}
