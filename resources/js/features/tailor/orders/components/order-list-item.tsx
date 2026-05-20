import { Link } from '@inertiajs/react';
import Image from '@/components/image';
import { Badge } from '@/components/ui/badge';
import type { OrderItem } from '@/features/tailor/orders/schema';

export function OrderListItem({ orderID, item }: { orderID: number; item: OrderItem }) {
    const { information: info, measurements } = item;

    return (
        <div className="flex items-center gap-6 rounded-2xl border border-brand-neutral-alt-500 p-4">
            <div className="shrink-0 basis-48">
                <div className="relative overflow-hidden rounded-3xl bg-brand-neutral-200 pt-[120%]">
                    <Image
                        src={item.images[0].url}
                        className="absolute inset-0 size-full object-cover"
                    />
                </div>
            </div>

            <div className="flex grow flex-col gap-5 leading-none">
                <div className="flex items-center justify-between gap-3">
                    <Link
                        className="text-2xl font-bold hover:underline"
                        href={`/tailor/orders/${orderID}/item/${item.id}`}
                    >
                        {info.title}
                    </Link>

                    <Badge>{item.status_label}</Badge>
                </div>

                <div className="flex items-center gap-10">
                    <div>
                        <span className="text-brand-neutral-alt-700">Type: </span>
                        <span className="capitalize">{info.item_is_for}</span>
                    </div>

                    <div>
                        <span className="text-brand-neutral-alt-700">Category: </span>
                        <span className="capitalize">{info.item_type}</span>
                    </div>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-700">Measurements: </span>
                    <span className="capitalize">
                        {measurements.measurement_type}{' '}
                        {measurements.measurement_type === 'standard' && (
                            <span className="uppercase">({measurements.size})</span>
                        )}
                    </span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-700">Quantity: </span>
                    <span className="capitalize">{info.quantity}</span>
                </div>

                {(item.offer_price || item.offer_due_date) && (
                    <div className="flex justify-between">
                        {item.offer_price && (
                            <div>
                                <span className="text-brand-neutral-alt-700">Unit Price: </span>
                                <span className="capitalize">{item.offer_price} DZD</span>
                            </div>
                        )}

                        {item.offer_due_date && (
                            <div>
                                <span className="text-brand-neutral-alt-700">Estimated Delivery Date: </span>
                                <span className="capitalize">{item.offer_due_date}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
