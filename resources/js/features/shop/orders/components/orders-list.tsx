import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { AppPagination, usePagination } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useListOrders } from '@/features/shop/orders/queries';

export default function OrdersList(): JSX.Element {
    const { page, setPage } = usePagination('/shop/orders/my');
    const { data: response, isLoading } = useListOrders(page);

    if (isLoading) {
        return <></>;
    }

    if (!response) {
        return <></>;
    }

    const { data } = response;

    if (data.length === 0) {
        return <>No orders found.</>;
    }

    return (
        <>
            <ul className="flex flex-col gap-8">
                {data.map((order) => (
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
                ))}
            </ul>

            <AppPagination
                currentPage={response.meta.current_page}
                lastPage={response.meta.last_page}
                onPageChange={setPage}
            />
        </>
    );
}
