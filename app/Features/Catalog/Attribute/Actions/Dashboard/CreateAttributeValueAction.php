<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Features\Catalog\Attribute\Data\Dashboard\Request\StoreAttributeValueRequestData;
use App\Models\Attribute;
use App\Models\AttributeValue;

class CreateAttributeValueAction
{
    public function execute(StoreAttributeValueRequestData $data, string $attributeID): AttributeValue
    {
        $attribute = Attribute::findOrFail($attributeID);

        $attributeValue = $attribute->values()->create([
            'value' => $data->value,
            'slug' => $data->slug,
        ]);

        return $attributeValue;
    }
}
