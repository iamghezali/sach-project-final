<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use App\Features\Catalog\Product\Enums\ProductStatus;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ChangeProductStatusRequestData extends Data
{
    public function __construct(
        public readonly ProductStatus $status,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'status' => ['required', 'string', Rule::in(ProductStatus::values())],
        ];
    }
}
