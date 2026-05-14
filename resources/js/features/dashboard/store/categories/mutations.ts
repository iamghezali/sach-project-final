import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '@/features/dashboard/store/categories/api';
import { categoryKeys } from '@/features/dashboard/store/categories/queries';

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: categoriesApi.createCategory,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
        },
    });
}
