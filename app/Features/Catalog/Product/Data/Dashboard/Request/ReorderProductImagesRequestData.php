<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class ReorderProductImagesRequestData extends Data
{
    /**
     * @param  string[]  $uuids
     */
    public function __construct(
        public readonly array $uuids,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'uuids' => ['required', 'array', 'min:1'],
            'uuids.*' => ['required', 'string', 'uuid'],
        ];
    }
}
