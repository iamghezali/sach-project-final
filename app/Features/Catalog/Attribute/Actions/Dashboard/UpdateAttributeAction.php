<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Features\Catalog\Attribute\Data\Dashboard\Request\UpdateAttributeRequestData;
use App\Models\Attribute;

class UpdateAttributeAction
{
    public function execute(UpdateAttributeRequestData $data, string $attributeID): Attribute
    {
        $attribute = Attribute::findOrFail($attributeID);
        $attribute->update($data->toArray());

        return $attribute->fresh();
    }
}
