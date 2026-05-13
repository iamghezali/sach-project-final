import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import OrderInformation from '@/features/dashboard/orders/ready-to-wear/components/order-information';
import AppLayout from '@/layouts/app-layout';

export default function Details(): JSX.Element {
    const { id } = usePage<{ id: string }>().props;
    const orderID = Number(id);

    return (
        <div>
            <OrderInformation orderID={orderID} />
        </div>
    );
}

Details.layout = [AppLayout];
