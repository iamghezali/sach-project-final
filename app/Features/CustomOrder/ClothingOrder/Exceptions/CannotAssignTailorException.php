<?php

namespace App\Features\CustomOrder\ClothingOrder\Exceptions;

use RuntimeException;

class CannotAssignTailorException extends RuntimeException
{
    public static function itemNotInOrder(): self
    {
        return new self('The selected item does not belong to this order.');
    }

    public static function hasCancelledItems(): self
    {
        return new self('Cannot assign a tailor to cancelled items.');
    }
}
