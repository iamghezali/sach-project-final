<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Shop;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AcceptClothingOrderOfferAction
{
    public function execute(int $orderId, bool $accept, ?int $itemId = null): ClothingOrder
    {
        return DB::transaction(function () use ($orderId, $accept, $itemId) {
            $order = ClothingOrder::findOrFail($orderId);

            if ($itemId !== null) {
                $item = ClothingOrderItem::findOrFail($itemId);
                $this->ensureItemIsDeclinable($item);
                $this->ensureOrderIsNegotiable($order);
                $this->declineItem($order, $item);
            } else {
                if ($accept) {
                    $this->ensureOrderIsOffered($order);
                    $this->acceptOrder($order);
                } else {
                    $this->ensureOrderIsCancellable($order);
                    $this->cancelOrder($order);
                }
            }

            return $order->load('items');
        });
    }

    // --- Guards ---

    private function ensureOrderIsOffered(ClothingOrder $order): void
    {
        if ($order->status !== ClothingOrderStatus::Offered) {
            throw ValidationException::withMessages([
                'accept' => 'The order can only be accepted when it is in offered status.',
            ]);
        }
    }

    private function ensureOrderIsCancellable(ClothingOrder $order): void
    {
        if (! \in_array($order->status, [ClothingOrderStatus::Offered, ClothingOrderStatus::Negotiating], true)) {
            throw ValidationException::withMessages([
                'accept' => 'The order can only be cancelled when it is offered or negotiating.',
            ]);
        }
    }

    private function ensureOrderIsNegotiable(ClothingOrder $order): void
    {
        if (! \in_array($order->status, [ClothingOrderStatus::Offered, ClothingOrderStatus::Negotiating], true)) {
            throw ValidationException::withMessages([
                'status' => 'Individual items can only be declined when the order is offered or negotiating.',
            ]);
        }
    }

    private function ensureItemIsDeclinable(ClothingOrderItem $item): void
    {
        if ($item->status !== ClothingOrderItemStatus::Offered) {
            throw ValidationException::withMessages([
                'item_id' => 'Only offered items can be declined.',
            ]);
        }
    }

    // --- Mutations ---

    private function acceptOrder(ClothingOrder $order): void
    {
        $order->items()
            ->where('status', ClothingOrderItemStatus::Offered->value)
            ->update(['status' => ClothingOrderItemStatus::Accepted->value]);

        $order->update(['status' => ClothingOrderStatus::Accepted]);
    }

    private function cancelOrder(ClothingOrder $order): void
    {
        $order->items()->update(['status' => ClothingOrderItemStatus::Cancelled->value]);
        $order->update(['status' => ClothingOrderStatus::Cancelled]);
    }

    private function declineItem(ClothingOrder $order, ClothingOrderItem $item): void
    {
        $item->update([
            'status' => ClothingOrderItemStatus::Negotiating,
            'offer_price' => null,
            'offer_due_date' => null,
        ]);

        $order->update(['status' => ClothingOrderStatus::Negotiating]);
    }
}
