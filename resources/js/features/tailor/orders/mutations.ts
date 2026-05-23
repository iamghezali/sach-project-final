import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '@/features/tailor/orders/api';
import { orderKeys } from '@/features/tailor/orders/queries';
import { statsKeys } from '@/features/tailor/stats/queries';

export function useMarkOrderItemAsDone(orderID: number, orderItemID: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => ordersApi.markOrderItemAsDone(orderID, orderItemID),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: orderKeys.orderItem(orderID, orderItemID) });
            queryClient.invalidateQueries({ queryKey: orderKeys.order(orderID) });
            queryClient.invalidateQueries({ queryKey: statsKeys.stats() });
        },
    });
}
