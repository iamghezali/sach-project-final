<?php

namespace App\Features\Catalog\Product\Data\Shop\Response;

use App\Models\ProductVariant;
use Spatie\LaravelData\Data;

class ProductVariantData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly int $product_id,
        public readonly string $sku,
        public readonly string $price,
        public readonly int $stock_quantity,
        public readonly bool $is_active,
        public readonly bool $is_default,
        public readonly bool $is_in_stock,

        /** @var array<int> */
        public readonly array $attribute_value_ids,
    ) {}

    public static function fromModel(ProductVariant $variant): self
    {
        return new self(
            id: $variant->id,
            product_id: $variant->product_id,
            sku: $variant->sku,
            price: $variant->price,
            stock_quantity: $variant->stock_quantity,
            is_active: $variant->is_active,
            is_default: $variant->is_default,
            is_in_stock: $variant->isInStock(),
            attribute_value_ids: $variant->attributeValues->pluck('id')->all(),

        );
    }
}
