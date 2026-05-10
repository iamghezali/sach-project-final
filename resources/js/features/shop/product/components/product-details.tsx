import { router, usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { useCart } from '@/features/shop/cart/hooks/use-cart';
import type { CartItem } from '@/features/shop/cart/hooks/use-cart';
import { useSelectVariant } from '@/features/shop/product/hooks/use-select-variant';
import { useGetProduct } from '@/features/shop/product/queries';
import type { Attribute, VariantSelection } from '@/features/shop/product/schema';
import { formatPrice } from '@/lib/format-price';

const ATTRIBUTE_ORDER = ['Color', 'Size'];

function getSortedAttributes(attributes: Attribute[]): Attribute[] {
    return [...attributes].sort((a, b) => {
        const rankA = ATTRIBUTE_ORDER.indexOf(a.name);
        const rankB = ATTRIBUTE_ORDER.indexOf(b.name);

        return (rankA === -1 ? Infinity : rankA) - (rankB === -1 ? Infinity : rankB);
    });
}

export default function ProductDetails(): JSX.Element {
    const { props } = usePage<{ slug: string }>();
    const { data: response, isLoading } = useGetProduct(props.slug);
    const { form, selectedVariant, isComplete } = useSelectVariant(response?.data);
    const { addOrUpdateCartItem } = useCart();

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (!response) {
        return <></>;
    }

    const product = response.data;
    const sortedAttributes = getSortedAttributes(product.attributes);

    const handleAddToCart: SubmitHandler<VariantSelection> = (values) => {
        const selectedItem: CartItem = {
            product: product,
            variant: selectedVariant,
            quantity: values.quantity,
        };

        addOrUpdateCartItem(selectedItem);
    };

    return (
        <>
            <ul>
                <li>{product.name}</li>
                <li>{product.description}</li>

                {selectedVariant ? (
                    <>
                        <li>{selectedVariant.is_in_stock ? 'In Stock' : 'Out of Stock'}</li>
                        <li>{formatPrice(selectedVariant.price)} DZD</li>

                        <ul className="flex">
                            {selectedVariant.images.map((_, i) => (
                                <li
                                    key={i}
                                    className="rounded-2xl border p-2"
                                >
                                    <img
                                        src={_.url}
                                        alt=""
                                        className="size-60"
                                    />
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <li>Select options</li>
                )}
            </ul>

            <Form
                form={form}
                onSubmit={handleAddToCart}
            >
                <FieldSet>
                    <FieldGroup>
                        {sortedAttributes.map((attribute) => {
                            if (attribute.name === 'Color') {
                                return (
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
                                                    variant="brand-colors-filter"
                                                    spacing={2}
                                                    field={field}
                                                >
                                                    {({ Item }) => (
                                                        <>
                                                            {attribute.values.map((value) => (
                                                                <Item
                                                                    key={value.id}
                                                                    value={value.id}
                                                                >
                                                                    {value.value}
                                                                </Item>
                                                            ))}
                                                        </>
                                                    )}
                                                </FormToggleGroup>
                                                <FormField.Error />
                                            </>
                                        )}
                                    </FormField>
                                );
                            }

                            if (attribute.name === 'Size') {
                                return (
                                    <FormField
                                        key={attribute.id}
                                        name={`attributes.${attribute.name}`}
                                        control={form.control}
                                    >
                                        {({ field }) => (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <FormField.Label className="text-base leading-none uppercase">
                                                        {attribute.name}
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
                                                    variant="brand-co-sizes"
                                                    size="brand-co-size-item"
                                                    spacing={1}
                                                    field={field}
                                                >
                                                    {({ Item }) => (
                                                        <>
                                                            {attribute.values.map((value) => (
                                                                <Item
                                                                    key={value.id}
                                                                    value={value.id}
                                                                >
                                                                    {value.value}
                                                                </Item>
                                                            ))}
                                                        </>
                                                    )}
                                                </FormToggleGroup>
                                                <FormField.Error />
                                            </>
                                        )}
                                    </FormField>
                                );
                            }
                        })}

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

                {isComplete && !selectedVariant && <p className="text-red-500">Selected combination doesn't exist.</p>}

                {selectedVariant && !selectedVariant.is_in_stock && (
                    <p className="text-red-500">Selected combination is out of stock.</p>
                )}

                <FormButton
                    control={form.control}
                    disabled={!isComplete || !selectedVariant?.is_in_stock}
                    variant="brand-neutral"
                    size="brand-lg"
                >
                    Add to cart
                </FormButton>

                <Button
                    disabled={!isComplete || !selectedVariant?.is_in_stock}
                    onClick={() => {
                        form.handleSubmit(handleAddToCart);
                        router.visit('/shop/checkout/');
                    }}
                    variant="brand-secondary"
                    size="brand-lg"
                >
                    Buy it Now
                </Button>
            </Form>
        </>
    );
}
