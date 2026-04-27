<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RemoveProductVariantImageAction
{
    public function execute(string $productId, string $variantId, string $mediaUuid): void
    {
        $variant = ProductVariant::where('id', $variantId)
            ->where('product_id', $productId)
            ->firstOrFail();

        $media = $variant->getMedia('images')->firstWhere('uuid', $mediaUuid);

        if (! $media) {
            throw new ModelNotFoundException;
        }

        $media->delete();
    }
}
