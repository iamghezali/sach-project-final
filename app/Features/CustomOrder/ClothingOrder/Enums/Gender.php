<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum Gender: string
{
    case Male = 'male';
    case Female = 'femmale';
    case Unisex = 'unisex';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
