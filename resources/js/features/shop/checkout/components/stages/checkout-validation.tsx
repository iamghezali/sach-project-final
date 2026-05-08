import { ArrowRightIcon } from 'lucide-react';
import { useEffect } from 'react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/features/shop/cart/hooks/use-cart';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import { getWillayaLabel } from '@/features/shop/checkout/options/willayas';

export default function CheckoutValidation(): JSX.Element {
    const { checkoutData, useSameAddress, prepareItemsFromCart } = useCheckoutFlow();
    const { cart, isReady } = useCart();

    /**
     * Sync Cart Items
     */
    useEffect(() => {
        if (isReady && cart.length > 0) {
            prepareItemsFromCart(cart);
        }
    }, [cart, isReady, prepareItemsFromCart]);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <h4 className="text-xl font-medium">Your addresses</h4>

                <div className="flex gap-14">
                    <div className="flex-1 rounded-xl border-2 border-brand-neutral-1000 px-4 py-5">
                        <h6 className="block text-lg font-medium">Your Delivery Address</h6>

                        <ul className="mt-4 space-y-2.5">
                            <li>{checkoutData.shipping_address?.full_name}</li>
                            <li>{checkoutData.shipping_address?.address_line_1}</li>

                            {checkoutData.shipping_address?.address_line_2 && (
                                <li>{checkoutData.shipping_address?.address_line_2}</li>
                            )}

                            <li>
                                {checkoutData.shipping_address?.postal_code},{' '}
                                {checkoutData.shipping_address?.willaya &&
                                    getWillayaLabel(checkoutData.shipping_address.willaya)}
                            </li>

                            <li className="capitalize">{checkoutData.shipping_address?.country}</li>
                            <li>{checkoutData.shipping_address?.phone}</li>
                        </ul>
                    </div>

                    <div className="flex-1 rounded-xl border-2 border-brand-neutral-1000 px-4 py-5">
                        <h6 className="block text-lg font-medium">Your Invoice Address</h6>

                        <ul className="mt-4 space-y-2.5">
                            <li>{checkoutData.billing_address?.full_name}</li>
                            <li>{checkoutData.billing_address?.address_line_1}</li>

                            {checkoutData.billing_address?.address_line_2 && (
                                <li>{checkoutData.shipping_address?.address_line_2}</li>
                            )}

                            <li>
                                {checkoutData.billing_address?.postal_code},{' '}
                                {checkoutData.billing_address?.willaya &&
                                    getWillayaLabel(checkoutData.billing_address.willaya)}
                            </li>
                            <li className="capitalize">{checkoutData.billing_address?.country}</li>
                            <li>{checkoutData.billing_address?.phone}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h4 className="text-xl font-medium">Delivery Option</h4>

                <RadioGroup>
                    <FieldLabel variant="brand-primary">
                        <Field
                            orientation="horizontal"
                            variant="brand-primary"
                        >
                            <RadioGroupItem
                                disabled
                                checked
                                value={checkoutData.delivery_option ?? ''}
                                variant="brand-primary"
                            />

                            <FieldContent>
                                <div className="flex justify-between">
                                    <span>Yalidine</span>
                                    <span>Fast Delivery 24 - 48h</span>
                                    <span>800.00 DZD</span>
                                </div>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                </RadioGroup>

                {checkoutData.notes !== '' && (
                    <Textarea
                        value={checkoutData.notes}
                        variant="brand-primary"
                        className="min-h-auto resize-none disabled:bg-transparent disabled:opacity-100"
                        readOnly
                        disabled
                    />
                )}
            </div>

            <div className="flex flex-col gap-6">
                <h4 className="text-xl font-medium">Payment Option</h4>

                <RadioGroup>
                    <FieldLabel variant="brand-primary">
                        <Field
                            orientation="horizontal"
                            variant="brand-primary"
                        >
                            <RadioGroupItem
                                disabled
                                checked
                                value={checkoutData.payment_option ?? ''}
                                variant="brand-primary"
                            />

                            <FieldContent>
                                <div className="flex justify-between">
                                    <span>Cash On Delivery</span>
                                    <span>12,000.00 DZD</span>
                                </div>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                </RadioGroup>
            </div>

            <div className="flex flex-col gap-4">
                <Field orientation="horizontal">
                    <Checkbox
                        id="use-same-address"
                        checked={useSameAddress}
                        variant="brand-primary"
                        aria-readonly
                        disabled
                    />
                    <FieldContent>
                        <FieldLabel htmlFor="use-same-address">Use same address for shipping & billing</FieldLabel>
                    </FieldContent>
                </Field>

                <Button
                    onClick={() => {
                        console.log('checkout-data', checkoutData);
                    }}
                    className="w-full justify-between px-4 uppercase"
                    size="brand-lg"
                    variant="brand-neutral"
                >
                    Validate & Ship
                    <ArrowRightIcon strokeWidth={3} />
                </Button>
            </div>
        </div>
    );
}
