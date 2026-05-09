<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum ItemFor: string
{
    case Individual = 'individual';
    case Company = 'company';
    case Wholesale = 'wholesale';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
