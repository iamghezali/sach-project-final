<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Features\Catalog\Product\Data\Dashboard\Request\UploadProductVariantImagesRequestData;
use App\Models\ProductVariant;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UploadProductVariantImagesAction
{
    /**
     * @return Media[]
     */
    public function execute(UploadProductVariantImagesRequestData $data, string $productID, string $variantID): array
    {
        $uploaded = [];

        $productVariant = ProductVariant::where('id', $variantID)
            ->where('product_id', $productID)
            ->firstOrFail();

        foreach ($data->images as $file) {
            $uploaded[] = $productVariant
                ->addMedia($file)
                ->toMediaCollection('images');
        }

        return $uploaded;
    }
}
