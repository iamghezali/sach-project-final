import { useQuery } from '@tanstack/react-query';
import type { ShopFilters } from '@/features/shop/listing/api';
import { shopApi } from '@/features/shop/listing/api';

export const shopKeys = {
    all: ['products'] as const,
    lists: (page: number = 1, filters: ShopFilters = {}) => [...shopKeys.all, 'list', page, filters] as const,
    byCategory: (slug: string) => [...shopKeys.all, 'category', slug] as const,
};

export function useListProducts(page: number = 1, filters: ShopFilters = {}) {
    return useQuery({
        queryKey: shopKeys.lists(page, filters),
        queryFn: () => shopApi.list(page, filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useProductsByCategory(categorySlug: string, limit?: number) {
    return useQuery({
        queryKey: shopKeys.byCategory(categorySlug),
        queryFn: () => shopApi.listByCategory(categorySlug, limit),
        enabled: !!categorySlug, // Only run if slug is provided
        staleTime: 1000 * 60 * 5,
    });
}
