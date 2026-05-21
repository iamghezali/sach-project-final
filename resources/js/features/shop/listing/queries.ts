import { useQuery } from '@tanstack/react-query';
import { shopApi } from '@/features/shop/listing/api';

export const shopKeys = {
    all: ['products'] as const,
    lists: (page: number = 1) => [...shopKeys.all, 'list', page] as const,
    byCategory: (slug: string) => [...shopKeys.all, 'category', slug] as const,
};

export function useListProducts(page: number = 1) {
    return useQuery({
        queryKey: shopKeys.lists(page),
        queryFn: () => shopApi.list(page),
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
