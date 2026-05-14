import { apiRequest } from '@/api/client';
import type { ResolveCustomOrderOfferRequest } from '@/features/shop/orders/schema';
import {
    CustomOrderFolderResponseSchema,
    CustomOrderItemResponseSchema,
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

    getCustomOrderFolder: (id: number) =>
        apiRequest(CustomOrderFolderResponseSchema, {
            url: `/shop/custom-orders/${id}`,
            method: 'get',
        }),

    getCustomOrderItem: (orderID: number, itemID: number) =>
        apiRequest(CustomOrderItemResponseSchema, {
            url: `/shop/custom-orders/${orderID}/items/${itemID}`,
            method: 'get',
        }),
};
