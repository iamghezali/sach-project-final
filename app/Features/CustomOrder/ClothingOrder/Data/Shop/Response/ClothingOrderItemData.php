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
        public readonly ClothingOrderItemInformationData $information,
        public readonly array $measurements,
    ) {}

    public static function fromModel(ClothingOrderItem $item): self
    {
        return new self(
            id: $item->id,
            status: $item->status,
            information: ClothingOrderItemInformationData::fromModel($item),
            measurements: ClothingOrderItemMeasurementsData::fromModel($item)->toArray(),
        );
    }
}
