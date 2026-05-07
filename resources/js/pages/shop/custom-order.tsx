import type { JSX } from 'react';
import CustomOrderCreator from '@/features/shop/custom-order/components/custom-order-creator';
import { CustomOrderProvider } from '@/features/shop/custom-order/providers/custom-order-provider';
import ShopLayout from '@/layouts/shop-layout';

export default function CustomOrder(): JSX.Element {
    return (
        <ShopLayout>
            <CustomOrderProvider>
                <section>
                    <div className="mt-8">
                        <CustomOrderCreator />
                    </div>
                </section>
            </CustomOrderProvider>
        </ShopLayout>
    );
}
