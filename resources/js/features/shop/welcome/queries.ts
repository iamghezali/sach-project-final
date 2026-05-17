import { useQuery } from '@tanstack/react-query';
import { welcomeApi } from '@/features/shop/welcome/api';

export const welcomeKeys = {
    all: ['welcome', 'products'] as const,
    byCategory: (slug: string) => [...welcomeKeys.all, 'category', slug] as const,
};

export function useProductsByCategory(categorySlug: string, limit?: number) {
    return useQuery({
        queryKey: welcomeKeys.byCategory(categorySlug),
        queryFn: () => welcomeApi.listByCategory(categorySlug, limit),
        enabled: !!categorySlug, // Only run if slug is provided
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
}
