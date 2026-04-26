<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use App\Features\Catalog\Product\Enums\ProductStatus;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class StoreProductRequestData extends Data
{
    public function __construct(
        public readonly string $name,
        public readonly string $slug,
        public readonly ?string $description,
        public readonly ProductStatus $status = ProductStatus::Draft, // new products start as drafts
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug', 'regex:/^[a-z0-9-]+$/'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'string', Rule::in(ProductStatus::values())],
        ];
    }
}
