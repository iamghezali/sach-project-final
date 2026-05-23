import { useListCustomOrders } from '@/features/shop/orders/queries';
import { useListOrders } from '@/features/shop/orders/queries';

export function useAllOrdersEmpty() {
    const { data: orders, isLoading: ordersLoading } = useListOrders(1);
    const { data: customOrders, isLoading: customLoading } = useListCustomOrders(1);

    const isLoading = ordersLoading || customLoading;
    const bothEmpty = !isLoading && orders?.data.length === 0 && customOrders?.data.length === 0;

    return { bothEmpty, isLoading };
}
