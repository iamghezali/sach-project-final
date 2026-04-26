<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Models\Attribute;

class ShowAttributeAction
{
    public function execute(string $attributeID): Attribute
    {
        $attribute = Attribute::findOrFail($attributeID);
        $attribute->load('values');

        return $attribute;
    }
}
