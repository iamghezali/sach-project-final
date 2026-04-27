<?php

namespace App\Features\Catalog\Product\Controllers\Dashboard;

use App\Features\Catalog\Product\Actions\Dashboard\RemoveProductVariantImageAction;
use App\Features\Catalog\Product\Actions\Dashboard\ReorderProductVariantImagesAction;
use App\Features\Catalog\Product\Actions\Dashboard\UploadProductVariantImagesAction;
use App\Features\Catalog\Product\Data\Dashboard\Request\ReorderProductVariantImagesRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\UploadProductVariantImagesRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Response\ProductVariantMediaData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductVariantImageController extends Controller
{
    public function __construct(
        private readonly UploadProductVariantImagesAction $uploadProductVariantImagesAction,
        private readonly RemoveProductVariantImageAction $removeProductVariantImageAction,
        private readonly ReorderProductVariantImagesAction $reorderProductVariantImagesAction,
    ) {}

    public function store(UploadProductVariantImagesRequestData $data, string $productID, string $variantID)
    {
        try {

            $media = $this->uploadProductVariantImagesAction
                ->execute($data, $productID, $variantID);

            return response()->json([
                'data' => ProductVariantMediaData::collect($media),
            ], 201);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Variant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }

    public function destroy(string $productID, string $variantID, string $mediaUUID)
    {
        try {

            $this->removeProductVariantImageAction
                ->execute($productID, $variantID, $mediaUUID);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Media ID {$mediaUUID} not found for Variant ID {$variantID}.",
            ], 404);

        }
    }

    public function reorder(ReorderProductVariantImagesRequestData $data, string $productID, string $variantID)
    {
        try {

            $this->reorderProductVariantImagesAction
                ->execute($data, $productID, $variantID);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Variant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }
}
