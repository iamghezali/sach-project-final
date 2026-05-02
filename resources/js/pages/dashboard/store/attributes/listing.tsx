import type { JSX } from 'react';
import AttributesTable from '@/features/dashboard/store/attributes/components/attributes-table';
import NewAttribute from '@/features/dashboard/store/attributes/components/new-attribute';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <>
            <h1 className="text-2xl">Attributes List</h1>

            <div className="mt-3">
                <NewAttribute />
            </div>

            <div className="mt-3">
                <AttributesTable />
            </div>
        </>
    );
}

Listing.layout = [AppLayout];
