import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutApi } from '@/features/shop/checkout/api';
import type { OrderRequest } from '@/features/shop/checkout/schema';
import { ordersKeys } from '@/features/shop/orders/queries';

export function usePlaceOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: OrderRequest) => checkoutApi.placeOrder(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
        },
    });
}
