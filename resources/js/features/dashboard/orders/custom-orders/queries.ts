import { useQuery } from '@tanstack/react-query';
import { customOrdersApi } from '@/features/dashboard/orders/custom-orders/api';

export const customOrderKeys = {
    all: ['custom-orders'] as const,
    lists: () => [...customOrderKeys.all, 'list'] as const,
};

export function useListCustomOrders() {
    return useQuery({
        queryKey: customOrderKeys.lists(),
        queryFn: customOrdersApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
