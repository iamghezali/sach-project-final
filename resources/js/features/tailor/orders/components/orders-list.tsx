import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
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
        <ul className="flex flex-col gap-4">
            {orders.map((order) => (
                <li key={order.id}>
                    <div className="flex flex-col gap-6 rounded-2xl border border-brand-neutral-alt-500 px-5 py-4.5">
                        <div>
                            <span className="text-brand-neutral-alt-700">Order ID: </span>
                            <span>#SASH-{order.id}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-[2rem] font-bold">{order.title}</span>

                            <span className="text-2xl font-bold">{formatPrice(order.offer_total)} DZD</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-brand-neutral-alt-700">Updated On: </span>
                                <span>{order.updated_at}</span>
                            </div>

                            <Button
                                variant="brand-primary"
                                size="brand-md"
                                asChild
                            >
                                <Link href={`/tailor/orders/${order.id}`}>
                                    View Order
                                    <ArrowRightIcon strokeWidth={3} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
