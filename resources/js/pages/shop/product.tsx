import type { JSX } from 'react';
import ProductDetails from '@/features/shop/product/components/product-details';
import ShopLayout from '@/layouts/shop-layout';

export default function Product(): JSX.Element {
    return (
        <ShopLayout>
            <h1 className="text-4xl">Product Details</h1>

            <ProductDetails />
        </ShopLayout>
    );
}
