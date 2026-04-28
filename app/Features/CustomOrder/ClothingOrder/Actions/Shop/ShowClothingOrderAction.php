<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Shop;

use App\Models\ClothingOrder;
use App\Models\User;

class ShowClothingOrderAction
{
    public function execute(User $user, int $orderId): ClothingOrder
    {
        return ClothingOrder::query()
            ->where('user_id', $user->id)
            ->with(['items'])
            ->findOrFail($orderId);
    }
}
