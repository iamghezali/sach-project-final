import { apiRequest } from '@/api/client';
import { ProductCategoryResponseSchema, ProductListResponseSchema } from '@/features/shop/listing/schema';

export const shopApi = {
    list: () =>
        apiRequest(ProductListResponseSchema, {
            url: '/shop/products',
            method: 'get',
        }),

    listByCategory: (categorySlug: string, limit?: number) =>
        apiRequest(ProductCategoryResponseSchema, {
            url: `/shop/products/category/${categorySlug}`,
            method: 'get',
            params: { limit },
        }),
};
