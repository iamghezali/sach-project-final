import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/features/dashboard/store/categories/api';

export const categoryKeys = {
    all: () => ['categories'] as const,
    lists: () => [...categoryKeys.all(), 'list'] as const,
};

export function useCategoriesList() {
    return useQuery({
        queryKey: categoryKeys.lists(),
        queryFn: categoriesApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
