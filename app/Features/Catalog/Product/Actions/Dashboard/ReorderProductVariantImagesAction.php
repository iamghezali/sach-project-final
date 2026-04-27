<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\ReorderProductVariantImagesRequestData;
use App\Models\ProductVariant;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ReorderProductVariantImagesAction
{
    public function execute(ReorderProductVariantImagesRequestData $data, string $productId, string $variantId): void
    {
        $variant = ProductVariant::where('id', $variantId)
            ->where('product_id', $productId)
            ->firstOrFail();

        $variantMedia = $variant->getMedia('images');

        $orderedIds = collect($data->uuids)
            ->map(fn (string $uuid) => $variantMedia->firstWhere('uuid', $uuid)?->id)
            ->filter()
            ->values()
            ->toArray();

        Media::setNewOrder($orderedIds);
    }
}
