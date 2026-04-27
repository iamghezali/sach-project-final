<?php

namespace App\Features\Order\Data\Dashboard\Response;

use App\Models\ProductVariant;
use Spatie\LaravelData\Data;

class ProductVariantData extends Data
{
    public function __construct(
        public int $id,
        public string $sku,
        public string $price,
    ) {}

    public static function fromModel(ProductVariant $variant): self
    {
        return new self(
            id: $variant->id,
            sku: $variant->sku,
            price: $variant->price,
        );
    }
}
