import { Link } from '@inertiajs/react';
import { ShoppingCartIcon } from 'lucide-react';
import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import { Badge } from '@/components/ui/badge';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useCart } from '@/features/shop/cart/hooks/use-cart';

export default function CartNavItem(): JSX.Element {
    const { cart, isReady } = useCart();

    return (
        <Link
            href="/shop/cart"
            className={navigationMenuTriggerStyle()}
        >
            <div className="relative">
                <DataGuard
                    data={cart}
                    isLoading={isReady}
                    skeleton={null}
                    emptyFallback={null}
                >
                    {(cart) => (
                        <Badge
                            variant="destructive"
                            className="absolute -top-3 -left-3"
                        >
                            {cart.length}
                        </Badge>
                    )}
                </DataGuard>
                <ShoppingCartIcon className="size-6" />
            </div>
        </Link>
    );
}
