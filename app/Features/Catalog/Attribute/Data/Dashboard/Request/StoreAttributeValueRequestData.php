<?php

namespace App\Features\Catalog\Attribute\Data\Dashboard\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class StoreAttributeValueRequestData extends Data
{
    public function __construct(
        public readonly string $value,
        public readonly string $slug,
    ) {}

    public static function rules($ctx = null): array
    {
        $attributeId = request()->route('attributeID');

        return [
            'value' => ['required', 'string', 'max:100'],
            'slug' => [
                'required', 'string', 'max:100', 'regex:/^[a-z0-9-]+$/',
                Rule::unique('attribute_values', 'slug')
                    ->where('attribute_id', $attributeId),
            ],
        ];
    }
}
