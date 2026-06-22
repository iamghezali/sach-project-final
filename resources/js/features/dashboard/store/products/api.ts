import { apiFormDataRequest, apiRequest } from '@/api/client';
import { apiNoContentSchema } from '@/api/schema';
import type {
    AssignAttributesRequest,
    AssignCategoriesRequest,
    ChangeProductStatusRequest,
    CreateProductRequest,
    CreateProductVariantRequest,
    UpdateProductImageRequest,
    UpdateProductRequest,
    UpdateProductVariantRequest,
    UploadProductImagesRequest,
} from '@/features/dashboard/store/products/schema';
import {
    AssignAttributesResponseSchema,
    AssignCategoriesResponseSchema,
    CreateProductResponseSchema,
    CreateProductVariantResponseSchema,
    DeleteImageResponseSchema,
    ProductDetailsResponseSchema,
    ProductsListResponseSchema,
    ReorderProductImagesResponseSchema,
    UpdateProductImageResponseSchema,
    UpdateProductRequestSchema,
    UploadProductImagesResponseSchema,
} from '@/features/dashboard/store/products/schema';

export const productsApi = {
    list: (page: number = 1) =>
        apiRequest(ProductsListResponseSchema, {
            url: '/products',
            method: 'get',
            params: { page },
        }),

    createProduct: (payload: CreateProductRequest) =>
        apiRequest(CreateProductResponseSchema, {
            url: '/products/',
            method: 'post',
            data: payload,
        }),

    getProductDetails: (id: number) =>
        apiRequest(ProductDetailsResponseSchema, {
            url: `/products/${id}`,
            method: 'get',
        }),

    updateProduct: (id: number, payload: UpdateProductRequest) =>
        apiRequest(UpdateProductRequestSchema, {
            url: `/products/${id}`,
            method: 'put',
            data: payload,
        }),

    changeProductStatus: (id: number, payload: ChangeProductStatusRequest) =>
        apiRequest(UpdateProductRequestSchema, {
            url: `/products/${id}/status`,
            method: 'patch',
            data: payload,
        }),

    assignAttributes: (id: number, payload: AssignAttributesRequest) =>
        apiRequest(AssignAttributesResponseSchema, {
            url: `/products/${id}/attributes`,
            method: 'put',
            data: payload,
        }),

    createProductVariant: (productId: number, payload: CreateProductVariantRequest) =>
        apiRequest(CreateProductVariantResponseSchema, {
            url: `/products/${productId}/variants`,
            method: 'post',
            data: payload,
        }),

    uploadImages: (productId: number, payload: UploadProductImagesRequest) =>
        apiFormDataRequest(UploadProductImagesResponseSchema, {
            url: `/products/${productId}/images`,
            method: 'post',
            data: payload,
        }),

    deleteImage: (productId: number, mediaUuid: string) =>
        apiRequest(DeleteImageResponseSchema, {
            url: `/products/${productId}/images/${mediaUuid}`,
            method: 'delete',
        }),

    updateImage: (productId: number, mediaUuid: string, payload: UpdateProductImageRequest) =>
        apiRequest(UpdateProductImageResponseSchema, {
            url: `/products/${productId}/images/${mediaUuid}`,
            method: 'patch',
            data: payload,
        }),

    reorderImages: (productId: number, uuids: string[]) =>
        apiRequest(ReorderProductImagesResponseSchema, {
            url: `/products/${productId}/images/reorder`,
            method: 'patch',
            data: { uuids },
        }),

    assignCategories: (id: number, payload: AssignCategoriesRequest) =>
        apiRequest(AssignCategoriesResponseSchema, {
            url: `/products/${id}/categories`,
            method: 'put',
            data: payload,
        }),

    getProductVariant: (productId: number, variantId: number) =>
        apiRequest(CreateProductVariantResponseSchema, {
            url: `/products/${productId}/variants/${variantId}`,
            method: 'get',
        }),

    updateProductVariant: (productId: number, variantId: number, payload: UpdateProductVariantRequest) =>
        apiRequest(CreateProductVariantResponseSchema, {
            url: `/products/${productId}/variants/${variantId}`,
            method: 'put',
            data: payload,
        }),

    deleteProductVariant: (productId: number, variantId: number) =>
        apiRequest(apiNoContentSchema, {
            url: `/products/${productId}/variants/${variantId}`,
            method: 'delete',
        }),
};
