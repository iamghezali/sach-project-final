<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class UpdateProductImageRequestData extends Data
{
    /**
     * @param  int[]  $attribute_value_ids
     */
    public function __construct(
        public readonly array $attribute_value_ids,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'attribute_value_ids' => ['required', 'array'],
            'attribute_value_ids.*' => ['integer', 'exists:attribute_values,id'],
        ];
    }
}
