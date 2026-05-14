<?php

namespace App\Features\Catalog\Product\Controllers\Shop;

use App\Features\Catalog\Product\Actions\Shop\ListProductsAction;
use App\Features\Catalog\Product\Actions\Shop\ListProductsByCategoryAction;
use App\Features\Catalog\Product\Actions\Shop\ShowProductAction;
use App\Features\Catalog\Product\Data\Shop\Request\ListProductsRequestData;
use App\Features\Catalog\Product\Data\Shop\Response\ProductData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Spatie\LaravelData\DataCollection;

class ProductController extends Controller
{
    public function __construct(
        private readonly ListProductsAction $listProductsAction,
        private readonly ShowProductAction $showProductAction,
        private readonly ListProductsByCategoryAction $listProductsByCategoryAction
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

    public function listByCategory(Request $request, string $categorySlug)
    {
        // 1. Validate the limit input
        $validated = $request->validate([
            'limit' => 'sometimes|integer|min:1|max:32',
        ]);

        $limit = $validated['limit'] ?? 8;

        try {
            $products = $this->listProductsByCategoryAction->execute($categorySlug, (int) $limit);

            return response()->json([
                'data' => ProductData::collect($products, DataCollection::class),
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => "Category [{$categorySlug}] not found."], 404);
        }
    }
}
