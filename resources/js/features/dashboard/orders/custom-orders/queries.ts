import { useQuery } from '@tanstack/react-query';
import { customOrdersApi } from '@/features/dashboard/orders/custom-orders/api';

export const customOrderKeys = {
    all: () => ['custom-orders'] as const,
    lists: () => [...customOrderKeys.all(), 'list'] as const,
    orders: () => [...customOrderKeys.all(), 'order'] as const,
    order: (id: number) => [...customOrderKeys.orders(), id] as const,
};

export function useListCustomOrders() {
    return useQuery({
        queryKey: customOrderKeys.lists(),
        queryFn: customOrdersApi.list,
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
