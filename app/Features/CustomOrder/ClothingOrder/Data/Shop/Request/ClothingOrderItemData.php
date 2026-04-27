<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use Spatie\LaravelData\Data;

class ClothingOrderItemData extends Data
{
    public function __construct(
        public readonly ClothingOrderItemInformationData $information,
        public readonly ClothingOrderItemMeasurementsData $measurements,
    ) {}

    public function toArray(): array
    {
        return [
            'information' => $this->information->toArray(),
            'measurements' => $this->measurements->toArray(),
        ];
    }
}
