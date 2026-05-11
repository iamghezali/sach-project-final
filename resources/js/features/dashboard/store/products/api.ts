import { apiRequest } from '@/api/client';
import type {
    AssignAttributesRequest,
    ChangeProductStatusRequest,
    CreateProductRequest,
    CreateProductVariantRequest,
    UpdateProductRequest,
} from '@/features/dashboard/store/products/schema';
import {
    AssignAttributesResponseSchema,
    CreateProductResponseSchema,
    CreateProductVariantResponseSchema,
    ProductDetailsResponseSchema,
    ProductsListResponseSchema,
    UpdateProductRequestSchema,
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
};
