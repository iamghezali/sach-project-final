import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import OrderListItem from '@/features/shop/orders/components/rtw-orders/order-list-item';
import { useListOrders } from '@/features/shop/orders/queries';

export default function OrdersList(): JSX.Element {
    const page = usePageParam();
    const { data: response, isLoading } = useListOrders(page);

    const isOutOfRange = useAutoRedirectOutOfRange({
        meta: !isLoading ? response?.meta : undefined,
        currentPage: page,
    });

    if (isLoading || isOutOfRange) {
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
                            <OrderListItem order={order} />
                        </li>
                    ))
                ) : (
                    <>No orders are found.</>
                )}
            </ul>

            <AppPagination meta={response.meta} />
        </>
    );
}
