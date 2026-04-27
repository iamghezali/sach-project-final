<?php

namespace App\Features\Order\Actions\Dashboard;

use App\Features\Order\Data\Dashboard\Request\ChangeOrderStatusRequestData;
use App\Models\Order;

class ChangeOrderStatusAction
{
    public function execute(ChangeOrderStatusRequestData $data, string $orderID): Order
    {
        $order = Order::findOrFail($orderID);
        $order->update(['status' => $data->status]);

        return $order->fresh();
    }
}
