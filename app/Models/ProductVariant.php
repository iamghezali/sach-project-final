<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

#[Fillable([
    'product_id',
    'sku',
    'price',
    'stock_quantity',
    'is_active',
    'is_default',
])]
class ProductVariant extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock_quantity' => 'integer',
            'is_active' => 'boolean',
            'is_default' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        // First variant added becomes the default automatically
        static::creating(function (ProductVariant $variant) {
            $hasDefault = static::where('product_id', $variant->product_id)
                ->where('is_default', true)
                ->exists();

            $variant->is_default = ! $hasDefault;
        });

        // When a variant is set as default, unset all others for the same product
        static::updating(function (ProductVariant $variant) {
            if ($variant->isDirty('is_default') && $variant->is_default === true) {
                static::where('product_id', $variant->product_id)
                    ->where('id', '!=', $variant->id)
                    ->update(['is_default' => false]);
            }
        });

        // Append a timestamp for soft-deleted items
        static::deleted(function (ProductVariant $variant) {
            $variant->update(['sku' => $variant->sku.'-sku-'.now()->timestamp]);
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function attributeValues(): BelongsToMany
    {
        return $this->belongsToMany(
            AttributeValue::class,
            'product_variant_attribute_values'
        )->with('attribute'); // always bring the axis along
    }

    public function isInStock(): bool
    {
        return $this->stock_quantity > 0;
    }

    public function decrementStock(int $quantity = 1): bool
    {
        // Use a single atomic UPDATE with a WHERE guard to prevent race conditions.
        // This is safer than read-then-write in high-concurrency checkout flows.
        $affected = DB::table('product_variants')
            ->where('id', $this->id)
            ->where('stock_quantity', '>=', $quantity)
            ->update([
                'stock_quantity' => DB::raw("stock_quantity - {$quantity}"),
            ]);

        if ($affected === 0) {
            return false; // stock was insufficient
        }

        // Sync the in-memory model so callers see the updated value immediately
        $this->stock_quantity -= $quantity;

        return true;
    }

    public function restoreStock(int $quantity = 1): void
    {
        DB::table('product_variants')
            ->where('id', $this->id)
            ->increment('stock_quantity', $quantity);

        $this->stock_quantity += $quantity;
    }

    public function labels(): array
    {
        return $this->attributeValues
            ->sortBy('attribute.name')
            ->map(fn (AttributeValue $v) => $v->value)
            ->values()
            ->toArray();
    }
}
