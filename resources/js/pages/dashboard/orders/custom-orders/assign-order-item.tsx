import type { JSX } from 'react';
import OrderItemAssignList from '@/features/dashboard/orders/custom-orders/components/order-item-assign-list';
import AppLayout from '@/layouts/app-layout';

export default function AssignOrderItem(): JSX.Element {
    return (
        <>
            <OrderItemAssignList />
        </>
    );
}

AssignOrderItem.layout = [AppLayout];
