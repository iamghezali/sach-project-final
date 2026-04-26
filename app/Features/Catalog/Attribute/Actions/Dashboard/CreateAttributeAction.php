<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Features\Catalog\Attribute\Data\Dashboard\Request\StoreAttributeRequestData;
use App\Models\Attribute;

class CreateAttributeAction
{
    public function execute(StoreAttributeRequestData $data): Attribute
    {
        $attribute = Attribute::create([
            'name' => $data->name,
            'slug' => $data->slug,
        ]);

        return $attribute;
    }
}
