import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { CustomOrderItem, CustomMeasurements } from '@/features/shop/orders/schema';

function MeasurementDetails({ measurements }: { measurements: CustomMeasurements }) {
    if (measurements.measurement_type === 'standard') {
        return (
            <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-muted-foreground">
                    Size: <span className="font-medium text-foreground uppercase">{measurements.size}</span>
                </span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
            {(
                [
                    ['Shoulder', measurements.shoulder],
                    ['Height', measurements.height],
                    ['Waist', measurements.waist],
                    ['Chest', measurements.chest],
                ] as const
            ).map(([label, value]) => (
                <span
                    key={label}
                    className="text-muted-foreground"
                >
                    {label}: <span className="font-medium text-foreground">{value} cm</span>
                </span>
            ))}
        </div>
    );
}

export default function FolderOrderItem({ orderID, item }: { orderID: number; item: CustomOrderItem }) {
    const { information: info, measurements } = item;

    return (
        <div className="space-y-4 rounded-lg border border-black p-4">
            <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{info.title}</p>
                <Badge variant="secondary">{item.status_label}</Badge>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span>
                    Type: <span className="font-medium text-foreground">{info.item_type}</span>
                </span>
                <span>
                    Qty: <span className="font-medium text-foreground">{info.quantity}</span>
                </span>
            </div>

            <Separator />

            <div className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Measurements ({measurements.measurement_type})
                </p>
                <MeasurementDetails measurements={measurements} />
            </div>

            {(item.offer_price || item.offer_due_date) && (
                <>
                    <Separator />
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {item.offer_price && (
                            <span>
                                Price: <span className="font-medium text-foreground">{item.offer_price} DZD</span>
                            </span>
                        )}
                        {item.offer_due_date && (
                            <span>
                                Due date: <span className="font-medium text-foreground">{item.offer_due_date}</span>
                            </span>
                        )}
                    </div>
                </>
            )}

            <Button
                variant="outline"
                asChild
            >
                <Link href={`/shop/orders/my/${orderID}/custom-order/item/${item.id}`}>View Details</Link>
            </Button>
        </div>
    );
}
