import { apiRequest } from '@/api/client';
import { ProductResponseSchema } from '@/features/shop/product/schema';

export const productApi = {
    getProduct: (slug: string) =>
        apiRequest(ProductResponseSchema, {
            url: `/shop/products/${slug}`,
            method: 'get',
        }),
};
