import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';

type OrderItemOfferFormProps = {
    orderID: number;
    orderItemID: number;
};

export default function OrderItemOfferForm({ orderID, orderItemID }: OrderItemOfferFormProps): JSX.Element {
    console.log(orderID, orderItemID);

    const form = useForm<{
        tailor_price: number;
        tailor_due_date: string;

        client_offer_price: number;
        client_offer_due_date: string;
    }>({
        defaultValues: {
            tailor_price: 0,
            tailor_due_date: '',

            client_offer_price: 0,
            client_offer_due_date: '',
        },
    });

    const onSubmit: SubmitHandler<{
        tailor_price: number;
        tailor_due_date: string;

        client_offer_price: number;
        client_offer_due_date: string;
    }> = (values) => console.log(values);

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
            className="flex flex-col"
        >
            <div className="flex gap-10">
                <div className="flex flex-1 flex-col gap-3">
                    <h3>Tailor Offer</h3>

                    <FormField
                        control={form.control}
                        name="tailor_price"
                    >
                        <FormInput
                            variant="brand-primary"
                            placeholder="Tailor Price"
                            type="number"
                            min={0}
                        />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="tailor_due_date"
                    >
                        <FormField.Label>Set a deadline</FormField.Label>

                        <FormInput
                            variant="brand-primary"
                            placeholder="Tailor Deadline"
                            type="date"
                            min={0}
                        />
                    </FormField>
                </div>

                <div className="flex flex-1 flex-col gap-3">
                    <h3>Client Offer</h3>

                    <FormField
                        control={form.control}
                        name="client_offer_price"
                    >
                        <FormInput
                            variant="brand-primary"
                            placeholder="Client Price"
                            type="number"
                            min={0}
                        />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="client_offer_due_date"
                    >
                        <FormField.Label>Set an offered delivery time</FormField.Label>
                        <FormInput
                            variant="brand-primary"
                            placeholder="Client Deadline"
                            type="date"
                            min={0}
                        />
                    </FormField>
                </div>
            </div>

            <FormButton
                control={form.control}
                variant="brand-secondary"
                size="brand-md"
                className="mt-4 ml-auto font-medium text-black hover:text-white"
            >
                Assign a Tailor <ArrowRightIcon />
            </FormButton>
        </Form>
    );
}
