<?php

namespace App\Features\Catalog\Category\Controllers\Dashboard;

use App\Features\Catalog\Category\Actions\Dashboard\CreateCategoryAction;
use App\Features\Catalog\Category\Actions\Dashboard\ListCategoriesAction;
use App\Features\Catalog\Category\Actions\Dashboard\RemoveCategoryAction;
use App\Features\Catalog\Category\Actions\Dashboard\UpdateCategoryAction;
use App\Features\Catalog\Category\Data\Dashboard\Request\StoreCategoryRequestData;
use App\Features\Catalog\Category\Data\Dashboard\Request\UpdateCategoryRequestData;
use App\Features\Catalog\Category\Data\Dashboard\Response\CategoryData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Spatie\LaravelData\DataCollection;

class CategoryController extends Controller
{
    public function __construct(
        private readonly ListCategoriesAction $listCategoriesAction,
        private readonly CreateCategoryAction $createCategoryAction,
        private readonly UpdateCategoryAction $updateCategoryAction,
        private readonly RemoveCategoryAction $removeCategoryAction,
    ) {}

    public function index()
    {
        $categories = $this->listCategoriesAction->execute();

        return response()->json([
            'data' => CategoryData::collect($categories, DataCollection::class),
        ]);
    }

    public function store(StoreCategoryRequestData $data)
    {
        $category = $this->createCategoryAction->execute($data);

        return response()->json([
            'data' => CategoryData::fromModel($category),
        ], 201);
    }

    public function update(UpdateCategoryRequestData $data, string $categoryID)
    {
        try {
            $category = $this->updateCategoryAction->execute($data, $categoryID);

            return response()->json([
                'data' => CategoryData::fromModel($category),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => "Category ID {$categoryID} not found."], 404);
        }
    }

    public function destroy(string $categoryID)
    {
        try {
            $this->removeCategoryAction->execute($categoryID);

            return response()->noContent();
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => "Category ID {$categoryID} not found."], 404);
        }
    }
}
