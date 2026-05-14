<?php

namespace App\Features\Catalog\Product\Controllers\Dashboard;

use App\Features\Catalog\Product\Actions\Dashboard\RemoveProductImageAction;
use App\Features\Catalog\Product\Actions\Dashboard\ReorderProductImagesAction;
use App\Features\Catalog\Product\Actions\Dashboard\UpdateProductImageAction;
use App\Features\Catalog\Product\Actions\Dashboard\UploadProductImagesAction;
use App\Features\Catalog\Product\Data\Dashboard\Request\ReorderProductImagesRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\UpdateProductImageRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\UploadProductImagesRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Response\ProductMediaData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

class ProductImageController extends Controller
{
    public function __construct(
        private readonly UploadProductImagesAction $uploadProductImagesAction,
        private readonly RemoveProductImageAction $removeProductImageAction,
        private readonly ReorderProductImagesAction $reorderProductImagesAction,
        private readonly UpdateProductImageAction $updateProductImageAction,
    ) {}

    public function store(UploadProductImagesRequestData $data, string $productId)
    {
        try {
            $media = $this->uploadProductImagesAction->execute($data, $productId);

            return response()->json([
                'data' => ProductMediaData::collect($media),
            ], 201);

        } catch (ModelNotFoundException) {
            return response()->json(['message' => "Product {$productId} not found."], 404);
        }
    }

    public function destroy(string $productId, string $mediaUuid)
    {
        try {
            $this->removeProductImageAction->execute($productId, $mediaUuid);

            return response()->noContent();

        } catch (ModelNotFoundException) {
            return response()->json(['message' => "Media {$mediaUuid} not found."], 404);
        }
    }

    public function reorder(ReorderProductImagesRequestData $data, string $productId)
    {
        try {
            $this->reorderProductImagesAction->execute($data, $productId);

            return response()->noContent();

        } catch (ModelNotFoundException) {
            return response()->json(['message' => "Product {$productId} not found."], 404);

        } catch (InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function update(UpdateProductImageRequestData $data, string $productId, string $mediaUuid)
    {
        try {
            $media = $this->updateProductImageAction->execute($data, $productId, $mediaUuid);

            return response()->json([
                'data' => ProductMediaData::fromModel($media),
            ]);

        } catch (ModelNotFoundException) {

            return response()->json([
                'message' => "Media {$mediaUuid} not found.",
            ], 404);

        }
    }
}
