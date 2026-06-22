<?php

namespace App\Features\Catalog\Product\Controllers\Dashboard;

use App\Features\Catalog\Product\Actions\Dashboard\ChangeProductVariantStatusAction;
use App\Features\Catalog\Product\Actions\Dashboard\CreateProductVariantAction;
use App\Features\Catalog\Product\Actions\Dashboard\MakeProductVariantDefaultAction;
use App\Features\Catalog\Product\Actions\Dashboard\RemoveProductVariantAction;
use App\Features\Catalog\Product\Actions\Dashboard\ShowProductVariantAction;
use App\Features\Catalog\Product\Actions\Dashboard\UpdateProductVariantAction;
use App\Features\Catalog\Product\Data\Dashboard\Request\ChangeProductVariantStatusRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\StoreProductVariantRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\UpdateProductVariantRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Response\ProductVariantData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

class ProductVariantController extends Controller
{
    public function __construct(
        private readonly CreateProductVariantAction $createProductVariantAction,
        private readonly ShowProductVariantAction $showProductVariantAction,
        private readonly UpdateProductVariantAction $updateProductVariantAction,
        private readonly RemoveProductVariantAction $removeProductVariantAction,
        private readonly ChangeProductVariantStatusAction $changeProductVariantStatusAction,
        private readonly MakeProductVariantDefaultAction $makeProductVariantDefaultAction,
    ) {}

    public function store(StoreProductVariantRequestData $data, string $productID)
    {
        try {

            $productVariant = $this->createProductVariantAction
                ->execute($data, $productID);

            return response()->json([
                'data' => ProductVariantData::fromModel($productVariant)->include('attribute_values'),
            ], 201);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product ID {$productID} doesn't Exist.",
            ], 404);

        } catch (InvalidArgumentException $e) {

            return response()->json([
                'message' => $e->getMessage(),
            ], 422);

        }
    }

    public function show(string $productID, string $variantID)
    {
        try {

            $productVariant = $this->showProductVariantAction
                ->execute($productID, $variantID);

            return response()->json([
                'data' => ProductVariantData::fromModel($productVariant),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Vairant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }

    public function update(UpdateProductVariantRequestData $data, string $productID, string $variantID)
    {
        try {

            $productVariant = $this->updateProductVariantAction
                ->execute($data, $productID, $variantID);

            return response()->json([
                'data' => ProductVariantData::fromModel($productVariant)->include('attribute_values'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Vairant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }

    public function destroy(string $productID, string $variantID)
    {
        try {

            $this->removeProductVariantAction
                ->execute($productID, $variantID);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Vairant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }

    public function changeStatus(string $productID, string $variantID, ChangeProductVariantStatusRequestData $data)
    {
        try {

            $productVariant = $this->changeProductVariantStatusAction
                ->execute($productID, $variantID, $data);

            return response()->json([
                'data' => ProductVariantData::fromModel($productVariant)->include('attribute_values'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Vairant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }

    public function default(string $productID, string $variantID)
    {
        try {

            $productVariant = $this->makeProductVariantDefaultAction
                ->execute($productID, $variantID);

            return response()->json([
                'data' => ProductVariantData::fromModel($productVariant)->include('attribute_values'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Product Vairant ID {$variantID} found for Product ID {$productID}.",
            ], 404);

        }
    }
}
