import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import AssignAttributes from '@/features/dashboard/store/products/components/details/assign-attributes';
import AssignCategories from '@/features/dashboard/store/products/components/details/assign-categories';
import ChangeProductStatus from '@/features/dashboard/store/products/components/details/change-product-status';
import ProductInformation from '@/features/dashboard/store/products/components/details/product-information';
import ProductVariants from '@/features/dashboard/store/products/components/details/product-variants';
import AppLayout from '@/layouts/app-layout';

export default function Details(): JSX.Element {
    const { id } = usePage<{ id: number }>().props;

    return (
        <AppLayout>
            <ChangeProductStatus productID={id} />
            <ProductInformation productID={id} />
            <AssignAttributes productID={id} />
            <AssignCategories productID={id} />
            <ProductVariants productID={id} />
        </AppLayout>
    );
}
