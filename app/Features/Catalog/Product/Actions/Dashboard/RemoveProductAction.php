<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class RemoveProductAction
{
    public function execute($productID)
    {
        $product = Product::findOrFail($productID);

        DB::transaction(function () use ($product) {
            $product->variants->each(fn ($v) => $v->delete());
            $product->delete();
        });
    }
}
