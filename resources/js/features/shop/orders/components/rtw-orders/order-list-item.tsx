import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ListOrderItem } from '@/features/shop/orders/schema';

type OrderListItemProps = {
    order: ListOrderItem;
};

export default function OrderListItem({ order }: OrderListItemProps): JSX.Element {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-brand-neutral-alt-500 px-6.5 py-4.5 text-brand-neutral-1000">
            <div className="flex items-baseline justify-between">
                <div>
                    <span className="text-brand-neutral-alt-700">Order ID: </span>
                    <span>#SASH-{order.id}</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-700">Order Type: </span>
                    <span>Ready-to-Wear</span>
                </div>
            </div>

            <div className="flex items-baseline justify-between">
                <h2 className="text-[2rem] leading-12 font-bold">Order Sach</h2>

                <Badge className="hover:text- h-10 min-w-40 rounded-xl border border-[#D1CC98] bg-[#FFF9D9] px-6 font-normal text-neutral-900">
                    {order.status_label}
                </Badge>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <span className="text-brand-neutral-alt-700">Updated On: </span>
                    <span>{order.updated_at}</span>
                </div>

                <div>
                    <Button
                        className="min-w-48"
                        variant="brand-primary"
                        size="brand-md"
                        asChild
                    >
                        <Link href={`/shop/orders/my/${order.id}/order`}>
                            View Order
                            <ArrowRightIcon strokeWidth={3} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
