<?php

namespace App\Features\Catalog\Product\Controllers\Dashboard;

use App\Features\Catalog\Product\Actions\Dashboard\AssignProductAttributeAction;
use App\Features\Catalog\Product\Actions\Dashboard\AssignProductCategoriesAction;
use App\Features\Catalog\Product\Actions\Dashboard\ChangeProductStatusAction;
use App\Features\Catalog\Product\Actions\Dashboard\CreateProductAction;
use App\Features\Catalog\Product\Actions\Dashboard\ListProductsAction;
use App\Features\Catalog\Product\Actions\Dashboard\RemoveProductAction;
use App\Features\Catalog\Product\Actions\Dashboard\ShowProductAction;
use App\Features\Catalog\Product\Actions\Dashboard\UpdateProductAction;
use App\Features\Catalog\Product\Data\Dashboard\Request\AssignProductAttributeRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\AssignProductCategoryRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\ChangeProductStatusRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\ListProductsRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\StoreProductRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Request\UpdateProductRequestData;
use App\Features\Catalog\Product\Data\Dashboard\Response\ProductData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

class ProductController extends Controller
{
    public function __construct(
        private readonly ListProductsAction $listProductsAction,
        private readonly CreateProductAction $createProductAction,
        private readonly ShowProductAction $showProductAction,
        private readonly UpdateProductAction $updateProductAction,
        private readonly RemoveProductAction $removeProductAction,
        private readonly AssignProductAttributeAction $assignProductAttributeAction,
        private readonly ChangeProductStatusAction $changeProductStatusAction,
        private readonly AssignProductCategoriesAction $assignProductCategoriesAction,
    ) {}

    public function index(ListProductsRequestData $filters)
    {
        return response()->json(
            $this->listProductsAction->execute($filters)
        );
    }

    public function store(StoreProductRequestData $data)
    {

        $product = $this->createProductAction->execute($data);

        return response()->json([
            'data' => ProductData::fromModel($product),
        ], 201);

    }

    public function show(string $productID)
    {
        try {

            $product = $this->showProductAction->execute($productID);

            return response()->json([
                'data' => ProductData::fromModel($product)->include('variants', 'attributes', 'active_attributes', 'images'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product ID {$productID} not found.",
            ], 404);

        }
    }

    public function update(UpdateProductRequestData $data, string $productID)
    {
        try {

            $product = $this->updateProductAction->execute($data, $productID);

            return response()->json([
                'data' => ProductData::fromModel($product),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product ID {$productID} not found.",
            ], 404);

        }
    }

    public function destroy(string $productID)
    {
        try {

            $this->removeProductAction->execute($productID);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product ID {$productID} not found.",
            ], 404);

        }
    }

    public function assignAttribute(AssignProductAttributeRequestData $data, string $productId)
    {
        try {

            $this->assignProductAttributeAction->execute($data, $productId);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product ID {$productId} not found.",
            ], 404);

        } catch (InvalidArgumentException $e) {

            return response()->json([
                'message' => $e->getMessage(),
            ], 422);

        }
    }

    public function changeStatus(string $productID, ChangeProductStatusRequestData $data)
    {
        try {

            $product = $this->changeProductStatusAction->execute($productID, $data);

            return response()->json([
                'data' => ProductData::fromModel($product),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product ID {$productID} not found.",
            ], 404);

        }
    }

    public function assignCategories(AssignProductCategoryRequestData $data, string $productId)
    {
        try {
            $this->assignProductCategoriesAction->execute($data, $productId);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => "Product ID {$productId} not found.",
            ], 404);
        }
    }
}
