<?php

namespace App\Features\Catalog\Product\Actions\Shop;

use App\Models\Category;
use Spatie\LaravelData\DataCollection;

class ListProductsByCategoryAction
{
    public function execute(string $categorySlug, int $limit = 8): DataCollection
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        $products = $category->products()
            ->published()
            ->with(['variants', 'media', 'categories'])
            ->withMin('variants', 'price')
            ->limit($limit)
            ->get();

        return $products;
    }
}
