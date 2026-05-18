import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { getAttributeValue, useCart } from '@/features/shop/cart/hooks/use-cart';
import { formatPrice } from '@/lib/format-price';

export default function CartSummary(): JSX.Element {
    const { cart, subtotal, isReady } = useCart();
    const delivery_cost = 800;

    if (!isReady) {
        return <>Loading...</>;
    }

    if (cart.length === 0) {
        return <></>;
    }

    return (
        <div className="sticky top-7 w-full shrink-0 basis-104.5">
            <div className="rounded-lg border p-4">
                <h2 className="text-2xl font-semibold">Order Summary</h2>

                <ul className="mt-3 flex flex-col gap-2">
                    {cart.map((item) => {
                        const attributes = item.product.attributes;

                        return (
                            <li
                                key={item.variant?.id}
                                className="flex items-start justify-between"
                            >
                                <div className="flex gap-2">
                                    <span>x{item.quantity}</span> {item.product.name}{' '}
                                    <ul className="flex items-center gap-1">
                                        {item.variant?.attribute_value_ids.map((attr_id, i) => (
                                            <li
                                                key={`${attr_id}-${i}`}
                                                className="rounded-md border"
                                            >
                                                {getAttributeValue(attributes, attr_id)?.attribute_value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <span>{formatPrice(parseFloat(item.variant?.price ?? '0'))} DZD</span>
                            </li>
                        );
                    })}

                    <li className="flex items-center justify-between">
                        <span>Sub-Total</span>
                        <span className="text-brand-neutral-1000/80">{formatPrice(subtotal)} DZD</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>Delivery</span>
                        <span className="text-brand-neutral-1000/80">
                            {cart.length === 0 ? '-' : `${formatPrice(delivery_cost)} DZD`}
                        </span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>Sales Tax</span>
                        <span className="text-brand-neutral-1000/80">-</span>
                    </li>
                    <li className="flex items-center justify-between text-xl font-semibold">
                        <span>Total</span>
                        <span className="text-brand-neutral-1000/80">
                            {cart.length === 0 ? '-' : `${formatPrice(subtotal + delivery_cost)} DZD`}
                        </span>
                    </li>
                </ul>

                <Button
                    className="mt-6 w-full uppercase"
                    asChild
                    variant="brand-neutral"
                    size="brand-lg"
                >
                    <Link href="/shop/checkout">Checkout</Link>
                </Button>
            </div>
        </div>
    );
}
