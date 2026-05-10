import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/features/tailor/orders/api';

export const orderKeys = {
    all: () => ['custom-orders'] as const,
    lists: () => [...orderKeys.all(), 'list'] as const,
};

export function useListOrders() {
    return useQuery({
        queryKey: orderKeys.lists(),
        queryFn: ordersApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
