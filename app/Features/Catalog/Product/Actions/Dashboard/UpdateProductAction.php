<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\UpdateProductRequestData;
use App\Models\Product;

class UpdateProductAction
{
    public function execute(UpdateProductRequestData $data, string $productID)
    {
        $product = Product::findOrFail($productID);
        $product->update($data->toArray());

        return $product->fresh();
    }
}
