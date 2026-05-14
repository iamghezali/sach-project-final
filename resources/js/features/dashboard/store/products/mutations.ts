import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { productsApi } from '@/features/dashboard/store/products/api';
import { productKeys } from '@/features/dashboard/store/products/queries';
import type {
    AssignAttributesRequest,
    AssignCategoriesRequest,
    ChangeProductStatusRequest,
    CreateProductVariantRequest,
    UpdateProductImageRequest,
    UpdateProductRequest,
    UploadProductImagesRequest,
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

export function useChangeProductStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ChangeProductStatusRequest }) =>
            productsApi.changeProductStatus(id, payload),

        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: productKeys.product(id) });
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
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

export function useUploadProductImages(productId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UploadProductImagesRequest) => productsApi.uploadImages(productId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.product(productId) });
        },
    });
}

export function useUpdateProductImage(productId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, payload }: { uuid: string; payload: UpdateProductImageRequest }) =>
            productsApi.updateImage(productId, uuid, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productKeys.product(productId),
            });
            toast.success('Image tags updated');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update image tags');
        },
    });
}

export function useRemoveProductImage(productId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) => productsApi.deleteImage(productId, uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.product(productId) });
        },
    });
}

export const useAssignCategories = (productId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, payload }: { productId: number; payload: AssignCategoriesRequest }) =>
            productsApi.assignCategories(productId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.product(productId) });
        },
    });
};
