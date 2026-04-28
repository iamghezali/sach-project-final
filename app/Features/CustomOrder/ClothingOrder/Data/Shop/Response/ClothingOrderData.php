<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use App\Models\ClothingOrder;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class ClothingOrderData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly ClothingOrderStatus $status,
        public readonly string $created_at,
        /** @var DataCollection<ClothingOrderItemData> */
        public readonly DataCollection $items,
    ) {}

    public static function fromModel(ClothingOrder $order): self
    {
        return new self(
            id: $order->id,
            title: $order->title,
            status: $order->status,
            created_at: $order->created_at->format('Y-m-d'),
            items: new DataCollection(
                ClothingOrderItemData::class,
                $order->items->map(fn ($item) => ClothingOrderItemData::fromModel($item)),
            ),
        );
    }
}
