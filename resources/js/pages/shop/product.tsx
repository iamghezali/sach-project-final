import type { JSX } from 'react';
import ShopLayout from '@/layouts/shop-layout';
import ProductDetails from '@/features/shop/product/components/product-details';

export default function Product(): JSX.Element {
    return (
        <ShopLayout>
            <h1 className="text-4xl">Product Details</h1>

            <ProductDetails />
        </ShopLayout>
    );
}
