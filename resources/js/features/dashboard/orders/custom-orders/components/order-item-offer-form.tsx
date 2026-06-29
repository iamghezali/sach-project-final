import { Link } from '@inertiajs/react';
import { ArrowRightIcon, CircleIcon, SaveIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';

type OrderItemOfferFormProps = {
    orderID: number;
    orderItemID: number;
};

export default function OrderItemOfferForm({ orderID, orderItemID }: OrderItemOfferFormProps): JSX.Element {
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

    const { isDirty } = form.formState;

    return (
        <>
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
                            <FormField.Label>Set delivery due date</FormField.Label>
                            <FormInput
                                variant="brand-primary"
                                placeholder="Client Deadline"
                                type="date"
                                min={0}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="mt-4 ml-auto flex gap-1">
                    {isDirty && (
                        <FormButton
                            control={form.control}
                            variant="brand-neutral"
                            size="brand-md"
                        >
                            Save <SaveIcon />
                        </FormButton>
                    )}

                    <Button
                        variant="brand-secondary"
                        size="brand-md"
                        className="font-medium text-black hover:text-white"
                        asChild
                    >
                        <Link href={`/dashboard/custom-orders/${orderID}/item/${orderItemID}/assign`}>
                            Assign a Tailor <ArrowRightIcon />
                        </Link>
                    </Button>
                </div>
            </Form>

            <OfferDisplay />
        </>
    );
}

const OfferDisplay = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-lg font-medium">
                    <CircleIcon
                        strokeWidth={0}
                        className="fill-amber-300"
                    />
                    Assignement sent to [name].
                </span>

                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        size="brand-md"
                    >
                        Edit Offer
                    </Button>
                    <Button
                        variant="ghost"
                        size="brand-md"
                    >
                        Change Assignee
                    </Button>
                </div>
            </div>

            <div className="mt-7">
                <div className="flex items-center justify-between text-base">
                    <ul className="space-y-1">
                        <li>
                            <span className="text-brand-neutral-alt-700">Tailor Price: </span>
                            <span className="font-medium">00.00 DZD</span>
                        </li>

                        <li>
                            <span className="text-brand-neutral-alt-700">Deadline: </span>
                            <span>26/03/2026</span>
                        </li>
                    </ul>

                    <ul className="ml-auto space-y-1">
                        <li>
                            <span className="text-brand-neutral-alt-700">Client Price: </span>
                            <span className="font-medium">00.00 DZD</span>
                        </li>

                        <li>
                            <span className="text-brand-neutral-alt-700">Delivery due date: </span>
                            <span>26/03/2026</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
