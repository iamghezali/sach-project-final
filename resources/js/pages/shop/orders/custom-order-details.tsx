import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import CustomOrderItem from '@/features/shop/orders/components/custom-orders/custom-order-item';
import ShopLayout from '@/layouts/shop-layout';

export default function CustomOrderDetails(): JSX.Element {
    const { orderID, itemID } = usePage<{ orderID: string; itemID: string }>().props;

    return (
        <ShopLayout>
            <section>
                <div className="mt-8">
                    <CustomOrderItem
                        orderID={Number(orderID)}
                        orderItemID={Number(itemID)}
                    />
                </div>
            </section>
        </ShopLayout>
    );
}
