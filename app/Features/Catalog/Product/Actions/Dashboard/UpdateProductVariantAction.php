<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\UpdateProductVariantRequestData;
use App\Models\ProductVariant;

class UpdateProductVariantAction
{
    public function execute(UpdateProductVariantRequestData $data, string $productID, string $variantID)
    {
        $productVariant = ProductVariant::where('id', $variantID)
            ->where('product_id', $productID)
            ->firstOrFail();

        $productVariant->update($data->toArray());

        return $productVariant->fresh();
    }
}
