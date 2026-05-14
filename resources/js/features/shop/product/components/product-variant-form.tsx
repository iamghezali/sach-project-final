import { router } from '@inertiajs/react';
import type { JSX } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import { default as ImageComponent } from '@/components/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import type { Product, ProductVariant, VariantSelection } from '@/features/shop/product/schema';
import { getFirstImageForValue } from '@/features/shop/product/utils';
import { formatPrice } from '@/lib/format-price';

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
            <div>
                <div>
                    <span className="inline-flex h-9.5 items-center rounded-xl bg-brand-secondary-300 px-4 text-xs font-medium text-white">
                        New Release
                    </span>

                    <h1 className="mt-4 text-[2rem]/tight font-semibold">{product.name}</h1>
                    <span className="mt-4 block text-2xl/tight leading-6 font-semibold text-brand-secondary-300">
                        {formatPrice(selectedVariant?.price ?? '0')} DZD
                    </span>
                    <span className="mt-2 block text-xs leading-4.5">Shipping calculated at checkout.</span>
                </div>

                <p>SKU: {selectedVariant?.sku}</p>

                <p>
                    <Badge variant={selectedVariant?.is_in_stock ? 'secondary' : 'destructive'}>
                        {selectedVariant?.is_in_stock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                </p>
            </div>

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

            <div className="mt-2 flex flex-col gap-1">
                <FormButton
                    control={form.control}
                    disabled={!selectedVariant?.is_in_stock}
                    variant="brand-neutral"
                    size="brand-lg"
                >
                    Add to cart
                </FormButton>

                <Button
                    type="button"
                    disabled={!selectedVariant?.is_in_stock}
                    onClick={form.handleSubmit((values) => {
                        onSubmit(values);
                        router.visit('/shop/checkout/');
                    })}
                    variant="brand-secondary"
                    size="brand-lg"
                >
                    Buy it Now
                </Button>
            </div>
        </Form>
    );
}
