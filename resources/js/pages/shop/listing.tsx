import type { JSX } from 'react';
import ProductsGrid from '@/features/shop/listing/components/products-grid';
import ShopLayout from '@/layouts/shop-layout';

export default function Listing(): JSX.Element {
    return (
        <ShopLayout>
            <div className="mt-8">
                <ProductsGrid />
            </div>
        </ShopLayout>
    );
}
