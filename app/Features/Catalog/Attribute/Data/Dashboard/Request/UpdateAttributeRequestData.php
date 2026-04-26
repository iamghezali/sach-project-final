<?php

namespace App\Features\Catalog\Attribute\Data\Dashboard\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateAttributeRequestData extends Data
{
    public function __construct(
        public readonly string|Optional $name,
        public readonly string|Optional $slug,
    ) {}

    public static function rules($ctx = null): array
    {
        // ignore its current slug in the unique constraint.
        $attributeId = request()->route('attributeID');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:100'],
            'slug' => [
                'sometimes', 'required', 'string', 'max:100',
                'regex:/^[a-z0-9-]+$/',
                Rule::unique('attributes')->ignore($attributeId),
            ],
        ];
    }
}
