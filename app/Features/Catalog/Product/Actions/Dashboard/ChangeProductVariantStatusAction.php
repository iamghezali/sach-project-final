<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\ChangeProductVariantStatusRequestData;
use App\Models\ProductVariant;

class ChangeProductVariantStatusAction
{
    public function execute(string $productID, string $variantID, ChangeProductVariantStatusRequestData $data)
    {
        $productVariant = ProductVariant::where('id', $variantID)
            ->where('product_id', $productID)
            ->firstOrFail();

        $productVariant->update(['is_active' => $data->status]);

        return $productVariant->fresh();
    }
}
