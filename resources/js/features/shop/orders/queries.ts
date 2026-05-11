import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/features/shop/orders/api';

export const ordersKeys = {
    all: ['orders'] as const,
    lists: (page: number = 1) => [...ordersKeys.all, 'list', page] as const,
    order: (id: string) => [...ordersKeys.all, id] as const,
};

export function useListOrders(page: number = 1) {
    return useQuery({
        queryKey: ordersKeys.lists(page),
        queryFn: () => ordersApi.list(page),
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
