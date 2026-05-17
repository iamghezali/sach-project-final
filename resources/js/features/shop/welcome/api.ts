import { apiRequest } from '@/api/client';
import { ProductCategoryResponseSchema } from '@/features/shop/welcome/schema';

export const welcomeApi = {
    listByCategory: (categorySlug: string, limit?: number) =>
        apiRequest(ProductCategoryResponseSchema, {
            url: `/shop/products/category/${categorySlug}`,
            method: 'get',
            params: { limit },
        }),
};
