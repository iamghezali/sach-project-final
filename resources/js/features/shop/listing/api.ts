import { apiRequest } from '@/api/client';
import { ProductCategoryResponseSchema, ProductListResponseSchema } from '@/features/shop/listing/schema';

export interface ShopFilters {
    search?: string;
    color?: string[];
    size?: string[];
    category?: string[];
}

function serializeFilters(filters: ShopFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.search) {
        params.search = filters.search;
    }

    if (filters.color?.length) {
        params.color = filters.color.join(',');
    }

    if (filters.size?.length) {
        params.size = filters.size.join(',');
    }

    if (filters.category?.length) {
        params.category = filters.category.join(',');
    }

    return params;
}

export const shopApi = {
    list: (page: number = 1, filters: ShopFilters = {}) =>
        apiRequest(ProductListResponseSchema, {
            url: '/shop/products',
            method: 'get',
            params: { page, ...serializeFilters(filters) },
        }),

    listByCategory: (categorySlug: string, limit?: number) =>
        apiRequest(ProductCategoryResponseSchema, {
            url: `/shop/products/category/${categorySlug}`,
            method: 'get',
            params: { limit },
        }),
};
