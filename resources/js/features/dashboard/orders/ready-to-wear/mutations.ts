import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/features/dashboard/orders/ready-to-wear/api';
import { orderKeys } from '@/features/dashboard/orders/ready-to-wear/queries';
import type { UpdateOrderStatusRequest } from '@/features/dashboard/orders/ready-to-wear/schema';

export const useUpdateOrderStatus = (orderID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderID, payload }: { orderID: number; payload: UpdateOrderStatusRequest }) =>
            ordersApi.updateOrderStatus(orderID, payload),

        onSuccess: () => {
            return Promise.all([
                queryClient.invalidateQueries({ queryKey: orderKeys.order(orderID) }),
                queryClient.invalidateQueries({ queryKey: orderKeys.lists() }),
            ]);
        },
    });
};
