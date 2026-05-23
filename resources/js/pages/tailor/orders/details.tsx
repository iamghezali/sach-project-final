import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import MarkOrderItemAsDone from '@/features/tailor/orders/components/mark-order-item-as-done';
import OrderItem from '@/features/tailor/orders/components/order-item';
import ShopLayout from '@/layouts/shop-layout';

export default function Details(): JSX.Element {
    const { orderID, itemID } = usePage<{ orderID: number; itemID: number }>().props;

    return (
        <ShopLayout>
            <section>
                <div className="mt-8 flex flex-col gap-6">
                    <OrderItem
                        orderID={orderID}
                        orderItemID={itemID}
                    />

                    <MarkOrderItemAsDone
                        orderID={orderID}
                        orderItemID={itemID}
                    />
                </div>
            </section>
        </ShopLayout>
    );
}
