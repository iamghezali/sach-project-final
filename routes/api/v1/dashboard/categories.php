<?php

use App\Features\Catalog\Category\Controllers\Dashboard\CategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')
    ->name('categories.')
    ->group(function () {

        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::post('/', [CategoryController::class, 'store'])->name('store');
        Route::put('/{categoryID}', [CategoryController::class, 'update'])->name('update');
        Route::delete('/{categoryID}', [CategoryController::class, 'destroy'])->name('destroy');

    });
