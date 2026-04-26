<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

#[Fillable(['attribute_id', 'value', 'slug', 'position'])]
class AttributeValue extends Model
{
    protected static function booted(): void
    {
        // Auto-assign the next position scoped to the parent attribute on creation,
        // respecting any explicitly provided value (e.g. during seeding or imports).
        static::creating(function (AttributeValue $value) {
            $value->position ??= static::query()
                ->where('attribute_id', $value->attribute_id)
                ->max('position') + 1;
        });

        // When position changes, shift siblings in the affected range to maintain
        // a clean, gap-free sequence within the same attribute.
        static::updating(function (AttributeValue $value) {
            if (! $value->isDirty('position')) {
                return;
            }

            $old = $value->getOriginal('position');
            $new = $value->position;

            DB::transaction(function () use ($value, $old, $new) {
                $siblings = static::query()
                    ->where('attribute_id', $value->attribute_id)
                    ->whereKeyNot($value->id);

                if ($new > $old) {
                    $siblings->whereBetween('position', [$old + 1, $new])->decrement('position');
                } elseif ($new < $old) {
                    $siblings->whereBetween('position', [$new, $old - 1])->increment('position');
                }
            });
        });
    }

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class);
    }

    public function productVariants(): BelongsToMany
    {
        return $this->belongsToMany(
            ProductVariant::class,
            'product_variant_attribute_values'
        );
    }
}
