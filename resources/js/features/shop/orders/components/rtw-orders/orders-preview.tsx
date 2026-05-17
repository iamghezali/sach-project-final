import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import OrderListItem from '@/features/shop/orders/components/rtw-orders/order-list-item';
import { useListOrders } from '@/features/shop/orders/queries';

const PREVIEW_LIMIT = 3;

export default function OrdersPreview(): JSX.Element {
    const { data: response, isLoading } = useListOrders(1);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response) {
        return <></>;
    }

    const orders = response.data.slice(0, PREVIEW_LIMIT);
    const hasMore = response.meta.total > PREVIEW_LIMIT;

    return (
        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-6">
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

            {hasMore && (
                <Button
                    variant="brand-primary"
                    size="brand-md"
                    className="self-center"
                    asChild
                >
                    <Link href="/shop/orders/my?view=orders&page=1">See all orders</Link>
                </Button>
            )}
        </div>
    );
}
