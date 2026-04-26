<?php

namespace App\Features\Catalog\Attribute\Actions\Dashboard;

use App\Models\Attribute;

class RemoveAttributeAction
{
    public function execute(string $attributeID)
    {
        $attribute = Attribute::findOrFail($attributeID);
        $attribute->delete();
    }
}
