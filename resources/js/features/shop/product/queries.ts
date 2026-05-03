import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/features/shop/product/api';

export const productKeys = {
    all: ['product'] as const,
    product: (slug: string) => [...productKeys.all, slug] as const,
};

export function useGetProduct(slug: string) {
    return useQuery({
        queryKey: productKeys.product(slug),
        queryFn: () => productApi.getProduct(slug),
        enabled: !!slug, // don't fire if slug is undefined
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
