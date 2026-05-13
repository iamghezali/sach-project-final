import { zodResolver } from '@hookform/resolvers/zod';
// import { router } from '@inertiajs/react';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import CustomOrderItemsList from '@/features/shop/custom-order/components/steps/custom-order-items-list';
// import { usePlaceClothingOrder } from '@/features/shop/custom-order/mutations';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';
import type { CreateCustomOrderFolder } from '@/features/shop/custom-order/schema';
import { CreateCustomOrderFolderSchema, CustomOrderSchema } from '@/features/shop/custom-order/schema';
// import { useSuccessMessage } from '@/hooks/use-success-message';

export default function CustomOrderFolder(): JSX.Element {
    const { setStep, customOrder, saveOrderTitle } = useCustomOrder();
    // const { mutateAsync: placeClothingOrder } = usePlaceClothingOrder();
    // const { setSuccessMessage } = useSuccessMessage();

    const form = useForm<CreateCustomOrderFolder>({
        defaultValues: {
            title: customOrder.title,
        },

        resolver: zodResolver(CreateCustomOrderFolderSchema),
    });

    const onSubmit: SubmitHandler<CreateCustomOrderFolder> = (values) => {
        saveOrderTitle(values.title);
        setStep('step-2');
    };

    const title = useWatch({ control: form.control, name: 'title' });
    const currentPayload = { ...customOrder, title };
    const isOrderValid = CustomOrderSchema.safeParse(currentPayload).success;

    const handleConfirmOrder: SubmitHandler<CreateCustomOrderFolder> = async () => {
        if (!isOrderValid) {
            console.error('Schema Validation Failed:');

            return;
        }

        console.log('Valid Custom Order Payload:', currentPayload);

        // await placeClothingOrder(currentPayload, {
        //     onSuccess: () => {
        //         setSuccessMessage();
        //         router.visit('/shop/orders/my?success', { replace: true });
        //     },

        //     onError: (error) => {
        //         form.setError('root', { message: error.message });
        //     },
        // });
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-[2.875rem] font-bold">Create a Custom Order</h1>

            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet>
                    <FieldGroup>
                        <FormField
                            control={form.control}
                            name="title"
                        >
                            <FormField.Label variant="brand-primary">Order Title</FormField.Label>
                            <FormInput variant="brand-primary" />
                            <FormField.Error />
                        </FormField>

                        <CustomOrderItemsList items={customOrder.items} />

                        <FormButton
                            control={form.control}
                            variant="brand-accent"
                            size="brand-vertical"
                            showSpinner={false}
                        >
                            <PlusIcon className="size-13.5 rounded-full bg-brand-primary-100 p-4 text-brand-primary-300" />
                            Add new item
                        </FormButton>
                    </FieldGroup>
                </FieldSet>
            </Form>

            {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

            <div className="flex justify-end">
                <FormButton
                    control={form.control}
                    disabled={!isOrderValid}
                    onClick={form.handleSubmit(handleConfirmOrder)}
                    variant="brand-primary"
                    size="brand-md"
                    className="w-60"
                >
                    Confirm Order
                    <ArrowRightIcon strokeWidth={3} />
                </FormButton>
            </div>
        </div>
    );
}
