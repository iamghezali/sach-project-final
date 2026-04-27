<?php

namespace App\Models;

use App\Features\Catalog\Product\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'name',
    'slug',
    'description',
    'status',
])]
class Product extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'status' => ProductStatus::class,
        ];
    }

    protected static function booted()
    {
        // Append a timestamp for soft-deleted items
        static::deleted(function ($product) {
            $product->update(['slug' => $product->slug.'-slug-'.now()->timestamp]);
        });
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function activeVariants(): HasMany
    {
        return $this->hasMany(ProductVariant::class)
            ->where('is_active', true);
    }

    public function attributes(): BelongsToMany
    {
        return $this->belongsToMany(Attribute::class, 'product_attributes');
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('status', ProductStatus::Published)
            ->whereHas('activeVariants');
    }

    public function scopeActive(Builder $query): void
    {
        $query->where('status', '!=', ProductStatus::Archived);
    }

    public function isAvailable(): bool
    {
        return $this->activeVariants()
            ->where('stock_quantity', '>', 0)
            ->exists();
    }

    public function getThumbnailAttribute(): ?string
    {
        $defaultVariant = $this->variants->firstWhere('is_default', true);

        if (! $defaultVariant) {
            return null;
        }

        $media = $defaultVariant->getMedia('images')->first();

        return $media ? route('media.show', $media->uuid) : null;
    }
}
