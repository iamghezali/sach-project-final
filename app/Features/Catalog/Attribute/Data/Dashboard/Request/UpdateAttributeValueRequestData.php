<?php

namespace App\Features\Catalog\Attribute\Data\Dashboard\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateAttributeValueRequestData extends Data
{
    public function __construct(
        public readonly string|Optional $value,
        public readonly string|Optional $slug,
        public readonly int|Optional $position,
    ) {}

    public static function rules($ctx = null): array
    {
        $attributeId = request()->route('attributeID');
        $valueId = request()->route('valueID');

        return [
            'value' => ['sometimes', 'required', 'string', 'max:100'],
            'slug' => [
                'sometimes', 'required', 'string', 'max:100', 'regex:/^[a-z0-9-]+$/',
                Rule::unique('attribute_values', 'slug')
                    ->where('attribute_id', $attributeId)
                    ->ignore($valueId),
            ],
            'position' => ['sometimes', 'required', 'integer', 'min:0'],
        ];
    }
}
