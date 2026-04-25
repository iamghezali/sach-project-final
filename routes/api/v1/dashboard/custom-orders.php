<?php

use Illuminate\Support\Facades\Route;

Route::prefix('custom-orders')
    ->name('custom-orders.')
    ->group(function () {

        /**
         * Order
         */
        Route::get('/', fn () => 'index')->name('index');
        Route::get('/{orderID}', fn () => 'show')->name('show');
        Route::patch('/{orderID}/status', fn () => 'change status')->name('status');
        Route::patch('/{orderID}/assign', fn () => 'assign all')->name('assign');

        /**
         * Order item
         */
        Route::prefix('/{orderID}/items')
            ->name('items.')
            ->group(function () {

                Route::get('/{itemID}', fn () => 'show')->name('show');
                Route::put('/{itemID}', fn () => 'update')->name('update');
                Route::patch('/{itemID}/status', fn () => 'change status')->name('status');
                Route::patch('/{itemID}/assign', fn () => 'assign one')->name('status');

            });

    });
