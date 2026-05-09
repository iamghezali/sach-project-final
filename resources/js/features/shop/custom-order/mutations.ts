import { useMutation } from '@tanstack/react-query';
import { customOrderApi } from '@/features/shop/custom-order/api';
import type { CustomOrder } from '@/features/shop/custom-order/schema';

export function usePlaceClothingOrder() {
    return useMutation({
        mutationFn: (payload: CustomOrder) => customOrderApi.placeClothingOrder(payload),
    });
}
