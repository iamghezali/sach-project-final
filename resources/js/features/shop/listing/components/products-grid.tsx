import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import ProductCard from '@/features/shop/listing/components/product-card';
import { useListProducts } from '@/features/shop/listing/queries';

export default function ProductsGrid(): JSX.Element {
    const { data: response, isLoading } = useListProducts();

    const products = response?.data;

    return (
        <div>
            <ul className="grid grid-cols-3 gap-4">
                <DataGuard
                    data={products}
                    isLoading={isLoading}
                    skeleton={<>Loading...</>}
                >
                    {(products) =>
                        products.map((product, i) => (
                            <li key={i}>
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
