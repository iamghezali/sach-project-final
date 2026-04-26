<?php

use App\Features\Catalog\Attribute\Controllers\Dashboard\AttributeController;
use App\Features\Catalog\Attribute\Controllers\Dashboard\AttributeValueController;
use Illuminate\Support\Facades\Route;

Route::prefix('attributes')
    ->name('attributes.')
    ->group(function () {

        /**
         * Attribute
         */
        Route::get('/', [AttributeController::class, 'index'])->name('index');
        Route::get('/{attributeID}', [AttributeController::class, 'show'])->name('show');
        Route::post('/', [AttributeController::class, 'store'])->name('store');
        Route::put('/{attributeID}', [AttributeController::class, 'update'])->name('update');
        Route::delete('/{attributeID}', [AttributeController::class, 'destroy'])->name('destroy');

        /**
         * Attribute Values
         */
        Route::prefix('/{attributeID}/values')->name('values.')->group(function () {

            Route::post('/', [AttributeValueController::class, 'store'])->name('store');
            Route::put('/{valueID}', [AttributeValueController::class, 'update'])->name('update');
            Route::delete('/{valueID}', [AttributeValueController::class, 'destroy'])->name('destroy');

        });

    });
