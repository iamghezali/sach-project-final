import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { DataGuard } from '@/components/data-guard';
import EmptyList from '@/features/shop/listing/components/empty-list';
import ProductCard, { ProductCardSkeleton } from '@/features/shop/listing/components/product-card';
import { useShopFilters } from '@/features/shop/listing/hooks/use-shop-filters';
import { useListProducts } from '@/features/shop/listing/queries';

export default function ProductsGrid(): JSX.Element {
    const page = usePageParam();
    const { filters } = useShopFilters();

    const { data: response, isLoading, isPlaceholderData } = useListProducts(page, filters);

    const products = response?.data;
    const meta = response?.meta;

    useAutoRedirectOutOfRange({
        meta,
        currentPage: page,
    });

    return (
        <div>
            <ul className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                <DataGuard
                    data={products}
                    isLoading={isLoading || isPlaceholderData}
                    skeleton={Skeletons}
                    emptyFallback={<EmptyList />}
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

            {meta && meta.last_page > 1 && (
                <div className="mt-8 flex justify-center border-t border-brand-neutral-100">
                    <AppPagination meta={meta} />
                </div>
            )}
        </div>
    );
}

const Skeletons = (
    <>
        {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
                <ProductCardSkeleton />
            </li>
        ))}
    </>
);
