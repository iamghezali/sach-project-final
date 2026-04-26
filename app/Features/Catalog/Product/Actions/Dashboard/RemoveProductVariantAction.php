<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\ProductVariant;

class RemoveProductVariantAction
{
    public function execute(string $productID, string $variantID)
    {
        $productVariant = ProductVariant::where('id', $variantID)
            ->where('product_id', $productID)
            ->firstOrFail();

        $productVariant->delete();
    }
}
