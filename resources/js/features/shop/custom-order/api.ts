import { apiRequest } from '@/api/client';
import type { CustomOrder } from '@/features/shop/custom-order/schema';
import { CustomOrderResponseSchema } from '@/features/shop/custom-order/schema';

export const customOrderApi = {
    placeClothingOrder: (payload: CustomOrder) =>
        apiRequest(CustomOrderResponseSchema, {
            url: '/shop/custom-orders/',
            method: 'post',
            data: payload,
        }),
};
