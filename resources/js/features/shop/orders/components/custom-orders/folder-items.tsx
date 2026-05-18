import { Link } from '@inertiajs/react';
import { HeadsetIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CustomOrderInteractions from '@/features/shop/orders/components/custom-orders/custom-order-interactions';
import FolderOrderItem from '@/features/shop/orders/components/custom-orders/folder-order-item';
import { useGetCustomOrderFolder } from '@/features/shop/orders/queries';
import { formatPrice } from '@/lib/format-price';

type FolderItemsProps = {
    orderID: number;
};

export default function FolderItems({ orderID }: FolderItemsProps): JSX.Element {
    const { data: response, isLoading } = useGetCustomOrderFolder(orderID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const order = response.data;

    return (
        <div className="flex flex-col gap-8">
            <div>
                <div className="flex items-baseline justify-between">
                    <div>
                        <span className="text-brand-neutral-alt-700">Order ID: </span>
                        <span>#SASH-{order.id}</span>
                    </div>

                    <div>
                        <Badge className="hover:text- h-10 min-w-40 rounded-xl border border-brand-secondary-400 bg-brand-secondary-200 px-6 font-normal text-neutral-900">
                            Custom Order
                        </Badge>
                    </div>
                </div>

                <h1 className="text-[4.25rem] leading-25.5 font-bold">{order.title}</h1>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-brand-neutral-alt-700">Updated On: </span>
                        <span>{order.updated_at}</span>
                    </div>

                    <div>
                        <Badge className="hover:text- h-10 min-w-40 rounded-xl border border-[#D1CC98] bg-[#FFF9D9] px-6 font-normal text-neutral-900">
                            {order.status_label}
                        </Badge>
                    </div>
                </div>
            </div>

            {order.status === 'offered' && (
                <div className="flex justify-end">
                    <CustomOrderInteractions orderID={orderID} />
                </div>
            )}

            <ul className="flex flex-col gap-4">
                {order.items.map((item) => (
                    <li key={item.id}>
                        <FolderOrderItem
                            item={item}
                            orderID={orderID}
                        />
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-4 text-right text-xl leading-none">
                <div>
                    <span className="text-brand-neutral-alt-600">Items Subtotal: </span>
                    <span className="inline-block min-w-40 font-medium">{formatPrice(order.offer_total)} DZD</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Delivery Fee: </span>
                    <span className="inline-block min-w-40 font-medium">{formatPrice(800)} DZD</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Total Amount: </span>
                    <span className="inline-block min-w-40 font-medium">
                        {formatPrice(parseFloat(order.offer_total).toFixed() + 800)} DZD
                    </span>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    className="font-normal"
                    variant="brand-outline"
                    size="brand-md"
                    asChild
                >
                    <Link href="/contact">
                        Contact Support
                        <HeadsetIcon />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
