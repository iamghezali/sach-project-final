import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGetOrderItem } from '@/features/tailor/orders/queries';

type OrderItemProps = {
    orderID: number;
    orderItemID: number;
};
export default function OrderItem({ orderID, orderItemID }: OrderItemProps): JSX.Element {
    const { data: response, isLoading } = useGetOrderItem(orderID, orderItemID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const orderItem = response.data;
    const { information: info, offer_price, offer_due_date, updated_at } = orderItem;

    return (
        <div className="space-y-5 py-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="mb-1 text-xs text-muted-foreground">
                        Order #{orderItem.clothing_order_id} · Item #{orderItem.id}
                    </p>
                    <h2 className="text-lg font-medium">{info.title}</h2>
                </div>
                <Badge
                    variant="outline"
                    className="border-green-300 bg-green-50 text-green-700"
                >
                    {orderItem.status_label}
                </Badge>
            </div>

            <Separator />

            <p className="text-sm text-muted-foreground">{info.description}</p>

            <Separator />

            <div className="space-y-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Item information</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Item type</p>
                        <Badge variant="secondary">{info.item_type}</Badge>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">For</p>
                        <Badge variant="outline">
                            {info.item_is_for} · {info.item_for_gender}
                        </Badge>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Looking for</p>
                        <Badge variant="secondary">{info.looking_for}</Badge>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Quantity</p>
                        <p className="text-sm font-medium">{info.quantity}</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Measurements</p>
                <div className="flex flex-wrap gap-2">
                    {orderItem.measurements.measurement_type === 'standard' ? (
                        <Badge variant="outline">Size {orderItem.measurements.size.toUpperCase()}</Badge>
                    ) : (
                        <>
                            <Badge variant="outline">Chest {orderItem.measurements.chest}cm</Badge>
                            <Badge variant="outline">Waist {orderItem.measurements.waist}cm</Badge>
                            <Badge variant="outline">Shoulder {orderItem.measurements.shoulder}cm</Badge>
                            <Badge variant="outline">Height {orderItem.measurements.height}cm</Badge>
                        </>
                    )}
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Offer</p>
                <div className="flex flex-wrap gap-3">
                    <div className="min-w-30 flex-1 rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Price</p>
                        <p className="text-xl font-medium">${offer_price}</p>
                    </div>
                    <div className="min-w-30 flex-1 rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Offer due date</p>
                        <p className="text-sm font-medium">{offer_due_date}</p>
                    </div>
                    <div className="min-w-30 flex-1 rounded-md bg-muted p-3">
                        <p className="mb-1 text-xs text-muted-foreground">Requested by</p>
                        <p className="text-sm font-medium">{info.preferred_due_date}</p>
                    </div>
                </div>
            </div>

            <Separator />

            <p className="text-xs text-muted-foreground">Updated {updated_at}</p>
        </div>
    );
}
