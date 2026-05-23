import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import CustomOrderListItem from '@/features/shop/orders/components/custom-orders/custom-order-list-item';
import { useListCustomOrders } from '@/features/shop/orders/queries';

const PREVIEW_LIMIT = 3;

export default function CustomOrdersPreview(): JSX.Element {
    const { data: response, isLoading } = useListCustomOrders(1);

    if (isLoading) {
        return <></>;
    }

    if (!response) {
        return <></>;
    }

    const orders = response.data.slice(0, PREVIEW_LIMIT);
    const hasMore = response.meta.total > PREVIEW_LIMIT;

    return (
        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-6">
                {orders.map((order) => (
                    <li key={order.id}>
                        <CustomOrderListItem order={order} />
                    </li>
                ))}
            </ul>

            {hasMore && (
                <Button
                    variant="brand-primary"
                    size="brand-md"
                    className="self-center"
                    asChild
                >
                    <Link href="/shop/orders/my?view=custom-orders&page=1">See all custom orders</Link>
                </Button>
            )}
        </div>
    );
}
