import type { JSX } from 'react';
import OrderDetails from '@/features/shop/orders/components/rtw-orders/order-details';
import ShopLayout from '@/layouts/shop-layout';

export default function Details(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-6">
                    <OrderDetails />
                </div>
            </section>
        </ShopLayout>
    );
}
