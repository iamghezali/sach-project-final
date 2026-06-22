import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/dashboard/store/products/api';

export const productKeys = {
    all: () => ['products'] as const,
    lists: (page: number = 1) => [...productKeys.all(), 'list', page] as const,
    products: () => [...productKeys.all(), 'product'] as const,
    product: (id: number) => [...productKeys.products(), id] as const,
    variant: (productId: number, variantId: number) =>
        [...productKeys.product(productId), 'variant', variantId] as const,
};

export function useProductsList(page: number = 1) {
    return useQuery({
        queryKey: productKeys.lists(page),
        queryFn: () => productsApi.list(page),
        staleTime: 1000 * 60 * 5,
    });
}

export function useProductDetails(id: number) {
    return useQuery({
        queryKey: productKeys.product(id),
        queryFn: () => productsApi.getProductDetails(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}

export function useProductVariant(productId: number, variantId: number) {
    return useQuery({
        queryKey: productKeys.variant(productId, variantId),
        queryFn: () => productsApi.getProductVariant(productId, variantId),
        enabled: !!productId && !!variantId,
        staleTime: 1000 * 60 * 5,
    });
}
