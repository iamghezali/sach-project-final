import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/features/shop/orders/api';

export const ordersKeys = {
    all: ['orders'] as const,
    lists: () => [...ordersKeys.all, 'list'] as const,
    order: (id: string) => [...ordersKeys.all, id] as const,
};

export function useListOrders() {
    return useQuery({
        queryKey: ordersKeys.lists(),
        queryFn: ordersApi.list,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}

export function useGetOrder(id: string) {
    return useQuery({
        queryKey: ordersKeys.order(id),
        queryFn: () => ordersApi.getOrder(id),
        enabled: !!id, // don't fire if id is undefined
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}
