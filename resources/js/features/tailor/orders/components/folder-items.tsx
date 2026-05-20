import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { OrderListItem } from '@/features/tailor/orders/components/order-list-item';
import { useOrderFolder } from '@/features/tailor/orders/queries';

type FolderItemsProps = {
    orderID: number;
};
export default function FolderItems({ orderID }: FolderItemsProps): JSX.Element {
    const { data: response, isLoading } = useOrderFolder(orderID);

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

            {order.items.map((item) => (
                <OrderListItem
                    key={item.id}
                    item={item}
                    orderID={orderID}
                />
            ))}
        </div>
    );
}
