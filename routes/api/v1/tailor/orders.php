<?php

use App\Features\CustomOrder\ClothingOrder\Controllers\Tailor\ClothingOrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('orders')
    ->name('orders.')
    ->group(function () {

        /**
         * Statistics
         */
        Route::get('/stats', [ClothingOrderController::class, 'stats'])->name('stats');

        /**
         * Order
         */
        Route::get('/', [ClothingOrderController::class, 'index'])->name('index');
        Route::get('/{orderID}', [ClothingOrderController::class, 'show'])->name('show');

        /**
         * Order item
         */
        Route::prefix('/{orderID}/items')
            ->name('items.')
            ->group(function () {

                Route::get('/{itemID}', [ClothingOrderController::class, 'showItem'])->name('show');
                Route::patch('/{itemID}/mark-done', [ClothingOrderController::class, 'markItemDone'])->name('mark-done');

            });

    });
