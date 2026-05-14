<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class UploadProductImagesRequestData extends Data
{
    /**
     * @param  UploadedFile[]  $images
     * @param  int[]  $attribute_value_ids
     */
    public function __construct(
        public readonly array $images,
        public readonly array $attribute_value_ids = [],
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
            'attribute_value_ids' => ['sometimes', 'array'],
            'attribute_value_ids.*' => ['integer', 'exists:attribute_values,id'],
        ];
    }
}
