<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use App\Models\ClothingOrder;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

class ClothingOrderData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly ClothingOrderStatus $status,
        public readonly string $status_label,
        public readonly string $offer_total,
        public readonly string $created_at,
        public readonly string $updated_at,

        public readonly UserData $user,

        /** @var DataCollection<ClothingOrderItemData> */
        public readonly Lazy|DataCollection $items,
    ) {}

    public static function fromModel(ClothingOrder $order): self
    {
        return new self(
            id: $order->id,
            title: $order->title,
            status: $order->status,
            status_label: $order->status->label(),
            offer_total: $order->offerTotal(),
            created_at: $order->created_at->format('Y-m-d'),
            updated_at: $order->updated_at->format('Y-m-d'),
            user: UserData::fromModel($order->user),
            items: Lazy::create(fn () => new DataCollection(
                ClothingOrderItemData::class,
                $order->items->map(fn ($item) => ClothingOrderItemData::fromModel($item)),
            )),
        );
    }
}
