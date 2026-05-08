import { router } from '@inertiajs/react';
import type { JSX } from 'react';
import { useCart } from '@/features/shop/cart/hooks/use-cart';
import CheckoutStages from '@/features/shop/checkout/components/checkout-stages';
import CheckoutSummary from '@/features/shop/checkout/components/checkout-summary';
import ShopLayout from '@/layouts/shop-layout';

export default function Checkout(): JSX.Element {
    const { cart, isReady } = useCart();

    if (!isReady) {
        return <>Loading...</>;
    }

    if (cart.length === 0) {
        router.visit('/shop/cart/', { replace: true });
    }

    return (
        <ShopLayout>
            <div className="flex gap-5">
                <div className="flex-1">
                    <CheckoutStages />
                </div>
                <div className="basis-sm">
                    <CheckoutSummary />
                </div>
            </div>
        </ShopLayout>
    );
}
