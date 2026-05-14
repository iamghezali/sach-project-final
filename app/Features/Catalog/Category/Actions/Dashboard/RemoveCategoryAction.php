<?php

namespace App\Features\Catalog\Category\Actions\Dashboard;

use App\Models\Category;

class RemoveCategoryAction
{
    public function execute(string $categoryID): void
    {
        $category = Category::findOrFail($categoryID);
        $category->delete();
    }
}
