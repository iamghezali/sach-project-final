import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CustomOrderInteractions from '@/features/shop/orders/components/custom-orders/custom-order-interactions';
import type { ListCustomOrderItem } from '@/features/shop/orders/schema';
import { formatPrice } from '@/lib/format-price';

type CustomOrderListItemProps = {
    order: ListCustomOrderItem;
};

export default function CustomOrderListItem({ order }: CustomOrderListItemProps): JSX.Element {
    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-brand-neutral-alt-500 px-6.5 py-4.5 text-brand-neutral-1000">
            <div className="flex items-baseline justify-between">
                <div>
                    <span className="text-brand-neutral-alt-700">Order ID: </span>
                    <span>#SASH-{order.id}</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-700">Order Type: </span>
                    <span>Custom Order</span>
                </div>
            </div>

            <div className="flex items-baseline justify-between">
                <Link
                    href={`/shop/orders/my/${order.id}/custom-order`}
                    className="text-[2rem] leading-12 font-bold hover:underline"
                >
                    {order.title}
                </Link>

                {order.status === 'offered' ? (
                    <>
                        <span className="text-3xl font-bold">{formatPrice(order.offer_total)} DZD</span>
                    </>
                ) : (
                    <Badge className="hover:text- h-10 min-w-40 rounded-xl border border-[#D1CC98] bg-[#FFF9D9] px-6 font-normal text-neutral-900">
                        {order.status_label}
                    </Badge>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <span className="text-brand-neutral-alt-700">Updated On: </span>
                    <span>{order.updated_at}</span>
                </div>

                <div>
                    {order.status === 'offered' ? (
                        <CustomOrderInteractions orderID={order.id} />
                    ) : (
                        <Button
                            className="min-w-48"
                            variant="brand-primary"
                            size="brand-md"
                            asChild
                        >
                            <Link href={`/shop/orders/my/${order.id}/custom-order`}>
                                View Order
                                <ArrowRightIcon strokeWidth={3} />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
