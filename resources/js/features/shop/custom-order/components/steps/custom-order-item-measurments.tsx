import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import ggggggg from '@/assets/custom-measurement-description.png';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormSlider } from '@/components/form/form-slider';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import Image from '@/components/image';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import {
    CustomMeasurmementsIllustration,
    StandardMeasurmementsIllustration,
} from '@/features/shop/custom-order/components/options/measurement-illustrations';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';
import type {
    CreateOrderItemMeasurements,
    CustomOrderItem,
    MeasurementsForm,
} from '@/features/shop/custom-order/schema';
import { MeasurementsFormSchema } from '@/features/shop/custom-order/schema';

function toMeasurementsShape(values: MeasurementsForm): CreateOrderItemMeasurements {
    if (values.measurement_type === 'standard') {
        return {
            measurement_type: 'standard',
            size: values.size,
            fitting_preference: values.fitting_preference,
        };
    }

    return {
        measurement_type: 'custom',
        shoulder: values.shoulder,
        waist: values.waist,
        chest: values.chest,
        height: values.height,
        fitting_preference: values.fitting_preference,
    };
}

function toFormDefaults(existing: CustomOrderItem['measurements']): MeasurementsForm {
    return {
        measurement_type: existing.measurement_type,
        fitting_preference: existing.fitting_preference,
        size: 'size' in existing ? existing.size : 'xs',
        shoulder: 'shoulder' in existing ? existing.shoulder : 20,
        waist: 'waist' in existing ? existing.waist : 20,
        chest: 'chest' in existing ? existing.chest : 20,
        height: 'height' in existing ? existing.height : 20,
    };
}

export default function CustomOrderItemMeasurements(): JSX.Element {
    const { setStep, orderItem, setOrderItemMeasurements, isEditing } = useCustomOrder();

    const form = useForm<MeasurementsForm>({
        resolver: zodResolver(MeasurementsFormSchema),
        defaultValues: toFormDefaults(orderItem.measurements),
    });

    const {
        formState: { isDirty },
    } = form;

    const measurementType = useWatch({ control: form.control, name: 'measurement_type' });
    const isCustom = measurementType === 'custom';

    const onSubmit: SubmitHandler<MeasurementsForm> = (values) => {
        setOrderItemMeasurements(toMeasurementsShape(values));

        setStep('step-4');
    };

    return (
        <div className="mt-7.5">
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldSet>
                    <FieldGroup className="gap-10.5">
                        <div className="flex justify-between gap-4">
                            <div className="flex shrink-0 flex-col gap-10.5">
                                <FormField
                                    control={form.control}
                                    name="measurement_type"
                                    className="gap-4"
                                >
                                    {({ field }) => (
                                        <>
                                            <FormField.Label className="text-base leading-none">
                                                How would you like to provide measurements?
                                            </FormField.Label>
                                            <FormToggleGroup
                                                type="single"
                                                spacing={6}
                                                field={field}
                                                variant="brand-co-measurment-type"
                                                size="brand-co-measurment-type"
                                            >
                                                {({ Item }) => (
                                                    <>
                                                        <div className="flex flex-col">
                                                            <Item value="standard">
                                                                <div className="flex flex-col items-center">
                                                                    <span className="text-base leading-none">
                                                                        Standard Size (Recommended)
                                                                    </span>
                                                                    <span className="mt-2 text-xs leading-none font-normal">
                                                                        Best for most customers.
                                                                    </span>

                                                                    <div className="mt-4">
                                                                        <StandardMeasurmementsIllustration />
                                                                    </div>
                                                                </div>
                                                            </Item>
                                                            <span className="mt-2.5 text-brand-neutral-alt-700">
                                                                Best for most customers.
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <Item value="custom">
                                                                <div className="flex flex-col items-center">
                                                                    <span className="text-base leading-none">
                                                                        Custom Measurements
                                                                    </span>
                                                                    <span className="mt-2 text-xs leading-none font-normal">
                                                                        Recommended for tailored results.
                                                                    </span>
                                                                    <div className="mt-4">
                                                                        <CustomMeasurmementsIllustration />
                                                                    </div>
                                                                </div>
                                                            </Item>
                                                            <span className="mt-2.5 text-brand-neutral-alt-700">
                                                                Recommended for tailored results.
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </FormToggleGroup>
                                            <FormField.Error />
                                        </>
                                    )}
                                </FormField>

                                {!isCustom && (
                                    <FormField
                                        control={form.control}
                                        name="size"
                                        className="max-w-161 gap-2"
                                    >
                                        {({ field }) => (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <FormField.Label className="text-base leading-none uppercase">
                                                        Size
                                                    </FormField.Label>

                                                    <Button
                                                        variant="link"
                                                        className="h-auto p-0 uppercase"
                                                        disabled
                                                    >
                                                        Size Chart
                                                    </Button>
                                                </div>

                                                <FormToggleGroup
                                                    type="single"
                                                    spacing={1}
                                                    field={field}
                                                    variant="brand-co-sizes"
                                                    size="brand-co-size-item"
                                                >
                                                    {({ Item }) => (
                                                        <>
                                                            <Item value="xs">XS</Item>
                                                            <Item value="s">S</Item>
                                                            <Item value="m">M</Item>
                                                            <Item value="l">L</Item>
                                                            <Item value="xl">XL</Item>
                                                        </>
                                                    )}
                                                </FormToggleGroup>
                                                <FormField.Error />
                                            </>
                                        )}
                                    </FormField>
                                )}

                                {isCustom && (
                                    <div className="flex max-w-162 flex-col gap-9">
                                        <div className="flex items-center gap-6">
                                            <FormField
                                                control={form.control}
                                                name="height"
                                            >
                                                <div className="flex items-baseline gap-4">
                                                    <FormField.Label className="font-normal">Height</FormField.Label>
                                                    <FormSlider.Value unit="cm" />
                                                </div>
                                                <FormSlider
                                                    min={1}
                                                    max={100}
                                                    step={2}
                                                    variant="brand-primary"
                                                />
                                                <FormField.Error />
                                            </FormField>

                                            <FormField
                                                control={form.control}
                                                name="shoulder"
                                            >
                                                <div className="flex items-baseline gap-4">
                                                    <FormField.Label className="font-normal">Shoulder</FormField.Label>
                                                    <FormSlider.Value unit="cm" />
                                                </div>
                                                <FormSlider
                                                    min={1}
                                                    max={100}
                                                    step={2}
                                                    variant="brand-primary"
                                                />
                                                <FormField.Error />
                                            </FormField>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <FormField
                                                control={form.control}
                                                name="chest"
                                            >
                                                <div className="flex items-baseline gap-4">
                                                    <FormField.Label className="font-normal">Chest</FormField.Label>
                                                    <FormSlider.Value unit="cm" />
                                                </div>
                                                <FormSlider
                                                    min={1}
                                                    max={100}
                                                    step={2}
                                                    variant="brand-primary"
                                                />
                                                <FormField.Error />
                                            </FormField>

                                            <FormField
                                                control={form.control}
                                                name="waist"
                                            >
                                                <div className="flex items-baseline gap-4">
                                                    <FormField.Label className="font-normal">Waist</FormField.Label>
                                                    <FormSlider.Value unit="cm" />
                                                </div>
                                                <FormSlider
                                                    min={1}
                                                    max={100}
                                                    step={2}
                                                    variant="brand-primary"
                                                />
                                                <FormField.Error />
                                            </FormField>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {isCustom && (
                                <div className="h-110 shrink-0 basis-95.5">
                                    <Image src={ggggggg} />
                                </div>
                            )}
                        </div>

                        <FormField
                            control={form.control}
                            name="fitting_preference"
                        >
                            <FormField.Label variant="brand-primary">Any Fitting Preference?</FormField.Label>
                            <FormTextarea variant="brand-primary" />
                            <FormField.Error />
                        </FormField>

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

                                    setStep('step-2');
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
                                {isEditing ? 'Confirm Changes' : 'Continue to review'}
                                <ArrowRightIcon strokeWidth={3} />
                            </FormButton>
                        </div>
                    </FieldGroup>
                </FieldSet>
            </Form>
        </div>
    );
}
