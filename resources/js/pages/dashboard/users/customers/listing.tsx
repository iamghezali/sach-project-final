import type { JSX } from 'react';
import CustomersTable from '@/features/dashboard/users/customers/components/customers-table';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <AppLayout>
            <h1 className="text-2xl">Customers List</h1>
            <div className="mt-3">
                <CustomersTable />
            </div>
        </AppLayout>
    );
}
