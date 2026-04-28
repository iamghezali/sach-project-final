<?php

namespace App\Features\CustomOrder\ClothingOrder\Controllers\Shop;

use App\Features\CustomOrder\ClothingOrder\Actions\CreateClothingOrderAction;
use App\Features\CustomOrder\ClothingOrder\Actions\ListClothingOrdersAction;
use App\Features\CustomOrder\ClothingOrder\Actions\ShowClothingOrderAction;
use App\Features\CustomOrder\ClothingOrder\Data\Shop\Request\ClothingOrderRequestData;
use App\Features\CustomOrder\ClothingOrder\Data\Shop\Response\ClothingOrderData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClothingOrderController extends Controller
{
    public function __construct(
        private readonly CreateClothingOrderAction $createClothingOrderAction,
        private readonly ShowClothingOrderAction $showClothingOrderAction,
        private readonly ListClothingOrdersAction $listClothingOrdersAction,
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
}
