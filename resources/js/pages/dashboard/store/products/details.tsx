import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import AssignAttributes from '@/features/dashboard/store/products/components/details/assign-attributes';
import ProductInformation from '@/features/dashboard/store/products/components/details/product-information';
import ProductVariants from '@/features/dashboard/store/products/components/details/product-variants';
import AppLayout from '@/layouts/app-layout';

export default function Details(): JSX.Element {
    const { id } = usePage<{ id: number }>().props;

    return (
        <AppLayout>
            <h1 className="text-2xl">Product Details</h1>

            <ProductInformation productID={id} />
            <AssignAttributes productID={id} />
            <ProductVariants productID={id} />
        </AppLayout>
    );
}
