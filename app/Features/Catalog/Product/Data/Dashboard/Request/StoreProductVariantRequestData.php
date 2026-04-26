<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class StoreProductVariantRequestData extends Data
{
    public function __construct(
        public readonly string $sku,
        public readonly float $price,
        /** @var int[] */
        public readonly array $attribute_value_ids,

        public readonly int $stock_quantity = 0,
        public readonly bool $is_active = true,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'sku' => ['required', 'string', 'max:100', 'unique:product_variants,sku'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock_quantity' => ['sometimes', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
            'attribute_value_ids' => ['required', 'array', 'min:1'],
            'attribute_value_ids.*' => ['integer', 'exists:attribute_values,id'],
        ];
    }
}
