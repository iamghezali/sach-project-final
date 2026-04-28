<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

enum ClothingOrderStatus: string
{
    case Pending = 'pending';
    case Offered = 'offered';

    case Negotiating = 'negotiating';

    case Accepted = 'accepted';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Offered => 'Offered',
            self::Negotiating => 'Negotiating',
            self::Accepted => 'Accepted',
            self::InProgress => 'In Progress',
            self::Completed => 'Completed',
            self::Cancelled => 'Cancelled',
        };
    }
}
