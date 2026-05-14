<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Data;

class AssignProductCategoryRequestData extends Data
{
    public function __construct(
        #[ArrayType()]
        /** @var int[] */
        public readonly array $category_ids,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'category_ids' => ['present', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
        ];
    }
}
