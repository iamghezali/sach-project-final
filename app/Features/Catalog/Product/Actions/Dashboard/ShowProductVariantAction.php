<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\ProductVariant;

class ShowProductVariantAction
{
    public function execute(string $productID, string $variantID)
    {
        $productVariant = ProductVariant::where('id', $variantID)
            ->where('product_id', $productID)
            ->firstOrFail();

        return $productVariant;
    }
}
