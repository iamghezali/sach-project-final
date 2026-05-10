<?php

namespace App\Features\CustomOrder\ClothingOrder\Controllers\Tailor;

use App\Features\CustomOrder\ClothingOrder\Actions\Tailor\ListClothingOrdersAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Tailor\MarkClothingOrderItemAsDoneAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Tailor\ShowClothingOrderAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Tailor\ShowClothingOrderItemAction;
use App\Features\CustomOrder\ClothingOrder\Data\Tailor\Response\ClothingOrderData;
use App\Features\CustomOrder\ClothingOrder\Data\Tailor\Response\ClothingOrderItemData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClothingOrderController extends Controller
{
    public function __construct(
        private readonly ListClothingOrdersAction $listClothingOrdersAction,
        private readonly ShowClothingOrderAction $showClothingOrderAction,
        private readonly MarkClothingOrderItemAsDoneAction $markClothingOrderItemAsDoneAction,
        private readonly ShowClothingOrderItemAction $showClothingOrderItemAction,
    ) {}

    public function index(Request $request)
    {
        $orders = $this->listClothingOrdersAction->execute($request->user());

        return $orders;
    }

    public function show(int $orderID, Request $request)
    {
        $order = $this->showClothingOrderAction->execute($orderID, $request->user());

        return ClothingOrderData::from($order)->include('items');
    }

    public function showItem(Request $request, int $orderID, int $itemID)
    {
        $orderItem = $this->showClothingOrderItemAction
            ->execute($request->user(), $orderID, $itemID);

        return ClothingOrderItemData::from($orderItem);
    }

    public function markItemDone(Request $request, int $orderID, int $itemID)
    {
        $orderItem = $this->markClothingOrderItemAsDoneAction
            ->execute($request->user(), $orderID, $itemID);

        return ClothingOrderItemData::from($orderItem);
    }
}
