import type { Image, Product, ProductVariant } from '@/features/shop/product/schema';

export function findVariant(product: Product, selectedIds: number[]): ProductVariant | null {
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

export function getVisibleImages(images: Image[], selectedIds: number[]): Image[] {
    return images.filter(
        (image) =>
            image.attribute_value_ids.length === 0 || image.attribute_value_ids.every((id) => selectedIds.includes(id)),
    );
}

export function buildDefaultAttributes(product: Product): Record<string, number> {
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

export function getFirstImageForValue(images: Image[], valueId: number): string | null {
    return images.find((img) => img.attribute_value_ids.includes(valueId))?.url ?? null;
}

export function getAvailableValueIds(product: Product, selected: Record<string, number>): Set<number> {
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
