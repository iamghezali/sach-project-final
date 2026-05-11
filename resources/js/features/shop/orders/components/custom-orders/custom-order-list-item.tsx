import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ListCustomOrderItem } from '@/features/shop/orders/schema';

type CustomOrderListItemProps = {
    order: ListCustomOrderItem;
};

export default function CustomOrderListItem({ order }: CustomOrderListItemProps): JSX.Element {
    return (
        <div className="rounded-md border border-black p-4">
            <div>
                <div>Order Sach Custom</div>
                <div>
                    <Badge variant="secondary">{order.status}</Badge>
                </div>
            </div>
            <div>
                <div>Order ID: #sach-{order.id}</div>
                <div>Total: {order.offer_total} DZD</div>
            </div>
            <div>
                <div>Created on: {order.created_at}</div>
                <Button
                    className="ml-auto"
                    asChild
                >
                    <Link href={`/shop/orders/my/${order.id}/custom-order`}>View Order</Link>
                </Button>
            </div>
        </div>
    );
}
