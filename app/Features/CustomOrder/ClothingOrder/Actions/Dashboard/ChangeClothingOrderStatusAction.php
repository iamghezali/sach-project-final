<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\ChangeClothingOrderStatusRequestData;
use App\Models\ClothingOrder;

class ChangeClothingOrderStatusAction
{
    public function execute(int $clothingOrderID, ChangeClothingOrderStatusRequestData $data): ClothingOrder
    {
        $clothingOrder = ClothingOrder::findOrFail($clothingOrderID);

        $clothingOrder->update(['status' => $data->status]);

        return $clothingOrder->fresh();
    }
}
