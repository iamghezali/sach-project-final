import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import OrderInformation from '@/features/dashboard/orders/custom-orders/components/order-folder/order-information';
import AppLayout from '@/layouts/app-layout';

export default function OrderFolder(): JSX.Element {
    const { id } = usePage<{ id: string }>().props;
    const numericId = Number(id);

    return (
        <div>
            <OrderInformation orderID={numericId} />
        </div>
    );
}

OrderFolder.layout = [AppLayout];
