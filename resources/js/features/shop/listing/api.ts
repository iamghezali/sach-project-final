import { apiRequest } from '@/api/client';
import { ProductCategoryResponseSchema, ProductListResponseSchema } from '@/features/shop/listing/schema';

export interface ShopFilters {
    search?: string;
    color?: string;
    size?: string;
    category?: string;
}

export const shopApi = {
    list: (page: number = 1, filters: ShopFilters = {}) =>
        apiRequest(ProductListResponseSchema, {
            url: '/shop/products',
            method: 'get',
            params: { page, ...filters },
        }),

    listByCategory: (categorySlug: string, limit?: number) =>
        apiRequest(ProductCategoryResponseSchema, {
            url: `/shop/products/category/${categorySlug}`,
            method: 'get',
            params: { limit },
        }),
};
