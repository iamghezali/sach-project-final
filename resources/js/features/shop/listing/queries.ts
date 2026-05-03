import { useQuery } from '@tanstack/react-query';
import { shopApi } from '@/features/shop/listing/api';

export const shopKeys = {
    all: ['products'] as const,
    lists: () => [...shopKeys.all, 'list'] as const,
};

export function useListProducts() {
    return useQuery({
        queryKey: shopKeys.lists(),
        queryFn: shopApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
