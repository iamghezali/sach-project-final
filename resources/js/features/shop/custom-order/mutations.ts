import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { customOrderApi } from '@/features/shop/custom-order/api';
import type { CustomOrder } from '@/features/shop/custom-order/schema';
import { ordersKeys } from '@/features/shop/orders/queries';

export function usePlaceClothingOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CustomOrder) => customOrderApi.placeClothingOrder(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ordersKeys.customLists() });
        },
    });
}
