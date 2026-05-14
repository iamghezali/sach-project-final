import type { JSX } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import { default as ImageComponent } from '@/components/image';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import type { Product, ProductVariant, VariantSelection } from '@/features/shop/product/schema';
import { getFirstImageForValue } from '@/features/shop/product/utils';

interface ProductVariantFormProps {
    product: Product;
    form: UseFormReturn<VariantSelection>;
    availableValueIds: Set<number>;
    selectedVariant: ProductVariant | null;
    onSubmit: (values: VariantSelection) => void;
}

export function ProductVariantForm({
    product,
    form,
    availableValueIds,
    selectedVariant,
    onSubmit,
}: ProductVariantFormProps): JSX.Element {
    const colorAttribute = product.attributes.find((a) => a.name === 'Color');
    const sizeAttribute = product.attributes.find((a) => a.name === 'Size');
    const rest = product.attributes.filter((a) => a.name !== 'Color' && a.name !== 'Size');

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
        >
            <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>

            <FieldSet>
                <FieldGroup>
                    {colorAttribute && (
                        <FormField
                            name={`attributes.${colorAttribute.name}`}
                            control={form.control}
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>{colorAttribute.name}</FormField.Label>
                                    <FormToggleGroup
                                        type="single"
                                        variant="brand-colors-filter"
                                        spacing={2}
                                        size="brand-colors-filter"
                                        field={field}
                                    >
                                        {({ Item }) =>
                                            colorAttribute.values.map((value) => {
                                                const imageUrl = getFirstImageForValue(product.images, value.id);

                                                return (
                                                    <Item
                                                        key={value.id}
                                                        value={value.id}
                                                        disabled={!availableValueIds.has(value.id)}
                                                    >
                                                        <div className="w-30">
                                                            <div className="relative pt-[120%]">
                                                                <ImageComponent
                                                                    src={imageUrl ?? ''}
                                                                    className="absolute inset-0 size-full rounded-lg object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Item>
                                                );
                                            })
                                        }
                                    </FormToggleGroup>
                                    <FormField.Error />
                                </>
                            )}
                        </FormField>
                    )}

                    {sizeAttribute && (
                        <FormField
                            name={`attributes.${sizeAttribute.name}`}
                            control={form.control}
                        >
                            {({ field }) => (
                                <>
                                    <div className="flex items-center justify-between">
                                        <FormField.Label>{sizeAttribute.name}</FormField.Label>
                                    </div>
                                    <FormToggleGroup
                                        type="single"
                                        variant="brand-co-sizes"
                                        size="brand-co-size-item"
                                        spacing={1}
                                        field={field}
                                    >
                                        {({ Item }) =>
                                            sizeAttribute.values.map((value) => (
                                                <Item
                                                    key={value.id}
                                                    value={value.id}
                                                    disabled={!availableValueIds.has(value.id)}
                                                >
                                                    {value.value}
                                                </Item>
                                            ))
                                        }
                                    </FormToggleGroup>
                                    <FormField.Error />
                                </>
                            )}
                        </FormField>
                    )}

                    {rest.map((attribute) => (
                        <FormField
                            key={attribute.id}
                            name={`attributes.${attribute.name}`}
                            control={form.control}
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>{attribute.name}</FormField.Label>
                                    <FormToggleGroup
                                        type="single"
                                        field={field}
                                    >
                                        {({ Item }) =>
                                            attribute.values.map((value) => (
                                                <Item
                                                    key={value.id}
                                                    value={value.id}
                                                    disabled={!availableValueIds.has(value.id)}
                                                >
                                                    {value.value}
                                                </Item>
                                            ))
                                        }
                                    </FormToggleGroup>
                                    <FormField.Error />
                                </>
                            )}
                        </FormField>
                    ))}

                    <FormField
                        control={form.control}
                        name="quantity"
                    >
                        <FormField.Label>Quantity</FormField.Label>
                        <FormInput
                            type="number"
                            min={1}
                            variant="brand-primary"
                        />
                        <FormField.Error />
                    </FormField>
                </FieldGroup>
            </FieldSet>

            <button type="submit">Add to cart</button>
        </Form>
    );
}
