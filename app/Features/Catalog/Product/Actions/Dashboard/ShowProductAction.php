<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\Product;

class ShowProductAction
{
    public function execute(string $productID)
    {
        $product = Product::findOrFail($productID);
        $product->load(['variants.attributeValues.attribute']);

        return $product;
    }
}
