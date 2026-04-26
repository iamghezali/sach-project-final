<?php

namespace App\Features\Catalog\Product\Actions\Shop;

use App\Models\Product;

class ShowProductAction
{
    public function execute($slug)
    {
        $product = Product::published()
            ->where('slug', $slug)
            ->firstOrFail();

        $product->load(['activeVariants.attributeValues.attribute']);

        return $product;
    }
}
