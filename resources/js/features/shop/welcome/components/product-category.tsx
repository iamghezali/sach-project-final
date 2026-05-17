import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { DataGuard } from '@/components/data-guard';
import { Button } from '@/components/ui/button';
import ProductCard, { ProductCardSkeleton } from '@/features/shop/listing/components/product-card';
import { useProductsByCategory } from '@/features/shop/welcome/queries';

type ProductCategoryProps = {
    categorySlug: string;
    title?: string;
    label?: string;
    limit?: number;
};

export default function ProductCategory({
    title = 'Category Title',
    label = 'Button Label',
    categorySlug,
    limit = 4,
}: ProductCategoryProps): JSX.Element {
    const { data: response, isLoading, isError } = useProductsByCategory(categorySlug, limit);

    const products = response?.data;

    return (
        <div>
            <div className="flex items-end justify-between">
                <h2 className="text-7xl font-semibold text-brand-neutral-1000 uppercase">{title}</h2>

                <Button
                    className="uppercase"
                    variant="brand-secondary"
                    size="brand-lg"
                    asChild
                >
                    <Link href={`/shop?category=${categorySlug}`}>{label}</Link>
                </Button>
            </div>

            <DataGuard
                data={products}
                isLoading={isLoading}
                isError={isError}
                skeleton={<ProductCategorySkeleton />}
                errorFallback={<ProductCategorySkeleton />}
            >
                {(products) => (
                    <>
                        <div className="mt-8 grid grid-cols-4 gap-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.starting_from}
                                    thumbnail={product.thumbnail}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    </>
                )}
            </DataGuard>
        </div>
    );
}

export function ProductCategorySkeleton(): JSX.Element {
    return (
        <div className="mt-8 grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
