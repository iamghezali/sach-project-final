import { apiRequest } from '@/api/client';
import {
    CustomOrdersListResponseSchema,
    OrderResponseSchema,
    OrdersListResponseSchema,
} from '@/features/shop/orders/schema';

export const ordersApi = {
    list: (page: number = 1) =>
        apiRequest(OrdersListResponseSchema, {
            url: '/shop/orders',
            method: 'get',
            params: { page },
        }),

    getOrder: (id: string) =>
        apiRequest(OrderResponseSchema, {
            url: `/shop/orders/${id}`,
            method: 'get',
        }),

    listCustom: (page = 1) =>
        apiRequest(CustomOrdersListResponseSchema, {
            url: '/shop/custom-orders/',
            method: 'get',
            params: { page },
        }),

    // getCustomOrder: (id: string) =>
    //     apiRequest(CustomOrderResponseSchema, {
    //         url: `/shop/orders/custom/${id}`,
    //         method: 'get',
    //     }),
};
