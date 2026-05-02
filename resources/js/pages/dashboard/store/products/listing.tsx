import type { JSX } from 'react';
import NewProduct from '@/features/dashboard/store/products/components/new-product';
import ProductsTable from '@/features/dashboard/store/products/components/products-table';
import AppLayout from '@/layouts/app-layout';

export default function Listing(): JSX.Element {
    return (
        <AppLayout>
            <h1 className="text-2xl">Products List</h1>

            <div className="mt-3">
                <NewProduct />
            </div>

            <div className="mt-3">
                <ProductsTable />
            </div>
        </AppLayout>
    );
}
