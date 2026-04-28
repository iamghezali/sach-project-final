<?php

namespace App\Features\CustomOrder\ClothingOrder\Exceptions;

use RuntimeException;

class CannotAssignTailorException extends RuntimeException
{
    public static function itemsNotInOrder(): self
    {
        return new self('One or more item IDs do not belong to the specified clothing order.');
    }

    public static function hasCancelledItems(): self
    {
        return new self('Cannot assign a tailor to cancelled items.');
    }
}
