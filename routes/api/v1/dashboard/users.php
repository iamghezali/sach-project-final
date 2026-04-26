<?php

use App\Features\User\Customer\Controllers\Dashboard\CustomerController;
use App\Features\User\Editor\Controllers\Dashboard\EditorController;
use App\Features\User\Tailor\Controllers\Dashboard\TailorController;

Route::prefix('users')
    ->name('users.')
    ->group(function () {

        /**
         * customers
         */
        Route::prefix('/customers')
            ->name('customers.')
            ->group(function () {

                Route::get('/', [CustomerController::class, 'index'])->name('index');
                Route::get('/{id}', fn () => 'show')->name('show');
                Route::post('/', fn () => 'store')->name('store');
                Route::put('/{id}', fn () => 'update')->name('update');
                Route::delete('/{id}', fn () => 'destroy')->name('destroy');

            });

        /**
         * tailors
         */
        Route::prefix('/tailors')
            ->name('tailors.')
            ->group(function () {

                Route::get('/', [TailorController::class, 'index'])->name('index');
                Route::get('/{id}', fn () => 'show')->name('show');
                Route::post('/', [TailorController::class, 'register'])->name('register');
                Route::put('/{id}', fn () => 'update')->name('update');
                Route::delete('/{id}', fn () => 'destroy')->name('destroy');

            });

        /**
         * editors
         */
        Route::prefix('/editors')
            ->name('editors.')
            ->group(function () {

                Route::get('/', [EditorController::class, 'index'])->name('index');
                Route::get('/{id}', fn () => 'show')->name('show');
                Route::post('/', [EditorController::class, 'register'])->name('register');
                Route::put('/{id}', fn () => 'update')->name('update');
                Route::delete('/{id}', fn () => 'destroy')->name('destroy');

            });
    });
