<?php

use App\Features\CustomOrder\ClothingOrder\Controllers\Shop\ClothingOrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('custom-orders')
    ->name('custom-orders.')
    ->group(function () {

        /**
         * Order
         */
        Route::get('/', fn () => 'index')->name('index');
        Route::post('/', [ClothingOrderController::class, 'store'])->name('store');
        Route::get('/{orderID}', fn () => 'show')->name('show');
        Route::patch('/{orderID}/decide', fn () => 'decide')->name('decide');

        /**
         * Order item
         */
        Route::prefix('/{orderID}/items')
            ->name('items.')
            ->group(function () {

                Route::get('/{itemID}', fn () => 'show')->name('show');
                Route::patch('/{itemID}/cancel', fn () => 'cancel')->name('status');

            });

    });
