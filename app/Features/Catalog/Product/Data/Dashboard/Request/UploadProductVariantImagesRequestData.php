<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class UploadProductVariantImagesRequestData extends Data
{
    /**
     * @param  UploadedFile[]  $images
     */
    public function __construct(
        public readonly array $images,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'images' => ['required', 'array', 'min:1'],
            'images.*' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:10240', // 10MB
            ],
        ];
    }
}
