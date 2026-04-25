<?php

use Illuminate\Support\Facades\Route;

Route::prefix('orders')
    ->name('orders.')
    ->group(function () {

        /**
         * Order
         */
        Route::get('/', fn () => 'index')->name('index');
        Route::get('/{orderID}', fn () => 'show')->name('show');

        /**
         * Order item
         */
        Route::prefix('/{orderID}/items')
            ->name('items.')
            ->group(function () {

                Route::get('/{itemID}', fn () => 'show')->name('show');
                Route::patch('/{itemID}/mark-done', fn () => 'mark done')->name('mark-done');

            });

    });
