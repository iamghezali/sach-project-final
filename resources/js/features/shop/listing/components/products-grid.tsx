import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import Image from '@/components/image';
import { Button } from '@/components/ui/button';
import { useListProducts } from '@/features/shop/listing/queries';
import { formatPrice } from '@/lib/format-price';

export default function ProductsGrid(): JSX.Element {
    const { data: response, isLoading } = useListProducts();

    const products = response?.data;

    return (
        <div>
            <ul className="grid grid-cols-2 gap-4">
                <DataGuard
                    data={products}
                    isLoading={isLoading}
                    skeleton={<>Loading...</>}
                >
                    {(products) =>
                        products.map((product, i) => (
                            <li key={i}>
                                <div className="w-full rounded-lg border p-6">
                                    <Image
                                        src={product.thumbnail}
                                        alt={`${product.name} thumbnail image`}
                                    />

                                    <p>{product.name}</p>

                                    <Button
                                        className="mt-4 w-full"
                                        variant="brand-neutral"
                                        size="brand-md"
                                        asChild
                                    >
                                        <Link href={`/shop/product/${product.slug}`}>
                                            View Product - {formatPrice(product.starting_from)} DZD
                                        </Link>
                                    </Button>
                                </div>
                            </li>
                        ))
                    }
                </DataGuard>
            </ul>
        </div>
    );
}
