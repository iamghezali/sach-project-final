import { useMutation } from '@tanstack/react-query';
import { checkoutApi } from '@/features/shop/checkout/api';
import type { OrderRequest } from '@/features/shop/checkout/schema';

export function usePlaceOrder() {
    return useMutation({
        mutationFn: (payload: OrderRequest) => checkoutApi.placeOrder(payload),
    });
}
