<?php

namespace App\Features\Order\Actions\Dashboard;

use App\Models\Order;

class ShowOrderAction
{
    public function execute(string $orderID): Order
    {
        $order = Order::with([
            'user',
            'items.productVariant.attributeValues',
            'shippingAddress',
            'billingAddress'])
            ->findOrFail($orderID);

        return $order;
    }
}
