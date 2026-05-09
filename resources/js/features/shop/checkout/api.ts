import { apiRequest } from '@/api/client';
import type { OrderRequest } from '@/features/shop/checkout/schema';
import { OrderResponseSchema } from '@/features/shop/checkout/schema';

export const checkoutApi = {
    placeOrder: (payload: OrderRequest) =>
        apiRequest(OrderResponseSchema, {
            url: '/shop/orders/',
            method: 'post',
            data: payload,
        }),
};
