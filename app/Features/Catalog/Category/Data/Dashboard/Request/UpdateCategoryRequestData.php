<?php

namespace App\Features\Catalog\Category\Data\Dashboard\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateCategoryRequestData extends Data
{
    public function __construct(
        public readonly string|Optional $name,
        public readonly string|Optional $slug,
    ) {}

    public static function rules($ctx = null): array
    {
        $categoryId = request()->route('categoryID');

        return [
            'name' => ['sometimes', 'required', 'string', 'max:100'],
            'slug' => [
                'sometimes', 'required', 'string', 'max:100',
                'regex:/^[a-z0-9-]+$/',
                Rule::unique('categories')->ignore($categoryId),
            ],
        ];
    }
}
