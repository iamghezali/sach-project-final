import type { JSX } from 'react';
import OrdersTable from '@/features/dashboard/orders/custom-orders/components/orders-table';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <div>
            <h1 className="text-2xl">Custom Orders</h1>

            <OrdersTable />
        </div>
    );
}

Listing.layout = [AppLayout];
