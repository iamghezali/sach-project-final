import type { JSX } from 'react';
import NewTailor from '@/features/dashboard/users/tailors/components/new-tailor';
import TailorsTable from '@/features/dashboard/users/tailors/components/tailors-table';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <AppLayout>
            <h1 className="text-2xl">Tailors List</h1>

            <div className="mt-3">
                <NewTailor />
            </div>

            <div className="mt-3">
                <TailorsTable />
            </div>
        </AppLayout>
    );
}
