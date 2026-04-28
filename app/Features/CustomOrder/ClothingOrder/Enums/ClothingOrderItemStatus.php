<?php

namespace App\Features\CustomOrder\ClothingOrder\Enums;

use Illuminate\Support\Collection;

enum ClothingOrderItemStatus: string
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

    /**
     * @param  Collection<int, self>  $statuses
     */
    public static function deriveFrom(Collection $statuses): self
    {
        if ($statuses->isEmpty()) {
            return self::Pending;
        }

        $active = $statuses->reject(fn (self $s) => $s === self::Cancelled);

        if ($active->isEmpty()) {
            return self::Cancelled;
        }

        if ($active->every(fn (self $s) => $s === self::Completed)) {
            return self::Completed;
        }

        if ($active->contains(self::InProgress)) {
            return self::InProgress;
        }

        return self::Pending;
    }
}
