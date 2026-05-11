import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

    const { data } = response;

    return (
        <>
            <ul className="flex flex-col gap-8">
                {data.length !== 0 ? (
                    data.map((order) => (
                        <li key={order.id}>
                            <div>
                                <div>
                                    <div>Order Sach RTW</div>
                                    <div>
                                        <Badge variant="secondary">{order.status}</Badge>
                                    </div>
                                </div>
                                <div>
                                    <div>Order ID: #sach-{order.id}</div>
                                    <div>Total: {order.total} DZD</div>
                                </div>
                                <div>
                                    <div>Created on: {order.createdAt}</div>
                                    <Button
                                        className="ml-auto"
                                        asChild
                                    >
                                        <Link href={`/shop/orders/my/${order.id}/order`}>View Order</Link>
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <>Empty</>
                )}
            </ul>

            <AppPagination meta={response.meta} />
        </>
    );
}
