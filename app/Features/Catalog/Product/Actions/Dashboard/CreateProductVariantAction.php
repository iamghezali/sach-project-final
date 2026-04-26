<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\StoreProductVariantRequestData;
use App\Models\AttributeValue;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class CreateProductVariantAction
{
    public function execute(StoreProductVariantRequestData $data, string $productID)
    {
        $product = Product::findOrFail($productID);

        $this->ensureUniqueAttributeAxis($data->attribute_value_ids);
        $this->ensureNoDuplicateCombination($product, $data->attribute_value_ids);
        $this->ensureValuesMatchProductAttributes($product, $data->attribute_value_ids);

        $productVariant = DB::transaction(function () use ($data, $product) {
            $variant = $product->variants()->create([
                'sku' => $data->sku,
                'price' => $data->price,
                'stock_quantity' => $data->stock_quantity,
                'is_active' => $data->is_active,
            ]);

            $variant->attributeValues()->sync($data->attribute_value_ids);

            return $variant->load('attributeValues.attribute');
        });

        return $productVariant;
    }

    // Rule 1 + 2: Each attribute_value_id must be unique, and no two values
    // may belong to the same attribute (one axis = one value).
    private function ensureUniqueAttributeAxis(array $ids): void
    {
        if (\count($ids) !== count(array_unique($ids))) {
            throw new InvalidArgumentException(
                'Duplicate attribute value IDs are not allowed.'
            );
        }

        $duplicateAxis = AttributeValue::whereIn('id', $ids)
            ->select('id', 'attribute_id')
            ->get()
            ->groupBy('attribute_id')
            ->first(fn ($group) => $group->count() > 1);

        if ($duplicateAxis) {
            throw new InvalidArgumentException(
                'Each attribute may only have one value per variant.'
            );
        }
    }

    // Rule 3: The exact same set of attribute values must not already exist
    // on another variant of this product.
    private function ensureNoDuplicateCombination(Product $product, array $ids): void
    {
        $sortedNew = collect($ids)->map(fn ($id) => (string) $id)->sort()->values();

        $exists = $product->variants()
            ->whereHas('attributeValues', fn ($q) => $q->whereIn('attribute_value_id', $ids))
            ->with('attributeValues:id')
            ->get()
            ->contains(function ($variant) use ($sortedNew) {
                $sortedExisting = $variant->attributeValues
                    ->pluck('id')
                    ->map(fn ($id) => (string) $id)
                    ->sort()
                    ->values();

                return $sortedNew->toArray() === $sortedExisting->toArray();
            });

        if ($exists) {
            throw new InvalidArgumentException(
                'A variant with this exact attribute combination already exists.'
            );
        }
    }

    private function ensureValuesMatchProductAttributes(Product $product, array $ids): void
    {
        $allowedAttributeIds = $product->attributes()->pluck('attributes.id');

        $invalid = AttributeValue::whereIn('id', $ids)
            ->whereNotIn('attribute_id', $allowedAttributeIds)
            ->exists();

        if ($invalid) {
            throw new InvalidArgumentException(
                'All attribute values must belong to attributes assigned to this product.'
            );
        }

        $provided = AttributeValue::whereIn('id', $ids)
            ->pluck('attribute_id')->sort()->values();

        $expected = $allowedAttributeIds->sort()->values();

        if ($provided->toArray() !== $expected->toArray()) {
            throw new InvalidArgumentException(
                'Variant must have exactly one value for each product attribute.'
            );
        }
    }
}
