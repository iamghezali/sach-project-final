import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';

export default function CartEmpty(): JSX.Element {
    return (
        <div>
            <div>Your cart is Empty</div>
            <div className="mt-2">
                <Button
                    asChild
                    variant="brand-primary"
                    size="brand-md"
                >
                    <Link href="/shop">
                        Go to shop
                        <ArrowRightIcon strokeWidth={3} />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
