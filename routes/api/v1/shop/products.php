<?php

use Illuminate\Support\Facades\Route;

Route::prefix('products')
    ->name('products.')
    ->group(function () {

        Route::get('/', fn () => 'index')->name('index');
        Route::get('/{slug}', fn () => 'show')->name('show');

    });
