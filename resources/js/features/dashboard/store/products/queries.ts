import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/dashboard/store/products/api';

export const productKeys = {
    all: () => ['products'] as const,
    lists: () => [...productKeys.all(), 'list'] as const,
    products: () => [...productKeys.all(), 'product'] as const,
    product: (id: number) => [...productKeys.products(), id] as const,
};

export function useProductsList() {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: productsApi.list,
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
