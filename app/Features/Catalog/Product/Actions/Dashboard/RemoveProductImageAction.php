<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RemoveProductImageAction
{
    public function execute(string $productId, string $mediaUuid): void
    {
        $product = Product::findOrFail($productId);

        $media = $product->getMedia('images')->firstWhere('uuid', $mediaUuid);

        if (! $media) {
            throw new ModelNotFoundException;
        }

        $media->delete();
    }
}
