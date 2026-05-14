// resources/js/features/shop/orders/components/custom-orders/custom-order-item.tsx

import type { JSX } from 'react';
import Image from '@/components/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGetCustomOrderItem } from '@/features/shop/orders/queries';

type CustomOrderItemProps = {
    orderID: number;
    orderItemID: number;
};

export default function CustomOrderItem({ orderID, orderItemID }: CustomOrderItemProps): JSX.Element {
    const { data: response, isLoading } = useGetCustomOrderItem(orderID, orderItemID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const item = response.data;
    const { information: info } = item;

    return (
        <div className="space-y-5 py-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">
                        Order #sach-{orderID} · Item #{item.id}
                    </p>
                    <h2 className="text-lg font-medium">{info.title}</h2>
                </div>
                <Badge variant="outline">{item.status_label}</Badge>
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground">{info.description}</p>

            <Separator />

            {item.images.length > 0 && (
                <>
                    <div className="space-y-3">
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Reference Images
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.images.map((image) => (
                                <div
                                    key={image.uuid}
                                    className="group relative aspect-square w-24 overflow-hidden rounded-md border bg-muted sm:w-32"
                                >
                                    <a
                                        href={image.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={info.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator />
                </>
            )}

            <div className="space-y-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Item information</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Type</p>
                        <Badge variant="secondary">{info.item_type}</Badge>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Quantity</p>
                        <p className="text-sm font-medium">{info.quantity}</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Offer Details</p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Price</p>
                        <p className="text-xl font-medium">
                            {item.offer_price ? `${item.offer_price} DZD` : 'Pending'}
                        </p>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Due Date</p>
                        <p className="text-sm font-medium">{item.offer_due_date ?? 'Pending'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
