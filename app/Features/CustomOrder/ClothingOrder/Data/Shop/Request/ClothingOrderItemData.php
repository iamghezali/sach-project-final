<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class ClothingOrderItemData extends Data
{
    /**
     * @param  UploadedFile[]  $images
     */
    public function __construct(
        public readonly ClothingOrderItemInformationData $information,
        public readonly ClothingOrderItemMeasurementsData $measurements,
        public readonly array $images,
    ) {}

    public static function rules(?ValidationContext $context = null): array
    {
        return [
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
        ];
    }

    public function toArray(): array
    {
        return [
            'information' => $this->information->toArray(),
            'measurements' => $this->measurements->toArray(),
        ];
    }
}
