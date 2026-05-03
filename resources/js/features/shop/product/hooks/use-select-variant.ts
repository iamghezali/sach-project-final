import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { VariantSelectionSchema } from '@/features/shop/product/schema';
import type { Product, ProductVariant, VariantSelection } from '@/features/shop/product/schema';

function buildDefaultAttributes(product: Product): Record<string, number | undefined> {
    const defaultVariant = product.variants.find((v) => v.is_default);

    if (!defaultVariant) {
        return {};
    }

    return product.attributes.reduce<Record<string, number | undefined>>((acc, attribute) => {
        const matchedValue = attribute.values.find((v) => defaultVariant.attribute_value_ids.includes(v.id));

        acc[attribute.name] = matchedValue?.id;

        return acc;
    }, {});
}

export function useSelectVariant(product: Product | undefined) {
    const form = useForm<VariantSelection>({
        defaultValues: {
            quantity: 1,
            attributes: {},
        },
        resolver: zodResolver(VariantSelectionSchema),
    });

    useEffect(() => {
        if (!product) {
            return;
        }

        form.reset({
            quantity: 1,
            attributes: buildDefaultAttributes(product),
        });
    }, [product, form]);

    const attributes = useWatch({ control: form.control, name: 'attributes' });

    const selectedIds = useMemo(
        () =>
            Object.values(attributes ?? {})
                .filter(Boolean)
                .map(Number),
        [attributes],
    );

    const selectedVariant = useMemo((): ProductVariant | null => {
        if (!product || !selectedIds.length) {
            return null;
        }

        return (
            product.variants.find((variant) => {
                if (variant.attribute_value_ids.length !== selectedIds.length) {
                    return false;
                }

                return selectedIds.every((id) => variant.attribute_value_ids.includes(id));
            }) ?? null
        );
    }, [product, selectedIds]);

    const isComplete = selectedIds.length === (product?.attributes.length ?? 0);

    return { form, selectedVariant, isComplete };
}
