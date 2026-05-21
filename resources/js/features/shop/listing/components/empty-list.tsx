import { Link } from '@inertiajs/react';
import { ArchiveIcon, RotateCcwIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';

export default function EmptyList(): JSX.Element {
    return (
        <div className="col-span-3 flex min-h-[70vh] flex-col items-center justify-center">
            <ArchiveIcon className="size-12 text-brand-neutral-alt-700" />
            <span className="mt-6 text-center text-2xl font-medium text-brand-neutral-alt-700">
                No Products match your filters!
            </span>
            <Button
                className="mt-8 w-74"
                size="brand-md"
                variant="brand-primary"
                asChild
            >
                <Link
                    href="/shop/"
                    preserveScroll
                >
                    Clear Filters
                    <RotateCcwIcon strokeWidth={3} />
                </Link>
            </Button>
        </div>
    );
}
