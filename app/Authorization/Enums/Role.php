<?php

namespace App\Authorization\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case TAILOR = 'tailor';
    case CUSTOMER = 'customer';

    public static function accept(self ...$roles): string
    {
        return 'role:'.implode('|', array_map(fn ($r) => $r->value, $roles));
    }
}
