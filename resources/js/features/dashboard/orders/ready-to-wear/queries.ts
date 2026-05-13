import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/features/dashboard/orders/ready-to-wear/api';

export const orderKeys = {
    all: () => ['orders'] as const,
    lists: (page: number = 1) => [...orderKeys.all(), 'list', page] as const,
    orders: () => [...orderKeys.all(), 'order'] as const,
    order: (id: number) => [...orderKeys.orders(), id] as const,
};

export function useListOrders(page: number = 1) {
    return useQuery({
        queryKey: orderKeys.lists(page),
        queryFn: () => ordersApi.list(page),
        staleTime: 1000 * 60 * 5,
    });
}
