import type { JSX } from 'react';
import OrdersTable from '@/features/dashboard/orders/ready-to-wear/components/orders-table';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <div>
            <h1 className="text-2xl">Ready to wear orders</h1>

            <OrdersTable />
        </div>
    );
}

Listing.layout = [AppLayout];
