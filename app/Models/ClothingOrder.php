<?php

namespace App\Models;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

#[Fillable([
    'user_id',
    'title',
    'status',
])]
class ClothingOrder extends Model
{
    protected function casts(): array
    {
        return [
            'status' => ClothingOrderStatus::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(ClothingOrderItem::class);
    }

    /** @see ClothingOrder::$items - must be eager-loaded with 'items.tailor' */
    public function assignedTailors(): Collection
    {
        return $this->items
            ->pluck('tailor')
            ->filter()
            ->unique('id')
            ->values();
    }

    /** @see ClothingOrder::$items - must be eager-loaded with 'items' */
    public function offerTotal(): string
    {
        $total = $this->items
            ->reject(fn (ClothingOrderItem $item) => $item->status === ClothingOrderItemStatus::Cancelled)
            ->sum(fn (ClothingOrderItem $item) => $item->offer_price * $item->quantity);

        return number_format($total, 2);
    }
}
