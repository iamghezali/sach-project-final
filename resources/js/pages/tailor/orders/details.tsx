import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import ShopLayout from '@/layouts/shop-layout';

export default function Details(): JSX.Element {
    const { orderID, itemID } = usePage<{ orderID: number; itemID: number }>().props;

    return (
        <ShopLayout>
            <div>ORDER ID {orderID}</div>
            <div>ITEM ID {itemID}</div>
        </ShopLayout>
    );
}
