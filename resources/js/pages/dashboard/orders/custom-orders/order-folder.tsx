import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import OrderInformation from '@/features/dashboard/orders/custom-orders/components/order-folder/order-information';
import AppLayout from '@/layouts/app-layout';

export default function OrderFolder(): JSX.Element {
    const { id } = usePage<{ id: number }>().props;

    return (
        <div>
            <OrderInformation orderID={id} />
        </div>
    );
}

OrderFolder.layout = [AppLayout];
