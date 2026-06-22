import type { Attribute, ProductVariant } from '@/features/dashboard/store/products/schema';

export function getAttributesUsedInVariants(
    attributes: Attribute[],
    variants: Pick<ProductVariant, 'attribute_value_ids'>[],
): Attribute[] {
    const usedValueIds = new Set(variants.flatMap((v) => v.attribute_value_ids));

    return attributes
        .map((attr) => ({
            ...attr,
            values: attr.values.filter((val) => usedValueIds.has(val.id)),
        }))
        .filter((attr) => attr.values.length > 0);
}
