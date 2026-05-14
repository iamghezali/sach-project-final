<?php

namespace App\Models;

use App\Features\Catalog\Product\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable([
    'name',
    'slug',
    'description',
    'status',
])]
class Product extends Model implements HasMedia
{
    use InteractsWithMedia, SoftDeletes;

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
        $media = $this->getMedia('images')->first();

        return $media ? route('media.show', $media->uuid) : null;
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->useDisk('media');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }
}
