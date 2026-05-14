// resources/js/features/shop/listing/components/category-products.tsx

import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import ProductCard from '@/features/shop/listing/components/product-card';
import { useProductsByCategory } from '@/features/shop/listing/queries';

interface Props {
    categorySlug: string;
    title?: string;
    limit?: number;
}

export default function ProductCarousel({ categorySlug, title, limit }: Props): JSX.Element {
    const { data: response, isLoading } = useProductsByCategory(categorySlug, limit);
    const products = response?.data;

    return (
        <div className="py-8">
            {title && <h2 className="mb-6 text-3xl font-bold text-brand-neutral-1000">{title}</h2>}

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <DataGuard
                    data={products}
                    isLoading={isLoading}
                    skeleton={<div className="h-100 animate-pulse rounded-4xl bg-neutral-200" />}
                >
                    {(products) =>
                        products.map((product) => (
                            <li key={product.id}>
                                <ProductCard
                                    name={product.name}
                                    thumbnail={product.thumbnail}
                                    price={product.starting_from}
                                    slug={product.slug}
                                />
                            </li>
                        ))
                    }
                </DataGuard>
            </ul>
        </div>
    );
}
