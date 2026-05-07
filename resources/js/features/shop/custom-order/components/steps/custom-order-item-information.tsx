import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, ArrowRightIcon, BuildingIcon, ShirtIcon, SofaIcon, UserIcon, UsersIcon } from 'lucide-react';
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
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
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
        <div className="mt-7.5">
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet>
                    <FieldGroup className="gap-8">
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="item_is_for"
                                className="max-w-161 gap-4"
                            >
                                {({ field }) => (
                                    <>
                                        <FormField.Label className="text-base leading-none">
                                            1. What is this order for?
                                        </FormField.Label>

                                        <FormToggleGroup
                                            type="single"
                                            variant="brand-co-type"
                                            size="brand-co-item"
                                            spacing={6}
                                            field={field}
                                        >
                                            {({ Item }) => (
                                                <>
                                                    <Item value="individual">
                                                        <UserIcon strokeWidth={1.5} />
                                                        Individual
                                                    </Item>
                                                    <Item value="company">
                                                        <UsersIcon strokeWidth={1.5} />
                                                        Company
                                                    </Item>
                                                    <Item value="wholesale">
                                                        <BuildingIcon strokeWidth={1.5} />
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
                                className="max-w-119 gap-4"
                            >
                                {({ field }) => (
                                    <>
                                        <FormField.Label className="text-base leading-none">
                                            2. What would you like to create?
                                        </FormField.Label>
                                        <FormToggleGroup
                                            type="single"
                                            variant="brand-co-type"
                                            size="brand-co-item"
                                            spacing={3}
                                            field={field}
                                        >
                                            {({ Item }) => (
                                                <>
                                                    <Item value="clothing">
                                                        <ShirtIcon strokeWidth={1.5} />
                                                        Clothing
                                                    </Item>
                                                    <Item value="living_rooms">
                                                        <SofaIcon strokeWidth={1.5} />
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
                                className="max-w-119 gap-4"
                            >
                                {({ field }) => (
                                    <>
                                        <FormField.Label className="text-base leading-none">3. Gender</FormField.Label>

                                        <FormToggleGroup
                                            type="single"
                                            variant="brand-co-gender"
                                            size="brand-co-item"
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
                        </div>

                        <Separator className="seperator-gradient my-2.5 bg-brand-neutral-500" />

                        <FormField
                            control={form.control}
                            name="title"
                        >
                            <FormField.Label variant="brand-primary">Item Title</FormField.Label>
                            <FormInput variant="brand-primary" />
                            <FormField.Error />
                        </FormField>

                        <FormField
                            control={form.control}
                            name="looking_for"
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label variant="brand-primary">What are you looking for?</FormField.Label>
                                    <FormSelect
                                        placeholder="Select an option"
                                        field={field}
                                        variant="brand-primary"
                                        size="brand-primary"
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
                                    <FormField.Label variant="brand-primary">
                                        Will you provide the fabric?
                                    </FormField.Label>
                                    <FormSelect
                                        placeholder="Select an option"
                                        field={field}
                                        variant="brand-primary"
                                        size="brand-primary"
                                    >
                                        {({ Item }) => (
                                            <>
                                                <Item value={true}>Yes</Item>
                                                <Item value={false}>No - I want SASH to provide it</Item>
                                            </>
                                        )}
                                    </FormSelect>

                                    <FieldDescription>
                                        If SASH provides the fabric, an advance payment will be required before
                                        production starts.
                                    </FieldDescription>
                                </>
                            )}
                        </FormField>

                        <FormField
                            control={form.control}
                            name="description"
                        >
                            <FormField.Label variant="brand-primary">Short Description</FormField.Label>
                            <FormTextarea
                                className="min-h-55"
                                variant="brand-primary"
                            />
                        </FormField>

                        <div className="flex gap-4.5">
                            <FormField
                                control={form.control}
                                name="quantity"
                            >
                                <FormField.Label variant="brand-primary">Quantity</FormField.Label>
                                <FormInput
                                    type="number"
                                    min={1}
                                    variant="brand-primary"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="preferred_due_date"
                            >
                                <FormField.Label variant="brand-primary">Preferred Delivery Date</FormField.Label>
                                <FormInput
                                    type="date"
                                    min={minimumDueDateString()}
                                    variant="brand-primary"
                                />
                                <FormField.Error />
                            </FormField>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                variant="brand-neutral"
                                size="brand-md"
                                onClick={() => {
                                    if (isEditing) {
                                        setStep('step-4');

                                        return;
                                    }

                                    setStep('step-1');
                                }}
                            >
                                <ArrowLeftIcon strokeWidth={3} />
                                {isEditing ? 'Discard Changes' : 'Back'}
                            </Button>

                            <FormButton
                                control={form.control}
                                disabled={isEditing && !isDirty}
                                variant="brand-primary"
                                size="brand-md"
                            >
                                {isEditing ? 'Confirm Changes' : 'Continue to Measurments'}
                                <ArrowRightIcon strokeWidth={3} />
                            </FormButton>
                        </div>
                    </FieldGroup>
                </FieldSet>
            </Form>
        </div>
    );
}
