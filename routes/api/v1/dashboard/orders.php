<?php

use App\Features\Order\Controllers\Dashboard\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('orders')
    ->name('orders.')
    ->group(function () {

        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/{id}', [OrderController::class, 'show'])->name('show');
        Route::patch('/{id}/status', [OrderController::class, 'changeStauts'])->name('status');

    });
