<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum MeasurementType: string
{
    case Standard = 'standard';
    case Custom = 'custom';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
