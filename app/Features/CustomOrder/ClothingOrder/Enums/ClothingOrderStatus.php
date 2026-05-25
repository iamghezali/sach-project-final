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

    case QualityCheck = 'quality_check';
    case OnShipping = 'on_shipping';
    case Shipped = 'shipped';
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
            self::QualityCheck => 'Quality Check',
            self::OnShipping => 'On Shipping',
            self::Shipped => 'Shipped',
            self::Cancelled => 'Cancelled',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
