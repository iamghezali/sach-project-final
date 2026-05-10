import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Measurements, OrderItem } from '@/features/tailor/orders/schema';

function MeasurementDetails({ measurements }: { measurements: Measurements }) {
    if (measurements.measurement_type === 'standard') {
        return (
            <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-muted-foreground">
                    Size: <span className="font-medium text-foreground uppercase">{measurements.size}</span>
                </span>
                {measurements.fitting_preference && (
                    <span className="text-muted-foreground">
                        Fit: <span className="font-medium text-foreground">{measurements.fitting_preference}</span>
                    </span>
                )}
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

export function OrderListItem({ orderID, item }: { orderID: number; item: OrderItem }) {
    const { information: info, measurements } = item;

    return (
        <div className="space-y-4 rounded-lg border border-black p-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span>
                    ID: <span className="font-medium text-foreground">{item.id}</span>
                </span>
            </div>

            <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{info.title}</p>
                <Badge variant="secondary">{item.status_label}</Badge>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span>
                    Type: <span className="font-medium text-foreground">{info.item_type}</span>
                </span>
                <span>
                    For: <span className="font-medium text-foreground capitalize">{info.item_is_for}</span>
                </span>
                <span>
                    Gender: <span className="font-medium text-foreground capitalize">{info.item_for_gender}</span>
                </span>
                <span>
                    Looking for: <span className="font-medium text-foreground">{info.looking_for}</span>
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
                                Offer price: <span className="font-medium text-foreground">{item.offer_price}</span>
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

            <Button>
                <Link href={`/tailor/orders/${orderID}/item/${item.id}`}>View Details</Link>
            </Button>
        </div>
    );
}
