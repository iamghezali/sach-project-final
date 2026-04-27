<?php

namespace App\Features\Order\Exceptions;

use App\Features\Order\Enums\OrderStatus;
use RuntimeException;

class OrderException extends RuntimeException
{
    public static function notFound(): self
    {
        return new self('Order not found.');
    }

    public static function variantNotFound(): self
    {
        return new self('Product variant not found.');
    }

    public static function insufficientStock(string $variant): self
    {
        return new self("Insufficient stock for variant [{$variant}].");
    }

    public static function notCancellable(OrderStatus $status): self
    {
        return new self("Order cannot be cancelled at status [{$status->value}].");
    }
}
