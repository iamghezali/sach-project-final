<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Models\AttributeValue;

class RemoveAttributeValueAction
{
    public function execute(string $attributeID, string $valueID)
    {
        $attributeValue = AttributeValue::where('id', $valueID)
            ->where('attribute_id', $attributeID)
            ->firstOrFail();

        $attributeValue->delete();
    }
}
