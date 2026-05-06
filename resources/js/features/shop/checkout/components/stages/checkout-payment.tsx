import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormCardRadioGroup } from '@/components/form/form-card-radio-group';
import { FormField } from '@/components/form/form-field';
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import { PaymentOptionSchema } from '@/features/shop/checkout/schema';
import type { PaymentOption } from '@/features/shop/checkout/schema';

export default function CheckoutPayment(): JSX.Element {
    const { confirmStage, checkoutData, appendCheckoutData } = useCheckoutFlow();

    const form = useForm<PaymentOption>({
        resolver: zodResolver(PaymentOptionSchema),
        defaultValues: {
            payment_option: checkoutData.payment_option,
        },
    });

    const onSubmit: SubmitHandler<PaymentOption> = (values) => {
        appendCheckoutData(values);

        confirmStage('step-4', 'step-5');
    };

    return (
        <div>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet>
                    <FieldLegend>Choose a Payment Option</FieldLegend>

                    <FieldGroup>
                        <FormField
                            control={form.control}
                            name="payment_option"
                        >
                            {({ field }) => (
                                <>
                                    <FormCardRadioGroup
                                        field={field}
                                        variant="brand-primary"
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value="cod">
                                                    <div className="flex justify-between">
                                                        <span>Cash On Delivery</span>
                                                        <span>12,000.00 DZD</span>
                                                    </div>
                                                </Item>
                                            </>
                                        )}
                                    </FormCardRadioGroup>
                                </>
                            )}
                        </FormField>
                    </FieldGroup>
                </FieldSet>

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
