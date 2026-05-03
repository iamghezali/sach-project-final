import { apiRequest } from '@/api/client';
import { ProductListResponseSchema } from '@/features/shop/listing/schema';

export const shopApi = {
    list: () =>
        apiRequest(ProductListResponseSchema, {
            url: '/shop/products',
            method: 'get',
        }),
};
