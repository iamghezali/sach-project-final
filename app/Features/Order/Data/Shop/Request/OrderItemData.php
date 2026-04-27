<?php

namespace App\Features\Order\Data\Shop\Request;

use Spatie\LaravelData\Data;

class OrderItemData extends Data
{
    public function __construct(
        public int $product_variant_id,
        public int $quantity,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'product_variant_id' => ['required', 'integer'],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}
