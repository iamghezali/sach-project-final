<?php

namespace App\Authorization\Enums;

enum Permission: string
{
    // User management
    case REGISTER_CUSTOMER = 'register customer';
    case REGISTER_TAILOR = 'register tailor';
    case REGISTER_EDITOR = 'register editor';

    public static function accept(self ...$permissions): string
    {
        return 'permission:'.implode('|', array_map(fn ($p) => $p->value, $permissions));
    }
}
