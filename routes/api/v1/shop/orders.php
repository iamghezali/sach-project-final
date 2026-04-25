<?php

use Illuminate\Support\Facades\Route;

Route::prefix('orders')
    ->name('orders.')
    ->group(function () {

        Route::get('/', fn () => 'index')->name('index');
        Route::get('/{id}', fn () => 'show')->name('show');
        Route::post('/', fn () => 'store')->name('store');
        Route::patch('/{id}/cancel', fn () => 'cancel')->name('cancel');

    });
