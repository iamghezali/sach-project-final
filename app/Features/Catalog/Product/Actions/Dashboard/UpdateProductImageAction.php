<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\UpdateProductImageRequestData;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UpdateProductImageAction
{
    public function execute(UpdateProductImageRequestData $data, string $productId, string $mediaUuid): Media
    {
        $product = Product::findOrFail($productId);

        $media = $product->getMedia('images')->firstWhere('uuid', $mediaUuid);

        if (! $media) {
            throw new ModelNotFoundException;
        }

        $media->setCustomProperty('attribute_value_ids', $data->attribute_value_ids);
        $media->save();

        return $media;
    }
}
