<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\ChangeProductStatusRequestData;
use App\Features\Catalog\Product\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\Validation\ValidationException;

class ChangeProductStatusAction
{
    public function execute(string $productID, ChangeProductStatusRequestData $data)
    {
        $product = Product::findOrFail($productID);

        if ($data->status === ProductStatus::Published) {

            throw_if(
                $product->status === ProductStatus::Archived,
                fn () => ValidationException::withMessages([
                    'status' => ['Product is archived. Restore it to draft before publishing.'],
                ])
            );

            throw_if(
                $product->activeVariants()->doesntExist(),
                fn () => ValidationException::withMessages([
                    'status' => ['Product must have at least one active variant before it can be published.'],
                ])
            );
        }

        $product->update(['status' => $data->status]);

        return $product->fresh();
    }
}
