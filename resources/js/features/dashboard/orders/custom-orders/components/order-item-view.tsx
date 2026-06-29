import type { JSX } from 'react';
import OrderItemInformation from '@/features/dashboard/orders/custom-orders/components/order-item-information';
import { useGetCustomOrderItem } from '@/features/dashboard/orders/custom-orders/queries';

type OrderItemViewProps = {
    orderID: number;
    orderItemID: number;
};

export default function OrderItemView({ orderID, orderItemID }: OrderItemViewProps): JSX.Element {
    const { data: response, isLoading } = useGetCustomOrderItem(orderID, orderItemID);

    const orderItem = response?.data;

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!orderItem) {
        return <>Error Loading...</>;
    }

    return <OrderItemInformation item={orderItem} />;
}
