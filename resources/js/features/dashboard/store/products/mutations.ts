import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '@/features/dashboard/store/products/api';
import { productKeys } from '@/features/dashboard/store/products/queries';
import type {
    AssignAttributesRequest,
    CreateProductVariantRequest,
    UpdateProductRequest,
} from '@/features/dashboard/store/products/schema';

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productsApi.createProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateProductRequest }) =>
            productsApi.updateProduct(id, payload),

        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: productKeys.product(id),
            });

            queryClient.invalidateQueries({
                queryKey: productKeys.lists(),
            });
        },
    });
}

export const useCreateProductVariant = (productId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, payload }: { productId: number; payload: CreateProductVariantRequest }) =>
            productsApi.createProductVariant(productId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.product(productId) });
        },
    });
};

export const useAssignAttributes = (productId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, payload }: { productId: number; payload: AssignAttributesRequest }) =>
            productsApi.assignAttributes(productId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.product(productId) });
        },
    });
};
