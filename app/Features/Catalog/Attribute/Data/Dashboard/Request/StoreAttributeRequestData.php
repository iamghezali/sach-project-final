<?php

namespace App\Features\Catalog\Attribute\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class StoreAttributeRequestData extends Data
{
    public function __construct(
        public readonly string $name,
        public readonly string $slug,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'slug' => ['required', 'string', 'max:100', 'unique:attributes,slug', 'regex:/^[a-z0-9-]+$/'],
        ];
    }
}
