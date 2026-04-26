<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\ChangeProductStatusRequestData;
use App\Models\Product;

class ChangeProductStatusAction
{
    public function execute(string $productID, ChangeProductStatusRequestData $data)
    {
        $product = Product::findOrFail($productID);
        $product->update(['status' => $data->status]);

        return $product->fresh();
    }
}
