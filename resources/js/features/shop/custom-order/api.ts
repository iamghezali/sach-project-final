import { apiFormDataRequest } from '@/api/client';
import { PlaceCustomOrderResponseSchema } from '@/features/shop/custom-order/schema';
import type { CustomOrder } from '@/features/shop/custom-order/schema';

export const customOrderApi = {
    placeClothingOrder: (payload: CustomOrder) =>
        apiFormDataRequest(PlaceCustomOrderResponseSchema, {
            url: '/shop/custom-orders/',
            method: 'post',
            data: payload,
        }),
};
