<?php

use App\Features\CustomOrder\ClothingOrder\Controllers\Dashboard\ClothingOrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('custom-orders')
    ->name('custom-orders.')
    ->group(function () {

        /**
         * Order
         */
        Route::get('/', [ClothingOrderController::class, 'index']);
        Route::get('{orderID}', [ClothingOrderController::class, 'showOrder']);
        Route::put('{orderID}/offer', [ClothingOrderController::class, 'attachOrderOffer']);
        Route::patch('{orderID}/status', [ClothingOrderController::class, 'updateOrderStatus']);
        Route::patch('{orderID}/assign', [ClothingOrderController::class, 'assignOrderItems']);

        /**
         * Order item
         */
        Route::prefix('/{orderID}/items')
            ->name('items.')
            ->group(function () {

                Route::get('/{itemID}', [ClothingOrderController::class, 'showOrderItem']);
                Route::patch('/{itemID}/status', [ClothingOrderController::class, 'updateOrderItemStatus']);

            });

    });
