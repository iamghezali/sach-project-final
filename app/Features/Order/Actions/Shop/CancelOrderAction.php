<?php

namespace App\Features\Order\Actions\Shop;

use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Exceptions\OrderException;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CancelOrderAction
{
    private const CANCELLABLE_STATUSES = [
        OrderStatus::Pending,
        OrderStatus::Confirmed,
    ];

    public function execute($orderID, User $user): Order
    {
        $order = Order::findOrFail($orderID);

        if ($order->user_id !== $user->id) {
            throw OrderException::notFound();
        }

        if (! \in_array($order->status, self::CANCELLABLE_STATUSES)) {
            throw OrderException::notCancellable($order->status);
        }

        $order->loadMissing('items.productVariant');

        return DB::transaction(function () use ($order) {
            $order->items->each(
                fn ($item) => $item->productVariant->restoreStock($item->quantity)
            );

            $order->update(['status' => OrderStatus::Cancelled]);

            return $order->refresh();
        });
    }
}
