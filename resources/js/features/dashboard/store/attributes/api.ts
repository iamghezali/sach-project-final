import { apiRequest } from '@/api/client';
import type { CreateAttributeRequest, CreateAttributeValueRequest } from '@/features/dashboard/store/attributes/schema';
import {
    AttributesListResponseSchema,
    AttributeWithValuesListResponseSchema,
    CreateAttributeResponseSchema,
    CreateAttributeValueResponseSchema,
} from '@/features/dashboard/store/attributes/schema';

export const attributesApi = {
    list: () =>
        apiRequest(AttributesListResponseSchema, {
            url: '/attributes/',
            method: 'get',
        }),

    createAttribute: (payload: CreateAttributeRequest) =>
        apiRequest(CreateAttributeResponseSchema, {
            url: '/attributes/',
            method: 'post',
            data: payload,
        }),

    getAttributeWithValues: (id: number) =>
        apiRequest(AttributeWithValuesListResponseSchema, {
            url: `/attributes/${id}`,
            method: 'get',
        }),

    createAttributeValue: (id: number, payload: CreateAttributeValueRequest) =>
        apiRequest(CreateAttributeValueResponseSchema, {
            url: `/attributes/${id}/values`,
            method: 'post',
            data: payload,
        }),
};
