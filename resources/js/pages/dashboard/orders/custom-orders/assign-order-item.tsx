import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import OrderItemAssignList from '@/features/dashboard/orders/custom-orders/components/order-item-assign-list';
import AppLayout from '@/layouts/app-layout';

export default function AssignOrderItem(): JSX.Element {
    const { orderID, orderItemID } = usePage<{ orderID: number; orderItemID: number }>().props;

    return (
        <>
            <OrderItemAssignList
                orderID={Number(orderID)}
                orderItemID={Number(orderItemID)}
            />
        </>
    );
}

AssignOrderItem.layout = [AppLayout];
