<?php

namespace App\Features\Order\Data\Dashboard\Response;

use App\Models\OrderItem;
use Spatie\LaravelData\Data;

class OrderItemData extends Data
{
    public function __construct(
        public int $id,
        public string $productName,
        public string $variantName,
        public string $sku,
        public int $quantity,
        public string $unitPrice,
        public string $subtotal,
        public ProductVariantData $productVariant,
    ) {}

    public static function fromModel(OrderItem $item): self
    {
        return new self(
            id: $item->id,
            productName: $item->product_name,
            variantName: $item->variant_name,
            sku: $item->sku,
            quantity: $item->quantity,
            unitPrice: $item->unit_price,
            subtotal: $item->subtotal,
            productVariant: ProductVariantData::fromModel($item->productVariant),
        );
    }
}
