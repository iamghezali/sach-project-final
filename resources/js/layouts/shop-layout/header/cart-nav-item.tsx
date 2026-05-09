import { Link } from '@inertiajs/react';
import { ShoppingCartIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/features/shop/cart/hooks/use-cart';

export default function CartNavItem(): JSX.Element {
    const { cart, isReady } = useCart();

    if (!isReady) {
        return <>...</>;
    }

    return (
        <Link href="/shop/cart">
            <div className="relative">
                {cart.length > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-3 -left-3"
                    >
                        {cart.length}
                    </Badge>
                )}
                <ShoppingCartIcon />
            </div>
        </Link>
    );
}
