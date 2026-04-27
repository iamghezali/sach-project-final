<?php

namespace App\Features\CustomOrder\ClothingOrder\Controllers\Shop;

use App\Features\CustomOrder\ClothingOrder\Data\Shop\Request\ClothingOrderRequestData;
use App\Http\Controllers\Controller;

class ClothingOrderController extends Controller
{
    public function store(ClothingOrderRequestData $data)
    {
        return $data->toArray();
    }
}
