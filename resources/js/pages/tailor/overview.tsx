import type { JSX } from 'react';
import OrdersList from '@/features/tailor/orders/components/orders-list';
import ShopLayout from '@/layouts/shop-layout';

export default function Overview(): JSX.Element {
    return (
        <ShopLayout>
            <OrdersList />
        </ShopLayout>
    );
}
