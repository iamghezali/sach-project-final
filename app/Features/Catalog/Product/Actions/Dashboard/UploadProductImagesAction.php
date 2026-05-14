<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\UploadProductImagesRequestData;
use App\Models\Product;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UploadProductImagesAction
{
    /** @return Media[] */
    public function execute(UploadProductImagesRequestData $data, string $productId): array
    {
        $product = Product::findOrFail($productId);

        $uploaded = [];

        foreach ($data->images as $file) {
            $uploaded[] = $product
                ->addMedia($file)
                ->withCustomProperties([
                    'attribute_value_ids' => $data->attribute_value_ids,
                ])
                ->toMediaCollection('images');
        }

        return $uploaded;
    }
}
