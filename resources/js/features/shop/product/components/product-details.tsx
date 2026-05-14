import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import { useMemo, useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Form from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormToggleGroup } from '@/components/form/form-toggle-group';
import { default as ImageComponent } from '@/components/image';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { useGetProduct } from '@/features/shop/product/queries';
import { VariantSelectionSchema } from '@/features/shop/product/schema';
import type { Product, ProductVariant, Image, VariantSelection } from '@/features/shop/product/schema';

function findVariant(product: Product, selectedIds: number[]): ProductVariant | null {
    if (selectedIds.length !== product.attributes.length) {
        return null;
    }

    return (
        product.variants.find((v) => {
            if (v.attribute_value_ids.length !== selectedIds.length) {
                return false;
            }

            return selectedIds.every((id) => v.attribute_value_ids.includes(id));
        }) ?? null
    );
}

function getVisibleImages(images: Image[], selectedIds: number[]): Image[] {
    return images.filter(
        (image) =>
            image.attribute_value_ids.length === 0 || image.attribute_value_ids.every((id) => selectedIds.includes(id)),
    );
}

function buildDefaultAttributes(product: Product): Record<string, number> {
    const defaultVariant = product.variants.find((v) => v.is_default);

    if (!defaultVariant) {
        return {};
    }

    return product.attributes.reduce<Record<string, number>>((acc, attribute) => {
        const match = attribute.values.find((v) => defaultVariant.attribute_value_ids.includes(v.id));

        if (match) {
            acc[attribute.name] = match.id;
        }

        return acc;
    }, {});
}

function getFirstImageForValue(images: Image[], valueId: number): string | null {
    return images.find((img) => img.attribute_value_ids.includes(valueId))?.url ?? null;
}

function getAvailableValueIds(product: Product, selected: Record<string, number>): Set<number> {
    const available = new Set<number>();

    for (const attribute of product.attributes) {
        const otherSelectedIds = Object.entries(selected)
            .filter(([name]) => name !== attribute.name)
            .map(([, id]) => id)
            .filter(Boolean);

        for (const value of attribute.values) {
            const exists = product.variants.some(
                (v) =>
                    v.attribute_value_ids.includes(value.id) &&
                    otherSelectedIds.every((id) => v.attribute_value_ids.includes(id)),
            );

            if (exists) {
                available.add(value.id);
            }
        }
    }

    return available;
}

export default function ProductDetails(): JSX.Element {
    const { props } = usePage<{ slug: string }>();
    const { data: response, isLoading } = useGetProduct(props.slug);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    const form = useForm<VariantSelection>({
        defaultValues: { quantity: 1, attributes: {} },
        resolver: zodResolver(VariantSelectionSchema),
    });

    const attributes = useWatch({ control: form.control, name: 'attributes' });

    const selectedIds = useMemo(
        () =>
            Object.values(attributes ?? {})
                .filter(Boolean)
                .map(Number),
        [attributes],
    );

    useEffect(() => {
        if (!response) {
            return;
        }

        form.reset({
            quantity: 1,
            attributes: buildDefaultAttributes(response.data),
        });
    }, [response, form]);

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (!response) {
        return <></>;
    }

    const product = response.data;
    const selectedVariant = findVariant(product, selectedIds);
    const visibleImages = getVisibleImages(product.images, selectedIds);
    const availableValueIds = getAvailableValueIds(product, attributes ?? {});

    const colorAttribute = product.attributes.find((a) => a.name === 'Color');
    const sizeAttribute = product.attributes.find((a) => a.name === 'Size');
    const rest = product.attributes.filter((a) => a.name !== 'Color' && a.name !== 'Size');

    const slides = visibleImages.map((img) => ({ src: img.url }));
    const [mainImage, ...thumbnails] = visibleImages;

    const handleSubmit = (values: VariantSelection) => {
        console.log('values:', values);
        console.log('variant:', selectedVariant);
    };

    return (
        <div>
            <h1>{product.name}</h1>

            <div className="flex gap-8">
                {thumbnails.length > 0 && (
                    <div className="flex shrink-0 basis-[21%] flex-col gap-3">
                        {thumbnails.map((image, i) => (
                            <div
                                key={image.uuid}
                                className="relative cursor-pointer overflow-hidden rounded-lg pt-[120%]"
                                onClick={() => {
                                    setSlideIndex(i + 1);
                                    setLightboxOpen(true);
                                }}
                            >
                                <ImageComponent
                                    src={image.url}
                                    className="absolute inset-0 size-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {mainImage && (
                    <div
                        className="relative min-w-0 grow cursor-pointer overflow-hidden rounded-[1.75rem]"
                        onClick={() => {
                            setSlideIndex(0);
                            setLightboxOpen(true);
                        }}
                    >
                        <div className="relative pt-[120%]">
                            <ImageComponent
                                src={mainImage.url}
                                className="absolute inset-0 size-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>

            <Lightbox
                open={lightboxOpen}
                index={slideIndex}
                close={() => setLightboxOpen(false)}
                carousel={{ finite: true }}
                controller={{ closeOnPullUp: true, closeOnBackdropClick: true }}
                plugins={[Counter, Zoom]}
                slides={slides}
            />

            <Form
                form={form}
                onSubmit={handleSubmit}
            >
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
                            />
                            <FormField.Error />
                        </FormField>
                    </FieldGroup>
                </FieldSet>

                <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>

                <button type="submit">Add to cart</button>
            </Form>
        </div>
    );
}
