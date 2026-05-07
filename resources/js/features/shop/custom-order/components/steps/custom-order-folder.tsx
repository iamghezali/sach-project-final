import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import CustomOrderItemsList from '@/features/shop/custom-order/components/steps/custom-order-items-list';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';
import type { CreateCustomOrderFolder } from '@/features/shop/custom-order/schema';
import { CreateCustomOrderFolderSchema, CustomOrderSchema } from '@/features/shop/custom-order/schema';

export default function CustomOrderFolder(): JSX.Element {
    const { setStep, customOrder, saveOrderTitle } = useCustomOrder();

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

    const handleConfirmOrder: SubmitHandler<CreateCustomOrderFolder> = () => {
        if (!isOrderValid) {
            return;
        }

        console.log(currentPayload);
    };

    return (
        <div>
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
                        >
                            <PlusIcon className="size-13.5 rounded-full bg-brand-primary-100 p-4 text-brand-primary-300" />
                            Add new item
                        </FormButton>
                    </FieldGroup>
                </FieldSet>
            </Form>

            <div>
                <Button
                    disabled={!isOrderValid}
                    onClick={form.handleSubmit(handleConfirmOrder)}
                    variant="brand-primary"
                    size="brand-md"
                >
                    Confirm Order
                </Button>
            </div>
        </div>
    );
}
