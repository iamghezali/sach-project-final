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

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (!response) {
        return <></>;
    }

    const product = response.data;
    const sortedAttributes = getSortedAttributes(product.attributes);

    const handleAddToCart: SubmitHandler<VariantSelection> = () => {
        console.log(selectedVariant);
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
                                        className="size-12"
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
                        {sortedAttributes.map((attribute) => (
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
                                            variant="outline"
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
                        ))}

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
                    </FieldGroup>
                </FieldSet>

                {isComplete && !selectedVariant && <p className="text-red-500">Selected combination doesn't exist.</p>}

                {selectedVariant && !selectedVariant.is_in_stock && (
                    <p className="text-red-500">Selected combination is out of stock.</p>
                )}

                <FormButton
                    control={form.control}
                    disabled={!isComplete || !selectedVariant?.is_in_stock}
                >
                    Add to cart
                </FormButton>

                <Button
                    disabled={!isComplete || !selectedVariant?.is_in_stock}
                    onClick={() => {
                        form.handleSubmit(handleAddToCart);
                        router.visit('/shop/checkout/');
                    }}
                >
                    Buy it Now
                </Button>
            </Form>
        </>
    );
}
