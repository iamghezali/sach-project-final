import type { JSX } from 'react';
import OrderDetails from '@/features/shop/orders/components/order-details';
import ShopLayout from '@/layouts/shop-layout';

export default function Details(): JSX.Element {
    return (
        <ShopLayout>
            <OrderDetails />
        </ShopLayout>
    );
}
