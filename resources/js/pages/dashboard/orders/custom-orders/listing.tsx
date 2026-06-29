import type { JSX } from 'react';
import OrdersTable from '@/features/dashboard/orders/custom-orders/components/orders-table';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <div>
            <h1 className="text-2xl leading-10 font-bold">Custom Orders</h1>

            <section className="mt-4">
                <OrdersTable />
            </section>
        </div>
    );
}

Listing.layout = [AppLayout];
