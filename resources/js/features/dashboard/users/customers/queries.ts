import { useQuery } from '@tanstack/react-query';
import { customersApi } from '@/features/dashboard/users/customers/api';
import { userKeys } from '@/features/dashboard/users/keys';

export const customerKeys = {
    all: () => [...userKeys.all, 'customers'] as const,
    lists: () => [...customerKeys.all(), 'list'] as const,
};

export function useCustomersList() {
    return useQuery({
        queryKey: customerKeys.lists(),
        queryFn: customersApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
