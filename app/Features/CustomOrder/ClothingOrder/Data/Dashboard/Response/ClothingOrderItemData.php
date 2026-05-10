<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Models\ClothingOrderItem;
use Spatie\LaravelData\Data;

class ClothingOrderItemData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly int $clothing_order_id,
        public readonly ?int $tailor_id,
        public readonly ClothingOrderItemStatus $status,
        public readonly string $status_label,
        public readonly ClothingOrderItemInformationData $information,
        public readonly array $measurements,
        public readonly string $created_at,
        public readonly string $updated_at,

        public readonly ?string $offer_price,
        public readonly ?string $offer_due_date,

        public readonly ?TailorData $tailor,
    ) {}

    public static function fromModel(ClothingOrderItem $item): self
    {
        return new self(
            id: $item->id,
            clothing_order_id: $item->clothing_order_id,
            tailor_id: $item->tailor_id,
            status: $item->status,
            status_label: $item->status->label(),
            information: ClothingOrderItemInformationData::fromModel($item),
            measurements: ClothingOrderItemMeasurementsData::fromModel($item)->toArray(),
            created_at: $item->created_at->format('Y-m-d'),
            updated_at: $item->updated_at->format('Y-m-d'),
            offer_price: $item->offer_price,
            offer_due_date: $item->offer_due_date?->format('Y-m-d'),
            tailor: $item->tailor ? TailorData::fromModel($item->tailor) : null,
        );
    }
}
