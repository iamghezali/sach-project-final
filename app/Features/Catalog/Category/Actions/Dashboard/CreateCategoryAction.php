<?php

namespace App\Features\Catalog\Category\Actions\Dashboard;

use App\Features\Catalog\Category\Data\Dashboard\Request\StoreCategoryRequestData;
use App\Models\Category;

class CreateCategoryAction
{
    public function execute(StoreCategoryRequestData $data): Category
    {
        return Category::create([
            'name' => $data->name,
            'slug' => $data->slug,
        ]);
    }
}
