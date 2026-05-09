<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use App\Features\CustomOrder\ClothingOrder\Enums\MeasurementType;
use App\Features\CustomOrder\ClothingOrder\Enums\Size;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

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

    public static function rules(?ValidationContext $context = null): array
    {

        $is_standard = fn () => ($context->payload['measurement_type'] ?? null) === MeasurementType::Standard->value;
        $is_custom = fn () => ($context->payload['measurement_type'] ?? null) === MeasurementType::Custom->value;

        return [
            'measurement_type' => ['required', Rule::in(MeasurementType::values())],

            'size' => [
                Rule::requiredIf($is_standard),
                Rule::in(Size::values()),
            ],
            'shoulder' => ['numeric', Rule::requiredIf($is_custom)],
            'height' => ['numeric', Rule::requiredIf($is_custom)],
            'waist' => ['numeric', Rule::requiredIf($is_custom)],
            'chest' => ['numeric', Rule::requiredIf($is_custom)],
        ];
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
