<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\ReorderProductVariantImagesRequestData;
use App\Models\ProductVariant;
use InvalidArgumentException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ReorderProductVariantImagesAction
{
    public function execute(ReorderProductVariantImagesRequestData $data, string $productId, string $variantId): void
    {
        $variant = ProductVariant::where('id', $variantId)
            ->where('product_id', $productId)
            ->firstOrFail();

        $variantMedia = $variant->getMedia('images');

        if ($variantMedia->isEmpty()) {
            throw new InvalidArgumentException("Variant ID {$variantId} doesn't have any images.");
        }

        if (\count($data->uuids) !== $variantMedia->count()) {
            throw new InvalidArgumentException('All image UUIDs must be provided for reordering.');
        }

        $orderedIds = collect($data->uuids)
            ->map(fn (string $uuid) => $variantMedia->firstWhere('uuid', $uuid)?->id)
            ->filter()
            ->values()
            ->toArray();

        Media::setNewOrder($orderedIds);
    }
}
