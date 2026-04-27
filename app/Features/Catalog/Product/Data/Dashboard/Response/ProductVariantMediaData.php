<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Response;

use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductVariantMediaData extends Data
{
    public function __construct(
        public readonly string $uuid,
        public readonly string $url,
        public readonly string $file_name,
        public readonly int $order,
    ) {}

    public static function fromModel(Media $media): self
    {
        return new self(
            uuid: $media->uuid,
            url: route('media.show', $media->uuid),
            file_name: $media->file_name,
            order: $media->order_column,
        );
    }
}
