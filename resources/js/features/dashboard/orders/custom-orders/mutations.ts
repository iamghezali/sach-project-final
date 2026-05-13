import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customOrdersApi } from '@/features/dashboard/orders/custom-orders/api';
import { customOrderKeys } from '@/features/dashboard/orders/custom-orders/queries';
import type {
    AssignToTailorRequest,
    AttachOfferToItemRequest,
    UpdateFolderStatusRequest,
    UpdateItemStatusRequest,
} from '@/features/dashboard/orders/custom-orders/schema';

export const useAssignToTailor = (orderID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderID, payload }: { orderID: number; payload: AssignToTailorRequest }) =>
            customOrdersApi.assignToTailor(orderID, payload),

        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: customOrderKeys.order(orderID) });
        },
    });
};

export const useAttachOfferToItem = (orderID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderID, payload }: { orderID: number; payload: AttachOfferToItemRequest }) =>
            customOrdersApi.attachOfferToItem(orderID, payload),

        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: customOrderKeys.order(orderID) });
        },
    });
};

export const useUpdateFolderStatus = (orderID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderID, payload }: { orderID: number; payload: UpdateFolderStatusRequest }) =>
            customOrdersApi.updateFolderStatus(orderID, payload),

        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: customOrderKeys.order(orderID) });
        },
    });
};

export const useUpdateItemStatus = (orderID: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            orderID,
            itemID,
            payload,
        }: {
            orderID: number;
            itemID: number;
            payload: UpdateItemStatusRequest;
        }) => customOrdersApi.updateItemStatus(orderID, itemID, payload),

        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: customOrderKeys.order(orderID) });
        },
    });
};
