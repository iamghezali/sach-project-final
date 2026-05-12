import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/features/shop/orders/api';
import { ordersKeys } from '@/features/shop/orders/queries';
import type { ResolveCustomOrderOfferRequest } from '@/features/shop/orders/schema';

export const useResolveCustomOrderOffer = (orderID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderID, payload }: { orderID: number; payload: ResolveCustomOrderOfferRequest }) =>
            ordersApi.resolveCustomOrderOffer(orderID, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ordersKeys.customLists(),
            });

            queryClient.invalidateQueries({
                queryKey: ordersKeys.customOrder(orderID),
            });
        },
    });
};
