import { apiRequest } from '@/api/client';
import type { ResolveCustomOrderOfferRequest } from '@/features/shop/orders/schema';
import {
    CustomOrdersListResponseSchema,
    OrderResponseSchema,
    OrdersListResponseSchema,
    ResolveCustomOrderOfferResponseSchema,
} from '@/features/shop/orders/schema';

export const ordersApi = {
    list: (page: number = 1) =>
        apiRequest(OrdersListResponseSchema, {
            url: '/shop/orders',
            method: 'get',
            params: { page },
        }),

    getOrder: (id: number) =>
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

    resolveCustomOrderOffer: (orderID: number, payload: ResolveCustomOrderOfferRequest) =>
        apiRequest(ResolveCustomOrderOfferResponseSchema, {
            url: `/shop/custom-orders/${orderID}/resolve`,
            method: 'patch',
            data: payload,
        }),
};
