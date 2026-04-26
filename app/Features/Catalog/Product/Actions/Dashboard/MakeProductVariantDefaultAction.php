<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\ProductVariant;

class MakeProductVariantDefaultAction
{
    public function execute(string $productID, string $variantID)
    {
        $productVariant = ProductVariant::where('id', $variantID)
            ->where('product_id', $productID)
            ->firstOrFail();

        $productVariant->update(['is_default' => true]);

        return $productVariant->fresh();
    }
}
