<?php

use Illuminate\Support\Facades\Route;

Route::prefix('products')
    ->name('products.')
    ->group(function () {

        /**
         * Product
         */
        Route::get('/', fn () => 'index')->name('index');
        Route::get('/{productID}', fn () => 'show')->name('show');
        Route::post('/', fn () => 'store')->name('store');
        Route::put('/{productID}', fn () => 'update')->name('update');
        Route::delete('/{productID}', fn () => 'destroy')->name('destroy');

        Route::put('/{productID}/attributes', fn () => 'assign attributes')->name('destroy');
        Route::patch('/{productID}/status', fn () => 'change status')->name('status');

        /**
         * Product Variants
         */
        Route::prefix('/{productID}/variants')
            ->name('variants.')
            ->group(function () {

                Route::get('/', fn () => 'index')->name('index');
                Route::get('/{variantID}', fn () => 'show')->name('show');
                Route::post('/', fn () => 'store')->name('store');
                Route::put('/{variantID}', fn () => 'update')->name('update');
                Route::delete('/{variantID}', fn () => 'destroy')->name('destroy');

                Route::patch('/{variantID}/status', fn () => 'change status')->name('active');
                Route::patch('/{variantID}/default', fn () => 'make default')->name('default');
            });

    });
