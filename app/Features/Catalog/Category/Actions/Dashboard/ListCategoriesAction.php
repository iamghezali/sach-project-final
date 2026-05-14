<?php

namespace App\Features\Catalog\Category\Actions\Dashboard;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class ListCategoriesAction
{
    public function execute(): Collection
    {
        return Category::all();
    }
}
