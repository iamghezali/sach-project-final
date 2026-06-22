<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateProductVariantRequestData extends Data
{
    public function __construct(
        public readonly string|Optional $sku,
        public readonly float|Optional $price,
        public readonly int|Optional $stock_quantity,
        public readonly bool|Optional $is_active,
        public readonly bool|Optional $is_default,
        /** @var int[]|Optional */
        public readonly array|Optional $attribute_value_ids,
    ) {}

    public static function rules($ctx = null): array
    {
        $variantId = request()->route('variantID');

        return [
            'sku' => [
                'sometimes', 'required', 'string', 'max:100',
                Rule::unique('product_variants', 'sku')->ignore($variantId),
            ],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'stock_quantity' => ['sometimes', 'required', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
            'is_default' => ['sometimes', 'boolean'],
            'attribute_value_ids' => ['sometimes', 'required', 'array', 'min:1'],
            'attribute_value_ids.*' => ['integer', 'exists:attribute_values,id'],
        ];
    }
}
