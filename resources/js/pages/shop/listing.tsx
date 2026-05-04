import type { JSX } from 'react';
import ProductsGrid from '@/features/shop/listing/components/products-grid';
import ShopLayout from '@/layouts/shop-layout';

export default function Listing(): JSX.Element {
    return (
        <ShopLayout>
            <h1 className="text-4xl">Shop Lisitng</h1>

            <div className="mt-4">
                <ProductsGrid />
            </div>
        </ShopLayout>
    );
}
