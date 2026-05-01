import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormSelect } from '@/components/form/form-select';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';
import type { CreateOrderItemInformation } from '@/features/shop/custom-order/schema';
import { CreateOrderItemInformationSchema, minimumDueDateString } from '@/features/shop/custom-order/schema';

export default function CustomOrderItemInformation(): JSX.Element {
    const { setStep, orderItem, setOrderItemInformation, isEditing } = useCustomOrder();

    const form = useForm<CreateOrderItemInformation>({
        defaultValues: orderItem.information,
        resolver: zodResolver(CreateOrderItemInformationSchema),
    });

    const {
        formState: { isDirty },
    } = form;

    const onSubmit: SubmitHandler<CreateOrderItemInformation> = (values) => {
        setOrderItemInformation(values);

        if (isEditing) {
            setStep('step-4');

            return;
        }

        setStep('step-3');
    };

    return (
        <>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet>
                    <FieldGroup>
                        <FormField
                            control={form.control}
                            name="item_is_for"
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>What is this order for?</FormField.Label>

                                    <FormToggleGroup
                                        type="single"
                                        variant="outline"
                                        spacing={3}
                                        field={field}
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value="individual">Individual</Item>
                                                <Item
                                                    value="company"
                                                    disabled
                                                >
                                                    Company
                                                </Item>
                                                <Item
                                                    value="wholesale"
                                                    disabled
                                                >
                                                    Wholesale
                                                </Item>
                                            </>
                                        )}
                                    </FormToggleGroup>
                                    <FormField.Error />
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="item_type"
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>What would you like to create?</FormField.Label>
                                    <FormToggleGroup
                                        type="single"
                                        variant="outline"
                                        spacing={3}
                                        field={field}
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value="clothing">Clothing</Item>
                                                <Item
                                                    value="living_rooms"
                                                    disabled
                                                >
                                                    Living Rooms
                                                </Item>
                                            </>
                                        )}
                                    </FormToggleGroup>
                                    <FormField.Error />
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="item_for_gender"
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>Gender</FormField.Label>

                                    <FormToggleGroup
                                        type="single"
                                        variant="outline"
                                        spacing={3}
                                        field={field}
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value="female">Female</Item>
                                                <Item
                                                    value="male"
                                                    disabled
                                                >
                                                    Male
                                                </Item>
                                            </>
                                        )}
                                    </FormToggleGroup>
                                    <FormField.Error />
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="title"
                        >
                            <FormField.Label>Item Title</FormField.Label>
                            <FormInput />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="looking_for"
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>What are you looking for?</FormField.Label>
                                    <FormSelect
                                        placeholder="Select an option"
                                        field={field}
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value="abbaya">Abbaya</Item>
                                                <Item value="hidjab">Hidjab</Item>
                                                <Item value="shirt">Shirt</Item>
                                            </>
                                        )}
                                    </FormSelect>
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="provide_fabric"
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>What are you looking for?</FormField.Label>
                                    <FormSelect
                                        placeholder="Select an option"
                                        field={field}
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value={true}>Yes</Item>
                                                <Item value={false}>No - I want SASH to provide it</Item>
                                            </>
                                        )}
                                    </FormSelect>
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="description"
                        >
                            <FormField.Label>Short Description</FormField.Label>
                            <FormTextarea className="min-h-24" />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="quantity"
                        >
                            <FormField.Label>Quantity</FormField.Label>
                            <FormInput
                                type="number"
                                min={1}
                            />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="preferred_due_date"
                        >
                            <FormField.Label>Preferred Delivery Date</FormField.Label>
                            <FormInput
                                type="date"
                                min={minimumDueDateString()}
                            />
                            <FormField.Error />
                        </FormField>

                        <div>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    if (isEditing) {
                                        setStep('step-4');

                                        return;
                                    }

                                    setStep('step-1');
                                }}
                            >
                                {isEditing ? 'Discard Changes' : 'Back'}
                            </Button>

                            <FormButton
                                control={form.control}
                                disabled={isEditing && !isDirty}
                            >
                                {isEditing ? 'Save' : 'Go to Measurments'}
                            </FormButton>
                        </div>
                    </FieldGroup>
                </FieldSet>
            </Form>
        </>
    );
}
