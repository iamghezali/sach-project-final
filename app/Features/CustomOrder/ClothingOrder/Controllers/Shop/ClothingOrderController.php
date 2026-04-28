<?php

namespace App\Features\CustomOrder\ClothingOrder\Controllers\Shop;

use App\Features\CustomOrder\ClothingOrder\Actions\Shop\AcceptClothingOrderOfferAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Shop\CreateClothingOrderAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Shop\ListClothingOrdersAction;
use App\Features\CustomOrder\ClothingOrder\Actions\Shop\ShowClothingOrderAction;
use App\Features\CustomOrder\ClothingOrder\Data\Shop\Request\ClothingOrderRequestData;
use App\Features\CustomOrder\ClothingOrder\Data\Shop\Response\ClothingOrderData;
use App\Http\Controllers\Controller;
use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use Illuminate\Http\Request;

class ClothingOrderController extends Controller
{
    public function __construct(
        private readonly CreateClothingOrderAction $createClothingOrderAction,
        private readonly ShowClothingOrderAction $showClothingOrderAction,
        private readonly ListClothingOrdersAction $listClothingOrdersAction,
        private readonly AcceptClothingOrderOfferAction $acceptClothingOrderOfferAction,
    ) {}

    public function index(Request $request)
    {
        $orders = $this->listClothingOrdersAction->execute($request->user());

        return response()->json($orders);
    }

    public function store(ClothingOrderRequestData $data, Request $request)
    {
        $order = $this->createClothingOrderAction->execute($request->user(), $data);

        return response()->json([
            'message' => 'Custom Order Placed successfully',
            'data' => ClothingOrderData::from($order),
        ], 201);
    }

    public function show(int $orderID, Request $request)
    {
        $order = $this->showClothingOrderAction->execute($request->user(), $orderID);

        return response()->json([
            'data' => ClothingOrderData::from($order),
        ]);
    }

    public function cancelItem(ClothingOrder $order, ClothingOrderItem $item)
    {
        $order = $this->acceptClothingOrderOfferAction->execute($order, false, $item);

        return response()->json(ClothingOrderData::fromModel($order));
    }

    public function resolveOrder(ClothingOrder $order, Request $request)
    {
        $order = $this->acceptClothingOrderOfferAction->execute($order, $request->boolean('accept'));

        return response()->json(ClothingOrderData::fromModel($order));
    }
}
