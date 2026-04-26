<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\AssignProductAttributeRequestData;
use App\Models\AttributeValue;
use App\Models\Product;
use InvalidArgumentException;

class AssignProductAttributeAction
{
    public function execute(AssignProductAttributeRequestData $data, string $productId): void
    {
        $product = Product::findOrFail($productId);

        $current = $product->attributes()->pluck('attributes.id');
        $removed = $current->diff($data->attribute_ids);

        if ($removed->isNotEmpty()) {
            $inUse = AttributeValue::whereIn('attribute_id', $removed)
                ->whereHas('productVariants', fn ($q) => $q->where('product_id', $product->id)->whereNull('deleted_at')
                )
                ->exists();

            if ($inUse) {
                throw new InvalidArgumentException(
                    'Cannot remove an attribute that is in use by existing variants.'
                );
            }
        }

        $product->attributes()->sync($data->attribute_ids);
    }
}
