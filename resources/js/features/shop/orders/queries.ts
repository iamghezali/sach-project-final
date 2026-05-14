import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/features/shop/orders/api';

export const ordersKeys = {
    all: ['orders'] as const,
    lists: (page: number = 1) => [...ordersKeys.all, 'list', page] as const,
    order: (id: number) => [...ordersKeys.all, id] as const,

    customLists: (page: number = 1) => [...ordersKeys.all, 'custom', 'list', page] as const,
    customOrder: (id: number) => [...ordersKeys.all, 'custom', id] as const,
};

export function useListOrders(page: number = 1) {
    return useQuery({
        queryKey: ordersKeys.lists(page),
        queryFn: () => ordersApi.list(page),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}

export function useGetOrder(id: number) {
    return useQuery({
        queryKey: ordersKeys.order(id),
        queryFn: () => ordersApi.getOrder(id),
        enabled: !!id, // don't fire if id is undefined
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}

export function useListCustomOrders(page: number = 1) {
    return useQuery({
        queryKey: ordersKeys.customLists(page),
        queryFn: () => ordersApi.listCustom(page),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}

export function useGetCustomOrderFolder(id: number) {
    return useQuery({
        queryKey: ordersKeys.customOrder(id),
        queryFn: () => ordersApi.getCustomOrderFolder(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}

export function useGetCustomOrderItem(orderID: number, itemID: number) {
    return useQuery({
        queryKey: [...ordersKeys.customOrder(orderID), 'items', itemID],
        queryFn: () => ordersApi.getCustomOrderItem(orderID, itemID),
        enabled: !!orderID && !!itemID,
        staleTime: 1000 * 60 * 5,
    });
}
