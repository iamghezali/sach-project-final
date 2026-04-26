<?php

namespace App\Features\Catalog\Product\Actions\Dashboard;

use App\Models\Product;

class CreateProductAction
{
    public function execute($data)
    {
        $product = Product::create([
            'name' => $data->name,
            'slug' => $data->slug,
            'description' => $data->description,
            'brand' => $data->brand,
            'status' => $data->status,
        ]);

        return $product;
    }
}
