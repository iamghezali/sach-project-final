<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Response;

use Spatie\LaravelData\Data;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductMediaData extends Data
{
    public function __construct(
        public readonly string $uuid,
        public readonly string $url,
        public readonly int $order,
        public readonly array $attribute_value_ids,
    ) {}

    public static function fromModel(Media $media): self
    {
        return new self(
            uuid: $media->uuid,
            url: route('media.show', $media->uuid),
            order: $media->order_column,
            attribute_value_ids: $media->getCustomProperty('attribute_value_ids', []),
        );
    }
}
