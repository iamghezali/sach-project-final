import type { JSX } from 'react';
import CustomOrderCreator from '@/features/shop/custom-order/components/custom-order-creator';
import { CustomOrderProvider } from '@/features/shop/custom-order/providers/custom-order-provider';
import ShopLayout from '@/layouts/shop-layout';

export default function CustomOrder(): JSX.Element {
    return (
        <ShopLayout>
            <CustomOrderProvider>
                <CustomOrderCreator />
            </CustomOrderProvider>
        </ShopLayout>
    );
}
