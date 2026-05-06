import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormCardRadioGroup } from '@/components/form/form-card-radio-group';
import { FormField } from '@/components/form/form-field';
import { FormTextarea } from '@/components/form/form-textarea';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { useCheckoutFlow } from '@/features/shop/checkout/components/checkout-flow/checkout-context';
import DeliveryOptionItem from '@/features/shop/checkout/options/delivery-option-item';
import type { DeliveryOption } from '@/features/shop/checkout/schema';
import { DeliveryOptionSchema } from '@/features/shop/checkout/schema';

export default function CheckoutDeliveryMode(): JSX.Element {
    const { confirmStage, checkoutData, appendCheckoutData } = useCheckoutFlow();

    const form = useForm<DeliveryOption>({
        resolver: zodResolver(DeliveryOptionSchema),
        defaultValues: {
            delivery_option: checkoutData.delivery_option,
            notes: checkoutData.notes,
        },
    });

    const onSubmit: SubmitHandler<DeliveryOption> = (values) => {
        appendCheckoutData(values);

        confirmStage('step-3', 'step-4');
    };

    return (
        <div>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet className="gap-6">
                    <span className="block text-xl font-medium">Choose a Delivery</span>

                    <FieldGroup>
                        <FormField
                            control={form.control}
                            name="delivery_option"
                        >
                            {({ field }) => (
                                <>
                                    <FormCardRadioGroup
                                        field={field}
                                        variant="brand-primary"
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value="yalidine">
                                                    <DeliveryOptionItem price={800} />
                                                </Item>
                                            </>
                                        )}
                                    </FormCardRadioGroup>
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="notes"
                        >
                            <FormTextarea
                                placeholder="Message"
                                variant="brand-primary"
                            />
                            <FormField.Error />
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
