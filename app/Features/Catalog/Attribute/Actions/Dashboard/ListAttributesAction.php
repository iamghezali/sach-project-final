<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Models\Attribute;
use Illuminate\Database\Eloquent\Collection;

class ListAttributesAction
{
    public function execute(): Collection
    {
        $attributes = Attribute::with('values')->get();

        return $attributes;
    }
}
