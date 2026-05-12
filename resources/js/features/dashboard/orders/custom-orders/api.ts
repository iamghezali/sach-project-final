import { apiRequest } from '@/api/client';
import type {
    AssignToTailorRequest,
    AttachOfferToItemRequest,
    UpdateFolderStatusRequest,
    UpdateItemStatusRequest,
} from '@/features/dashboard/orders/custom-orders/schema';
import {
    AssignToTailorResponseSchema,
    AttachOfferToItemResponseSchema,
    CustomOrderFolderResponseSchema,
    CustomOrderListResponseSchema,
    UpdateFolderStatusResponseSchema,
    UpdateItemStatusResponseSchema,
} from '@/features/dashboard/orders/custom-orders/schema';

export const customOrdersApi = {
    list: (page: number = 1) =>
        apiRequest(CustomOrderListResponseSchema, {
            url: '/custom-orders/',
            method: 'get',
            params: { page },
        }),

    getCustomOrderFolder: (id: number) =>
        apiRequest(CustomOrderFolderResponseSchema, {
            url: `/custom-orders/${id}`,
            method: 'get',
        }),

    assignToTailor: (id: number, payload: AssignToTailorRequest) =>
        apiRequest(AssignToTailorResponseSchema, {
            url: `/custom-orders/${id}/assign`,
            method: 'patch',
            data: payload,
        }),

    attachOfferToItem: (id: number, payload: AttachOfferToItemRequest) =>
        apiRequest(AttachOfferToItemResponseSchema, {
            url: `/custom-orders/${id}/offer`,
            method: 'put',
            data: payload,
        }),

    updateFolderStatus: (orderID: number, payload: UpdateFolderStatusRequest) =>
        apiRequest(UpdateFolderStatusResponseSchema, {
            url: `/custom-orders/${orderID}/status`,
            method: 'patch',
            data: payload,
        }),

    updateItemStatus: (orderID: number, itemID: number, payload: UpdateItemStatusRequest) =>
        apiRequest(UpdateItemStatusResponseSchema, {
            url: `/custom-orders/${orderID}/items/${itemID}/status`,
            method: 'patch',
            data: payload,
        }),
};
