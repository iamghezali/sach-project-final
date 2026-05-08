import { Link } from '@inertiajs/react';
import { ArchiveXIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { getAttributeValue } from '@/features/shop/cart/hooks/use-cart';
import type { CartItem } from '@/features/shop/cart/hooks/use-cart';
import { formatPrice } from '@/lib/format-price';

export default function CartItem({
    item,
    removeItem,
}: {
    item: CartItem;
    removeItem: (variantId: number) => void;
}): JSX.Element {
    const attributes = item.product.attributes;

    return (
        <div>
            <div className="flex gap-6">
                <div className="shrink-0 basis-39">
                    <div className="relative overflow-hidden rounded-3xl bg-neutral-300 pt-[120%]"></div>
                </div>

                <div className="min-w-0 grow">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-semibold text-brand-neutral-1000">
                                <Link
                                    href={`/shop/product/${item.product.slug}`}
                                    className="hover:underline"
                                >
                                    {item.product.name}
                                </Link>
                            </span>
                            <span className="text-2xl font-semibold text-brand-secondary-300">
                                {formatPrice(parseFloat(item.variant?.price ?? '0'))} DZD
                            </span>
                        </div>

                        <div>
                            {item.variant?.attribute_value_ids.map((attr_id, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex gap-2"
                                    >
                                        <span className="mt-2 inline-block">
                                            {getAttributeValue(attributes, attr_id)?.attribute_name}:
                                        </span>
                                        <span className="mt-2 inline-block">
                                            <div>{getAttributeValue(attributes, attr_id)?.attribute_value}</div>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <span className="mt-2 inline-block">Quantity: {item.quantity}</span>

                        <div className="mt-auto flex gap-6">
                            <Button
                                size="icon-lg"
                                variant="destructive"
                                onClick={() => removeItem(item.variant?.id ?? 0)}
                            >
                                <ArchiveXIcon
                                    className="size-6"
                                    strokeWidth={1}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
