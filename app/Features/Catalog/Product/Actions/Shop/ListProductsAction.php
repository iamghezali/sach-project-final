<?php

namespace App\Features\Catalog\Product\Actions\Shop;

use App\Features\Catalog\Product\Data\Shop\Request\ListProductsRequestData;
use App\Features\Catalog\Product\Data\Shop\Response\ProductData;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;
use Spatie\LaravelData\PaginatedDataCollection;

class ListProductsAction
{
    private const SORT_ALIAS = 'variants_min_price';

    private const PER_PAGE = 12;

    public function execute(ListProductsRequestData $filters): PaginatedDataCollection
    {
        return ProductData::collect(
            Product::query()
                ->published()
                ->with(['variants'])
                ->withMin('variants', 'price')
                ->tap(fn (Builder $q) => $this->applyFilters($q, $filters))
                ->tap(fn (Builder $q) => $this->applySorting($q, $filters->sort))
                ->paginate(self::PER_PAGE),
            PaginatedDataCollection::class
        );
    }

    private function applyFilters(Builder $query, ListProductsRequestData $filters): void
    {
        $colorAttrId = $filters->color
            ? Cache::rememberForever('attr_color_id', fn () => Attribute::where('slug', 'color')->value('id'))
            : null;

        $sizeAttrId = $filters->size
            ? Cache::rememberForever('attr_size_id', fn () => Attribute::where('slug', 'size')->value('id'))
            : null;

        $query
            ->when($filters->search, function (Builder $q, string $search) {
                $escaped = str($search)
                    ->replace(['\\'], ['\\\\'])
                    ->replace(['%', '_'], ['\%', '\_']);

                $q->where('name', 'like', '%'.$escaped.'%');
            })

            ->when(
                $filters->color,
                fn (Builder $q, string $color) => $q->whereHas('variants.attributeValues',
                    fn (Builder $q) => $q->where('attribute_values.slug', $color)
                        ->where('attribute_values.attribute_id', $colorAttrId)
                )
            )

            ->when(
                $filters->size,
                fn (Builder $q, string $size) => $q->whereHas('variants.attributeValues',
                    fn (Builder $q) => $q->where('attribute_values.slug', $size)
                        ->where('attribute_values.attribute_id', $sizeAttrId)
                )
            );
    }

    private function applySorting(Builder $query, string $sort): void
    {
        match ($sort) {
            'price_asc' => $query->orderBy(self::SORT_ALIAS),
            'price_desc' => $query->orderByDesc(self::SORT_ALIAS),
            default => $query->latest(),
        };
    }
}
