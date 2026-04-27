<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum Size: string
{
    case XS = 'xs';
    case S = 's';
    case M = 'm';
    case L = 'l';
    case XL = 'xl';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
