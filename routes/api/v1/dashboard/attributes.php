<?php

use Illuminate\Support\Facades\Route;

Route::prefix('attributes')
    ->name('attributes.')
    ->group(function () {

        /**
         * Attribute
         */
        Route::get('/', fn () => 'index')->name('index');
        Route::get('/{attributeID}', fn () => 'show')->name('show');
        Route::post('/', fn () => 'store')->name('store');
        Route::put('/{attributeID}', fn () => 'update')->name('update');
        Route::delete('/{attributeID}', fn () => 'destroy')->name('destroy');

        /**
         * Attribute Values
         */
        Route::prefix('/{attributeID}/values')->name('values.')->group(function () {

            Route::post('/', fn () => 'store')->name('store');
            Route::put('/{valueID}', fn () => 'update')->name('update');
            Route::delete('/{valueID}', fn () => 'destroy')->name('destroy');

        });

    });
