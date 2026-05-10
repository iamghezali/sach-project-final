<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Tailor\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Models\ClothingOrderItem;
use Spatie\LaravelData\Data;

class ClothingOrderItemData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly int $clothing_order_id,
        public readonly ClothingOrderItemStatus $status,
        public readonly string $status_label,
        public readonly ClothingOrderItemInformationData $information,
        public readonly array $measurements,

        public readonly string $updated_at,

        public readonly ?string $offer_price,
        public readonly ?string $offer_due_date,

    ) {}

    public static function fromModel(ClothingOrderItem $item): self
    {
        return new self(
            id: $item->id,
            clothing_order_id: $item->clothing_order_id,
            status: $item->status,
            status_label: $item->status->label(),
            information: ClothingOrderItemInformationData::fromModel($item),
            measurements: ClothingOrderItemMeasurementsData::fromModel($item)->toArray(),

            updated_at: $item->updated_at->format('Y-m-d'),

            offer_price: $item->offer_price !== null ? number_format((float) $item->offer_price * 0.8, 2) : null,
            offer_due_date: $item->offer_due_date?->format('Y-m-d'),
        );
    }
}
