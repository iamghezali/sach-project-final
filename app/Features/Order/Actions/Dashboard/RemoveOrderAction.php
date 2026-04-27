<?php

namespace App\Features\Order\Actions\Dashboard;

use App\Models\Order;

class RemoveOrderAction
{
    public function execute(string $orderID)
    {
        $order = Order::findOrFail($orderID);
        $order->delete();
    }
}
