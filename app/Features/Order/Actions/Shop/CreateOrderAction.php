<?php

namespace App\Features\Order\Actions\Shop;

use App\Features\Order\Data\Shop\Request\StoreOrderRequestData;
use App\Features\Order\Enums\OrderStatus;
use App\Features\Order\Exceptions\OrderException;
use App\Models\Address;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CreateOrderAction
{
    public function execute(StoreOrderRequestData $data, User $user): Order
    {
        return DB::transaction(function () use ($data, $user) {
            $requestedItems = collect($data->items)
                ->keyBy('product_variant_id');

            $variants = $this->validateAndLockVariants($requestedItems);
            $shippingAddress = $this->createShippingAddress($data, $user);
            $billingAddress = $this->createBillingAddress($data, $user);

            $order = $this->createOrder(
                $data,
                $user,
                $shippingAddress->id,
                $billingAddress->id,
            );
            $this->createOrderItems(
                $order,
                $requestedItems,
                $variants
            );

            $this->decrementStock($variants, $requestedItems);

            return $order->load([
                'shippingAddress',
                'billingAddress',
                'items.productVariant',
            ]);
        });
    }

    private function validateAndLockVariants(Collection $requestedItems): Collection
    {

        $variants = ProductVariant::whereIn('id', $requestedItems->keys())
            ->with('product')
            ->lockForUpdate()
            ->get()
            ->keyBy('id');

        if ($variants->count() !== $requestedItems->count()) {
            throw OrderException::variantNotFound();
        }

        foreach ($variants as $variant) {
            $requestedQty = $requestedItems->get($variant->id)['quantity'];

            if ($variant->product->status->value !== 'published' || ! $variant->is_active) {
                throw OrderException::variantNotFound();
            }

            if ($requestedQty > $variant->stock_quantity) {
                throw OrderException::insufficientStock(
                    "{$variant->product->name} {$variant->label()}"
                );
            }
        }

        return $variants;
    }

    private function createShippingAddress(StoreOrderRequestData $data, User $user): Address
    {
        return Address::create([
            ...$data->shipping_address->toArray(),
            'user_id' => $user->id,
        ]);
    }

    private function createBillingAddress(StoreOrderRequestData $data, User $user): Address
    {
        return Address::create([
            ...$data->billing_address->toArray(),
            'user_id' => $user->id,
        ]);
    }

    private function createOrder(
        StoreOrderRequestData $data,
        User $user,
        int $shippingAddressId,
        int $billingAddressId,
    ): Order {

        return Order::create([
            'user_id' => $user->id,
            'shipping_address_id' => $shippingAddressId,
            'billing_address_id' => $billingAddressId,
            'status' => OrderStatus::Pending->value,
            'notes' => $data->notes ?? null,
        ]);
    }

    private function createOrderItems(Order $order, Collection $requestedItems, Collection $variants): void
    {
        $items = $requestedItems->map(function ($item) use ($order, $variants) {
            $variant = $variants->get($item['product_variant_id']);

            return [
                'order_id' => $order->id,
                'product_variant_id' => $item['product_variant_id'],
                'sku' => $variant->sku,
                'product_name' => $variant->product->name,
                'variant_name' => $variant->label(),
                'quantity' => $item['quantity'],
                'unit_price' => $variant->price,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->values()->all();

        $order->items()->insert($items);
    }

    private function decrementStock(Collection $variants, Collection $requestedItems): void
    {
        foreach ($variants as $variant) {
            $variant->decrementStock($requestedItems->get($variant->id)['quantity']);
        }
    }
}
