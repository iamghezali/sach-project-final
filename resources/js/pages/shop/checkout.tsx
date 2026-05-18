import { router } from '@inertiajs/react';
import type { JSX } from 'react';
import { useCart } from '@/features/shop/cart/hooks/use-cart';
import CheckoutStages from '@/features/shop/checkout/components/checkout-stages';
import CheckoutSummary from '@/features/shop/checkout/components/checkout-summary';
import ShopLayout from '@/layouts/shop-layout';

export default function Checkout(): JSX.Element | null {
    const { cart, isReady } = useCart();

    if (!isReady) {
        return <>Loading...</>;
    }

    if (cart.length === 0) {
        router.visit('/shop/cart/', { replace: true });

        return null;
    }

    return (
        <ShopLayout>
            <section>
                <div className="mt-7 flex items-start gap-25">
                    <div className="flex-1">
                        <CheckoutStages />
                    </div>
                    <CheckoutSummary />
                </div>
            </section>
        </ShopLayout>
    );
}
