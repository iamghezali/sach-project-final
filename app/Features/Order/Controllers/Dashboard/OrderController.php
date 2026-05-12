<?php

namespace App\Features\Order\Controllers\Dashboard;

use App\Features\Order\Actions\Dashboard\ChangeOrderStatusAction;
use App\Features\Order\Actions\Dashboard\ListOrdersAction;
use App\Features\Order\Actions\Dashboard\RemoveOrderAction;
use App\Features\Order\Actions\Dashboard\ShowOrderAction;
use App\Features\Order\Data\Dashboard\Request\ChangeOrderStatusRequestData;
use App\Features\Order\Data\Dashboard\Response\OrderData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    public function __construct(
        private readonly ListOrdersAction $listOrdersAction,
        private readonly ShowOrderAction $showOrderAction,
        private readonly RemoveOrderAction $removeOrderAction,
        private readonly ChangeOrderStatusAction $changeOrderStatusAction,
    ) {}

    public function index()
    {
        $orders = $this->listOrdersAction->execute();

        return response()->json($orders);
    }

    public function show(string $orderID)
    {
        try {

            $order = $this->showOrderAction->execute($orderID);

            return response()->json([
                'data' => OrderData::from($order)->include('shippingAddress', 'billingAddress', 'items', 'customer'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => 'Order not found.',
            ], 404);

        }
    }

    public function changeStauts(ChangeOrderStatusRequestData $data, string $orderID)
    {
        try {

            $order = $this->changeOrderStatusAction->execute($data, $orderID);

            return response()->json([
                'message' => "Order Status updated to {$data->status->value}.",
                'data' => OrderData::from($order),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => 'Order not found.',
            ], 404);

        }
    }

    public function destroy(string $orderID)
    {
        try {

            $this->removeOrderAction->execute($orderID);

            return response()->json([
                'message' => 'Order removed Successfully.',
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => 'Order not found.',
            ], 404);

        }
    }
}
