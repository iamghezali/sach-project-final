<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\MeasurementType;
use App\Features\CustomOrder\ClothingOrder\Enums\Size;
use App\Models\ClothingOrderItem;
use Spatie\LaravelData\Data;

class ClothingOrderItemMeasurementsData extends Data
{
    public function __construct(
        public readonly MeasurementType $measurement_type,
        public readonly ?Size $size,
        public readonly ?float $shoulder,
        public readonly ?float $height,
        public readonly ?float $waist,
        public readonly ?float $chest,
        public readonly ?string $fitting_preference,
    ) {}

    public static function fromModel(ClothingOrderItem $item): self
    {
        return new self(
            measurement_type: $item->measurement_type,
            size: $item->size,
            shoulder: $item->shoulder,
            height: $item->height,
            waist: $item->waist,
            chest: $item->chest,
            fitting_preference: $item->fitting_preference,
        );
    }

    public function toArray(): array
    {
        $base = [
            'measurement_type' => $this->measurement_type,
            'fitting_preference' => $this->fitting_preference,
        ];

        if ($this->measurement_type === MeasurementType::Standard) {
            return array_merge($base, [
                'size' => $this->size,
            ]);
        }

        return array_merge($base, [
            'shoulder' => $this->shoulder,
            'height' => $this->height,
            'waist' => $this->waist,
            'chest' => $this->chest,
        ]);
    }
}
