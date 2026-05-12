import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ListOrderItem } from '@/features/shop/orders/schema';

type OrderListItemProps = {
    order: ListOrderItem;
};

export default function OrderListItem({ order }: OrderListItemProps): JSX.Element {
    return (
        <div className="rounded-md border border-black p-4">
            <div>
                <div>Order Sach RTW</div>
                <div>
                    <Badge variant="secondary">{order.status_label}</Badge>
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
    );
}
