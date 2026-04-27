<?php

namespace App\Features\Catalog\Product\Data\Shop\Response;

use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductVariantMediaData extends Data
{
    public function __construct(
        public readonly string $url,
        public readonly int $order,
    ) {}

    public static function fromModel(Media $media): self
    {
        return new self(
            url: route('media.show', $media->uuid),
            order: $media->order_column,
        );
    }
}
