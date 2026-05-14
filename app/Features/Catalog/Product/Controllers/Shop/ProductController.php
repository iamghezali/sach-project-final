<?php

namespace App\Features\Catalog\Product\Controllers\Shop;

use App\Features\Catalog\Product\Actions\Shop\ListProductsAction;
use App\Features\Catalog\Product\Actions\Shop\ShowProductAction;
use App\Features\Catalog\Product\Data\Shop\Request\ListProductsRequestData;
use App\Features\Catalog\Product\Data\Shop\Response\ProductData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    public function __construct(
        private readonly ListProductsAction $listProductsAction,
        private readonly ShowProductAction $showProductAction,
    ) {}

    public function index(ListProductsRequestData $filters)
    {
        return response()->json(
            $this->listProductsAction->execute($filters)
        );
    }

    public function show(string $slug)
    {
        try {

            $product = $this->showProductAction->execute($slug);

            return response()->json([
                'data' => ProductData::fromModel($product)->include('variants', 'attributes', 'images'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Product slug [{$slug}] not found.",
            ], 404);

        }
    }
}
