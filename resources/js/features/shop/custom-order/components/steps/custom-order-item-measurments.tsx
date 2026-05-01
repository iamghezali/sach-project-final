import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormSlider } from '@/components/form/form-slider';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
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
        <Form
            form={form}
            onSubmit={onSubmit}
        >
            <FieldSet>
                <FieldGroup>
                    <FormField
                        control={form.control}
                        name="measurement_type"
                    >
                        {({ field }) => (
                            <>
                                <FormField.Label>How would you like to provide measurements?</FormField.Label>
                                <FormToggleGroup
                                    type="single"
                                    spacing={3}
                                    field={field}
                                    variant="outline"
                                >
                                    {({ Item }) => (
                                        <>
                                            <Item value="standard">Standard</Item>
                                            <Item value="custom">Custom</Item>
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
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>Size</FormField.Label>
                                    <FormToggleGroup
                                        type="single"
                                        spacing={3}
                                        field={field}
                                        variant="outline"
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
                        <>
                            <FormField
                                control={form.control}
                                name="height"
                            >
                                <div className="flex justify-between">
                                    <FormField.Label>Height</FormField.Label>
                                    <FormSlider.Value unit="cm" />
                                </div>
                                <FormSlider
                                    min={1}
                                    max={100}
                                    step={2}
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="shoulder"
                            >
                                <div className="flex justify-between">
                                    <FormField.Label>Shoulder</FormField.Label>
                                    <FormSlider.Value unit="cm" />
                                </div>
                                <FormSlider
                                    min={1}
                                    max={100}
                                    step={2}
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="chest"
                            >
                                <div className="flex justify-between">
                                    <FormField.Label>Chest</FormField.Label>
                                    <FormSlider.Value unit="cm" />
                                </div>
                                <FormSlider
                                    min={1}
                                    max={100}
                                    step={2}
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="waist"
                            >
                                <div className="flex justify-between">
                                    <FormField.Label>Waist</FormField.Label>
                                    <FormSlider.Value unit="cm" />
                                </div>
                                <FormSlider
                                    min={1}
                                    max={100}
                                    step={2}
                                />
                                <FormField.Error />
                            </FormField>
                        </>
                    )}

                    <FormField
                        control={form.control}
                        name="fitting_preference"
                    >
                        <FormField.Label>Fitting Preference</FormField.Label>
                        <FormTextarea />
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

                                setStep('step-2');
                            }}
                        >
                            {isEditing ? 'Discard Changes' : 'Back'}
                        </Button>
                        <FormButton
                            control={form.control}
                            disabled={isEditing && !isDirty}
                        >
                            {isEditing ? 'Save' : 'Review your item'}
                        </FormButton>
                    </div>
                </FieldGroup>
            </FieldSet>
        </Form>
    );
}
