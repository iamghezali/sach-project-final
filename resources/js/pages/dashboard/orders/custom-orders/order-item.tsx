import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import AppLayout from '@/layouts/app-layout';

export default function OrderItem(): JSX.Element {
    const { orderID, orderItemID } = usePage<{ orderID: number; orderItemID: number }>().props;

    return (
        <>
            order-id {Number(orderID)} - item id {Number(orderItemID)}
        </>
    );
}

OrderItem.layout = [AppLayout];
