import type { JSX } from 'react';
import CategoriesTable from '@/features/dashboard/store/categories/components/categories-table';
import NewCategory from '@/features/dashboard/store/categories/components/new-category';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <>
            <h1 className="text-2xl">Categories List</h1>

            <div className="mt-3">
                <NewCategory />
            </div>

            <div className="mt-3">
                <CategoriesTable />
            </div>
        </>
    );
}

Listing.layout = [AppLayout];
