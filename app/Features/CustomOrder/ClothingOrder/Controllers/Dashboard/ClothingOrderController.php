<?php

namespace App\Features\CustomOrder\ClothingOrder\Controllers\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\AssignClothingOrderItemsAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\AttachClothingOrderOfferAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\ChangeClothingOrderItemStatusAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\ChangeClothingOrderStatusAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\ListClothingOrdersAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\ShowClothingOrderAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Dashboard\ShowClothingOrderItemAction;
use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\AssignOrderItemsRequestData;
use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\AttachOfferRequestData;
use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\ChangeClothingOrderItemStatusRequestData;
use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\ChangeClothingOrderStatusRequestData;
use App\Http\Controllers\Controller;

class ClothingOrderController extends Controller
{
    public function __construct(
        private readonly ListClothingOrdersAction $listClothingOrdersAction,
        private readonly ShowClothingOrderAction $showClothingOrderAction,
        private readonly ShowClothingOrderItemAction $showClothingOrderItemAction,
        private readonly ChangeClothingOrderStatusAction $changeClothingOrderStatusAction,
        private readonly ChangeClothingOrderItemStatusAction $changeClothingOrderItemStatusAction,
        private readonly AttachClothingOrderOfferAction $attachClothingOrderOfferAction,
        private readonly AssignClothingOrderItemsAction $assignClothingOrderItemsAction,
    ) {}

    public function index()
    {
        $orders = $this->listClothingOrdersAction->execute();

        return response()->json($orders);
    }

    public function showOrder(int $orderID)
    {
        $order = $this->showClothingOrderAction->execute($orderID);

        return response()->json($order);
    }

    public function showOrderItem(int $orderID, int $itemID)
    {
        $orderItem = $this->showClothingOrderItemAction->execute($orderID, $itemID);

        return response()->json($orderItem);
    }

    public function attachOrderOffer(AttachOfferRequestData $data, int $orderID)
    {
        return $this->attachClothingOrderOfferAction->execute($orderID, $data->items->toCollection());
    }

    public function updateOrderStatus(int $orderID, ChangeClothingOrderStatusRequestData $data)
    {
        return $this->changeClothingOrderStatusAction->execute($orderID, $data);
    }

    public function updateOrderItemStatus(int $itemID, ChangeClothingOrderItemStatusRequestData $data)
    {
        return $this->changeClothingOrderItemStatusAction->execute($itemID, $data);
    }

    public function assignOrderItems(AssignOrderItemsRequestData $data, int $orderID)
    {
        return $this->assignClothingOrderItemsAction->execute($data, $orderID);
    }
}
