import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/features/tailor/orders/api';

export const orderKeys = {
    all: () => ['tailor-orders'] as const,
    lists: () => [...orderKeys.all(), 'list'] as const,
    orders: () => [...orderKeys.all(), 'order'] as const,
    order: (id: number) => [...orderKeys.orders(), id] as const,
};

export function useListOrders() {
    return useQuery({
        queryKey: orderKeys.lists(),
        queryFn: ordersApi.list,
        staleTime: 1000 * 60 * 5,
    });
}

export function useOrderFolder(id: number) {
    return useQuery({
        queryKey: orderKeys.order(id),
        queryFn: () => ordersApi.getOrderFolder(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}
