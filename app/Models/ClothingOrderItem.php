<?php

namespace App\Models;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Features\CustomOrder\ClothingOrder\Enums\Gender;
use App\Features\CustomOrder\ClothingOrder\Enums\MeasurementType;
use App\Features\CustomOrder\ClothingOrder\Enums\Size;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'clothing_order_id',
    'tailor_id',
    'title',
    'gender',
    'looking_for',
    'description',
    'quantity',
    'preferred_due_date',
    'measurement_type',
    'size',
    'shoulder',
    'height',
    'waist',
    'chest',
    'fitting_preferrence',
    'status',
    'offer_price',
    'offer_due_date',
])]
class ClothingOrderItem extends Model
{
    protected function casts(): array
    {
        return [
            'gender' => Gender::class,
            'measurement_type' => MeasurementType::class,
            'status' => ClothingOrderItemStatus::class,
            'size' => Size::class,
            'preferred_due_date' => 'date',
            'shoulder' => 'float',
            'height' => 'float',
            'waist' => 'float',
            'chest' => 'float',
            'offer_price' => 'decimal:2',
            'offer_due_date' => 'date',
        ];
    }

    public function clothingOrder(): BelongsTo
    {
        return $this->belongsTo(ClothingOrder::class);
    }

    public function tailor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tailor_id');
    }
}
