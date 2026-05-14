<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\ReorderProductImagesRequestData;
use App\Models\Product;
use InvalidArgumentException;

class ReorderProductImagesAction
{
    public function execute(ReorderProductImagesRequestData $data, string $productId): void
    {
        $product = Product::findOrFail($productId);

        $mediaItems = $product->getMedia('images');

        foreach ($data->uuids as $position => $uuid) {
            $media = $mediaItems->firstWhere('uuid', $uuid);

            if (! $media) {
                throw new InvalidArgumentException("Media UUID {$uuid} not found.");
            }

            $media->order_column = $position + 1;
            $media->save();
        }
    }
}
