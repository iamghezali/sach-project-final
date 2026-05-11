import { useQuery } from '@tanstack/react-query';
import { customOrdersApi } from '@/features/dashboard/orders/custom-orders/api';

export const customOrderKeys = {
    all: () => ['custom-orders'] as const,
    lists: (page: number = 1) => [...customOrderKeys.all(), 'list', page] as const,
    orders: () => [...customOrderKeys.all(), 'order'] as const,
    order: (id: number) => [...customOrderKeys.orders(), id] as const,
};

export function useListCustomOrders(page: number = 1) {
    return useQuery({
        queryKey: customOrderKeys.lists(page),
        queryFn: () => customOrdersApi.list(page),
        staleTime: 1000 * 60 * 5,
    });
}

export function useCustomOrderFolder(id: number) {
    return useQuery({
        queryKey: customOrderKeys.order(id),
        queryFn: () => customOrdersApi.getCustomOrderFolder(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}
