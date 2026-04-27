<?php

namespace App\Features\Order\Actions\Shop;

use App\Features\Order\Exceptions\OrderException;
use App\Models\Order;
use App\Models\User;

class ShowOrderAction
{
    public function execute($orderID, User $user): Order
    {
        $order = Order::findOrFail($orderID);

        if ($order->user_id !== $user->id) {
            throw OrderException::notFound();
        }

        $order->loadMissing(['items.productVariant.attributeValues', 'shippingAddress', 'billingAddress']);

        return $order;
    }
}
