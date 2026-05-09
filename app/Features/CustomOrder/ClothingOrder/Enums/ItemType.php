<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum ItemType: string
{
    case Clothing = 'clothing';
    case LivingRooms = 'living_rooms';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
