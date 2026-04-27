<?php

namespace App\Features\Order\Controllers\Shop;

use App\Features\Order\Actions\Shop\CancelOrderAction;
use App\Features\Order\Actions\Shop\CreateOrderAction;
use App\Features\Order\Actions\Shop\ListOrdersAction;
use App\Features\Order\Actions\Shop\ShowOrderAction;
use App\Features\Order\Data\Shop\Request\StoreOrderRequestData;
use App\Features\Order\Data\Shop\Response\OrderData;
use App\Features\Order\Exceptions\OrderException;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    public function __construct(
        private readonly ListOrdersAction $listOrdersAction,
        private readonly CreateOrderAction $createOrderAction,
        private readonly ShowOrderAction $showOrderAction,
        private readonly CancelOrderAction $cancelOrderAction,
    ) {}

    public function index()
    {
        $orders = $this->listOrdersAction->execute(auth()->user());

        return response()->json($orders);
    }

    public function show(string $orderID)
    {
        try {

            $order = $this->showOrderAction->execute($orderID, auth()->user());

            return response()->json([
                'data' => OrderData::fromModel($order)->include('shippingAddress', 'billingAddress', 'items'),
            ]);

        } catch (OrderException $e) {

            return response()->json([
                'message' => $e->getMessage(),
            ], 422);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => 'Order not found.',
            ], 404);

        }
    }

    public function store(StoreOrderRequestData $data)
    {
        try {
            $order = $this->createOrderAction->execute($data, auth()->user());

            return response()->json([
                'message' => 'Order created successfully.',
                'data' => OrderData::fromModel($order)->include('shippingAddress', 'billingAddress', 'items'),
            ], 201);

        } catch (OrderException $e) {

            return response()->json([
                'error' => 'Order Failed',
                'message' => $e->getMessage(),
            ], 422);

        }
    }

    public function cancel(string $orderID)
    {
        try {

            $order = $this->cancelOrderAction->execute($orderID, auth()->user());

            return response()->json([
                'message' => 'Order cancelled successfully.',
                'data' => $order,
            ]);

        } catch (OrderException $e) {

            return response()->json([
                'message' => $e->getMessage(),
            ], 422);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => 'Order not found.',
            ], 404);

        }
    }
}
