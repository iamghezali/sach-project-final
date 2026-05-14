import type { JSX } from 'react';
import ProductDetails from '@/features/shop/product/components/product-details';
import ShopLayout from '@/layouts/shop-layout';

export default function Product(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-7">
                    <ProductDetails />
                </div>
            </section>
        </ShopLayout>
    );
}
