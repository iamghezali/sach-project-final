import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import EmptyOrders from '@/features/shop/orders/components/empty-orders';
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
    const meta = response?.meta;

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
                    <EmptyOrders />
                )}
            </ul>

            {meta && meta.last_page > 1 && (
                <div className="flex justify-center border-t border-brand-neutral-100 pt-8">
                    <AppPagination meta={meta} />
                </div>
            )}
        </>
    );
}
