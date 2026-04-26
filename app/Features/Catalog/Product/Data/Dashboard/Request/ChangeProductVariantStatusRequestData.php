<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class ChangeProductVariantStatusRequestData extends Data
{
    public function __construct(
        public readonly bool $status,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'status' => ['required', 'boolean'],
        ];
    }
}
