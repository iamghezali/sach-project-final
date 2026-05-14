import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { Product, ProductVariant, Image, VariantSelection } from '@/features/shop/product/schema';
import { VariantSelectionSchema } from '@/features/shop/product/schema';
import {
    buildDefaultAttributes,
    findVariant,
    getAvailableValueIds,
    getVisibleImages,
} from '@/features/shop/product/utils';

export interface UseVariantSelectionReturn {
    form: ReturnType<typeof useForm<VariantSelection>>;
    selectedIds: number[];
    selectedVariant: ProductVariant | null;
    visibleImages: Image[];
    availableValueIds: Set<number>;
}

export function useVariantSelection(product: Product): UseVariantSelectionReturn {
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
        form.reset({
            quantity: 1,
            attributes: buildDefaultAttributes(product),
        });
    }, [product, form]);

    const selectedVariant = findVariant(product, selectedIds);
    const visibleImages = getVisibleImages(product.images, selectedIds);
    const availableValueIds = getAvailableValueIds(product, attributes ?? {});

    return { form, selectedIds, selectedVariant, visibleImages, availableValueIds };
}
