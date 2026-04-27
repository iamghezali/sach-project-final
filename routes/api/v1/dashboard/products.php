<?php

use App\Features\Catalog\Product\Controllers\Dashboard\ProductController;
use App\Features\Catalog\Product\Controllers\Dashboard\ProductVariantController;
use App\Features\Catalog\Product\Controllers\Dashboard\ProductVariantImageController;
use Illuminate\Support\Facades\Route;

Route::prefix('products')
    ->name('products.')
    ->group(function () {

        /**
         * Product
         */
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::get('/{productID}', [ProductController::class, 'show'])->name('show');
        Route::post('/', [ProductController::class, 'store'])->name('store');
        Route::put('/{productID}', [ProductController::class, 'update'])->name('update');
        Route::delete('/{productID}', [ProductController::class, 'destroy'])->name('destroy');

        Route::put('/{productID}/attributes', [ProductController::class, 'assignAttribute'])->name('attributes');
        Route::patch('/{productID}/status', [ProductController::class, 'changeStatus'])->name('status');

        /**
         * Product Variants
         */
        Route::prefix('/{productID}/variants')
            ->name('variants.')
            ->group(function () {

                Route::get('/{variantID}', [ProductVariantController::class, 'show'])->name('show');
                Route::post('/', [ProductVariantController::class, 'store'])->name('store');
                Route::put('/{variantID}', [ProductVariantController::class, 'update'])->name('update');
                Route::delete('/{variantID}', [ProductVariantController::class, 'destroy'])->name('destroy');

                Route::patch('/{variantID}/status', [ProductVariantController::class, 'changeStatus'])->name('status');
                Route::patch('/{variantID}/default', [ProductVariantController::class, 'default'])->name('default');

                Route::post('/{variantID}/images', [ProductVariantImageController::class, 'store'])->name('images.store');
                Route::delete('/{variantID}/images/{mediaUUID}', [ProductVariantImageController::class, 'destroy'])->name('images.destroy');
                Route::patch('/{variantID}/images/reorder', [ProductVariantImageController::class, 'reorder'])->name('images.reorder');

            });

    });
