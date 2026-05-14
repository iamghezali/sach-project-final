<?php

namespace App\Features\Catalog\Category\Actions\Dashboard;

use App\Features\Catalog\Category\Data\Dashboard\Request\UpdateCategoryRequestData;
use App\Models\Category;

class UpdateCategoryAction
{
    public function execute(UpdateCategoryRequestData $data, string $categoryID): Category
    {
        $category = Category::findOrFail($categoryID);
        $category->update($data->toArray());

        return $category->fresh();
    }
}
