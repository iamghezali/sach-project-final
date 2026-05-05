import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import FormCombobox from '@/components/form/form-combobox';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormSelect } from '@/components/form/form-select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import { willayas } from '@/features/shop/checkout/options/willayas';
import type { Addresses } from '@/features/shop/checkout/schema';
import { AddressesSchema } from '@/features/shop/checkout/schema';
export default function CheckoutAddress(): JSX.Element {
    const { useSameAddress, setUseSameAddress, checkoutData, appendCheckoutData, confirmStage } = useCheckoutFlow();

    const form = useForm<Addresses>({
        resolver: zodResolver(AddressesSchema),
        defaultValues: {
            shipping_address: checkoutData.shipping_address,
            billing_address: checkoutData.billing_address,
        },
    });

    const onSubmit: SubmitHandler<Addresses> = (values) => {
        appendCheckoutData(values);
        confirmStage('step-2', 'step-3');
        console.log(values);
    };

    const shipping_address = useWatch({
        control: form.control,
        name: 'shipping_address',
    });

    useEffect(() => {
        const { isSubmitted, isDirty } = form.formState;

        form.clearErrors('billing_address');

        if (useSameAddress) {
            form.setValue('billing_address', shipping_address, {
                shouldValidate: isDirty && isSubmitted,
            });
        }
    }, [useSameAddress, form, shipping_address]);

    return (
        <div>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet className="gap-6">
                    <div>
                        <FieldLegend className="my-0">Enter your shipping Address</FieldLegend>
                    </div>

                    <FieldGroup className="gap-6">
                        <FormField
                            control={form.control}
                            name="shipping_address.full_name"
                        >
                            <FormInput
                                placeholder="Full Name"
                                variant="brand-primary"
                            />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="shipping_address.address_line_1"
                        >
                            <FormInput
                                placeholder="Address Line 1"
                                variant="brand-primary"
                            />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="shipping_address.address_line_2"
                        >
                            <FormInput
                                placeholder="Address Line 2"
                                variant="brand-primary"
                            />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="shipping_address.postal_code"
                        >
                            <FormInput
                                placeholder="ZIP Code"
                                variant="brand-primary"
                            />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="shipping_address.willaya"
                        >
                            <FormCombobox
                                placeholder="Willaya"
                                options={willayas}
                            />

                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="shipping_address.country"
                        >
                            {({ field }) => (
                                <FormSelect
                                    placeholder="Select your country"
                                    field={field}
                                >
                                    {({ Item }) => (
                                        <>
                                            <Item value="algeria">Algeria</Item>
                                        </>
                                    )}
                                </FormSelect>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="shipping_address.phone"
                        >
                            <FormInput
                                placeholder="Phone"
                                variant="brand-primary"
                            />
                            <FormField.Error />
                        </FormField>
                    </FieldGroup>
                </FieldSet>

                <Field
                    orientation="horizontal"
                    className="mt-6"
                >
                    <Checkbox
                        id="use-same-address"
                        checked={useSameAddress}
                        onCheckedChange={setUseSameAddress}
                        variant="brand-primary"
                    />
                    <FieldContent>
                        <FieldLabel
                            htmlFor="use-same-address"
                            className="text-base"
                        >
                            Use this address for invoicing
                        </FieldLabel>
                    </FieldContent>
                </Field>

                <Collapsible open={!useSameAddress}>
                    <CollapsibleContent>
                        <FieldSet className="mt-6 gap-6">
                            <div>
                                <FieldLegend className="my-0">Enter your billing Address</FieldLegend>
                            </div>

                            <FieldGroup className="gap-6">
                                <FormField
                                    control={form.control}
                                    name="billing_address.full_name"
                                >
                                    <FormInput
                                        placeholder="Full Name"
                                        disabled={!!useSameAddress}
                                        readOnly={!!useSameAddress}
                                        variant="brand-primary"
                                    />
                                    <FormField.Error />
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="billing_address.address_line_1"
                                >
                                    <FormInput
                                        placeholder="Address Line 1"
                                        disabled={!!useSameAddress}
                                        readOnly={!!useSameAddress}
                                        variant="brand-primary"
                                    />
                                    <FormField.Error />
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="billing_address.address_line_2"
                                >
                                    <FormInput
                                        placeholder="Address Line 2"
                                        disabled={!!useSameAddress}
                                        readOnly={!!useSameAddress}
                                        variant="brand-primary"
                                    />
                                    <FormField.Error />
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="billing_address.postal_code"
                                >
                                    <FormInput
                                        placeholder="ZIP Code"
                                        disabled={!!useSameAddress}
                                        readOnly={!!useSameAddress}
                                        variant="brand-primary"
                                    />
                                    <FormField.Error />
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="billing_address.willaya"
                                >
                                    <FormCombobox
                                        placeholder="Willaya"
                                        options={willayas}
                                    />

                                    <FormField.Error />
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="billing_address.country"
                                >
                                    {({ field }) => (
                                        <FormSelect
                                            placeholder="Select your country"
                                            field={field}
                                        >
                                            {({ Item }) => (
                                                <>
                                                    <Item value="algeria">Algeria</Item>
                                                </>
                                            )}
                                        </FormSelect>
                                    )}
                                </FormField>

                                <FormField
                                    control={form.control}
                                    name="billing_address.phone"
                                >
                                    <FormInput
                                        placeholder="Phone"
                                        disabled={!!useSameAddress}
                                        readOnly={!!useSameAddress}
                                        variant="brand-primary"
                                    />
                                    <FormField.Error />
                                </FormField>
                            </FieldGroup>
                        </FieldSet>
                    </CollapsibleContent>
                </Collapsible>

                <FormButton
                    control={form.control}
                    className="mt-6 w-full justify-between px-4 uppercase"
                    size="brand-lg"
                    variant="brand-neutral"
                >
                    Continue
                    <ArrowRightIcon strokeWidth={3} />
                </FormButton>
            </Form>
        </div>
    );
}
