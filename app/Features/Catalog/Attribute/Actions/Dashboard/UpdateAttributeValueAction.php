<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Features\Catalog\Attribute\Data\Dashboard\Request\UpdateAttributeValueRequestData;
use App\Models\AttributeValue;

class UpdateAttributeValueAction
{
    public function execute(UpdateAttributeValueRequestData $data, string $attributeID, string $valueID): AttributeValue
    {
        $attributeValue = AttributeValue::where('id', $valueID)
            ->where('attribute_id', $attributeID)
            ->firstOrFail();

        $attributeValue->update($data->toArray());

        return $attributeValue->fresh();
    }
}
