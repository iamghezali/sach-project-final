import { apiRequest } from '@/api/client';
import type {
    AssignAttributesRequest,
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
} from '@/features/dashboard/store/products/schema';

export const productsApi = {
    list: () =>
        apiRequest(ProductsListResponseSchema, {
            url: '/products',
            method: 'get',
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
        apiRequest(CreateProductResponseSchema, {
            url: `/products/${id}`,
            method: 'put',
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
