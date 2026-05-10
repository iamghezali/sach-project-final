import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useListOrders } from '@/features/tailor/orders/queries';
import { formatPrice } from '@/lib/format-price';

export default function OrdersList(): JSX.Element {
    const { data: response, isLoading } = useListOrders();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const orders = response.data;

    return (
        <ul>
            {orders.map((order) => (
                <li key={order.id}>
                    <div className="flex flex-col border border-brand-neutral-700 p-3">
                        <span>{order.title}</span>
                        <span>
                            <Badge>{order.status_label}</Badge>
                        </span>
                        <span>{formatPrice(order.offer_total)} DZD</span>

                        <span>{order.updated_at}</span>

                        <Button
                            variant="brand-primary"
                            size="brand-md"
                            asChild
                        >
                            <Link href={`/tailor/orders/${order.id}`}>View Order</Link>
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
