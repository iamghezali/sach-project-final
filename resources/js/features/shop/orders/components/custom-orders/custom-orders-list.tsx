import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import CustomOrderListItem from '@/features/shop/orders/components/custom-orders/custom-order-list-item';
import { useListCustomOrders } from '@/features/shop/orders/queries';

export default function CustomOrdersList(): JSX.Element {
    const page = usePageParam();
    const { data: response, isLoading } = useListCustomOrders(page);

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
                            <CustomOrderListItem order={order} />
                        </li>
                    ))
                ) : (
                    <>No custom orders are found.</>
                )}
            </ul>

            <AppPagination meta={response.meta} />
        </>
    );
}
