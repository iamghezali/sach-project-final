import type { JSX } from 'react';
import CustomOrderListItem from '@/features/shop/orders/components/custom-orders/custom-order-list-item';
import { useListCustomOrders } from '@/features/shop/orders/queries';

export default function CustomOrdersList(): JSX.Element {
    const { data: response, isLoading } = useListCustomOrders(1);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response) {
        return <></>;
    }

    const orders = response.data;

    return (
        <>
            <ul className="flex flex-col gap-8">
                {orders.length !== 0 ? (
                    orders.map((order) => (
                        <li key={order.id}>
                            <CustomOrderListItem order={order} />
                        </li>
                    ))
                ) : (
                    <>No custom orders are found.</>
                )}
            </ul>
        </>
    );
}
