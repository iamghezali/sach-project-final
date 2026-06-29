import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import OrderItemOfferForm from '@/features/dashboard/orders/custom-orders/components/order-item-offer-form';
import OrderItemView from '@/features/dashboard/orders/custom-orders/components/order-item-view';
import AppLayout from '@/layouts/app-layout';

export default function OrderItem(): JSX.Element {
    const { orderID, orderItemID } = usePage<{ orderID: number; orderItemID: number }>().props;

    return (
        <>
            <section>
                <OrderItemOfferForm
                    orderID={Number(orderID)}
                    orderItemID={Number(orderItemID)}
                />
            </section>

            <section className="mt-7">
                <OrderItemView
                    orderID={Number(orderID)}
                    orderItemID={Number(orderItemID)}
                />
            </section>
        </>
    );
}

OrderItem.layout = [AppLayout];
