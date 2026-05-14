<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Models\ClothingOrderItem;
use Spatie\LaravelData\Data;

class ClothingOrderItemData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly ClothingOrderItemStatus $status,
        public readonly string $status_label,
        public readonly ClothingOrderItemInformationData $information,
        public readonly array $measurements,
        public readonly array $images,

        public readonly ?string $offer_price,
        public readonly ?string $offer_due_date,
    ) {}

    public static function fromModel(ClothingOrderItem $item): self
    {
        return new self(
            id: $item->id,
            status: $item->status,
            status_label: $item->status->label(),
            information: ClothingOrderItemInformationData::fromModel($item),
            measurements: ClothingOrderItemMeasurementsData::fromModel($item)->toArray(),
            images: $item->getMedia('images')
                ->map(fn ($media) => ClothingOrderItemMediaData::fromModel($media))
                ->values()
                ->toArray(),

            offer_price: $item->offer_price,
            offer_due_date: $item->offer_due_date?->format('Y-m-d'),
        );
    }
}
