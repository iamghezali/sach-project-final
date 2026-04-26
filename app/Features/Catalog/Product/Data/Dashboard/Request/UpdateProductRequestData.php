<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateProductRequestData extends Data
{
    public function __construct(
        public readonly string|Optional $name,
        public readonly string|Optional $slug,
        public readonly string|null|Optional $description,
    ) {}

    public static function rules($ctx = null): array
    {
        $productId = request()->route('productID');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => [
                'sometimes', 'required', 'string', 'max:255',
                'regex:/^[a-z0-9-]+$/',
                "unique:products,slug,{$productId}",
            ],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
