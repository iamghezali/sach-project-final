import type { JSX } from 'react';
import CheckoutStages from '@/features/shop/checkout/components/checkout-stages';
import ShopLayout from '@/layouts/shop-layout';

export default function Checkout(): JSX.Element {
    return (
        <ShopLayout>
            <CheckoutStages />
        </ShopLayout>
    );
}
