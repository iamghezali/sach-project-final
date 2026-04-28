<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum Gender: string
{
    case Male = 'male';
    case Female = 'female';
    case Unisex = 'unisex';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
