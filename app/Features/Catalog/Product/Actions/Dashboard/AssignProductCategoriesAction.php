<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\AssignProductCategoryRequestData;
use App\Models\Product;

class AssignProductCategoriesAction
{
    public function execute(AssignProductCategoryRequestData $data, string $productId): void
    {
        $product = Product::findOrFail($productId);
        $product->categories()->sync($data->category_ids);
    }
}
