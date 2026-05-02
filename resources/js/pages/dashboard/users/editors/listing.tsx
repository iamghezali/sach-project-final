import type { JSX } from 'react';
import EditorsTable from '@/features/dashboard/users/editors/components/editors-table';
import NewEditor from '@/features/dashboard/users/editors/components/new-editor';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <AppLayout>
            <h1 className="text-2xl">Editors List</h1>

            <div className="mt-3">
                <NewEditor />
            </div>

            <div className="mt-3">
                <EditorsTable />
            </div>
        </AppLayout>
    );
}
