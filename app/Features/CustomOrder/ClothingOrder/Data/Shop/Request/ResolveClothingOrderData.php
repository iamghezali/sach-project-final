<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use Spatie\LaravelData\Data;

class ResolveClothingOrderData extends Data
{
    public function __construct(
        public readonly bool $accept,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'accept' => ['required', 'boolean'],
        ];
    }
}
