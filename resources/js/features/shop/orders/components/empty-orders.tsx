import { Link } from '@inertiajs/react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';

export default function EmptyOrders(): JSX.Element {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <ShoppingCart className="size-12 text-brand-neutral-alt-700" />
            <span className="mt-6 text-2xl font-medium text-brand-neutral-alt-700">
                You haven't placed any orders yet.
            </span>
            <Button
                className="mt-8 w-74"
                variant="brand-primary"
                size="brand-md"
                asChild
            >
                <Link href="/shop/">
                    Start Shopping
                    <ArrowRight strokeWidth={3} />
                </Link>
            </Button>
        </div>
    );
}
