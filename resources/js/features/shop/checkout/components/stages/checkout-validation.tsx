import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import { getWillayaLabel } from '@/features/shop/checkout/options/willayas';

export default function CheckoutValidation(): JSX.Element {
    const { checkoutData, useSameAddress } = useCheckoutFlow();

    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-xl font-medium">Your addresses</h4>

            <div className="flex gap-14">
                <div className="min-w-0 grow rounded-xl border px-4 py-5">
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

                <div className="min-w-0 grow rounded-xl border px-4 py-5">
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

            <h4 className="text-xl font-medium">Delivery Option</h4>

            <RadioGroup>
                <FieldLabel>
                    <Field orientation="horizontal">
                        <RadioGroupItem
                            disabled
                            checked
                            value={String(checkoutData.delivery_option)}
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

            <Textarea
                value={checkoutData.notes}
                className="resize-none"
                readOnly
            />

            <h4 className="text-xl font-medium">Payment Option</h4>

            <RadioGroup>
                <FieldLabel>
                    <Field orientation="horizontal">
                        <RadioGroupItem
                            disabled
                            checked
                            value={String(checkoutData.payment_option)}
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

            <Field orientation="horizontal">
                <Checkbox
                    id="use-same-address"
                    checked={useSameAddress}
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
            >
                Validate & Ship
            </Button>
        </div>
    );
}
