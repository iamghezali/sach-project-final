<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Data;

class AssignProductAttributeRequestData extends Data
{
    public function __construct(
        #[ArrayType()]
        /** @var int[] */
        public readonly array $attribute_ids,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'attribute_ids' => ['present', 'array'],
            'attribute_ids.*' => ['integer', 'exists:attributes,id'],
        ];
    }
}
