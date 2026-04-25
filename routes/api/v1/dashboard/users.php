<?php

Route::prefix('users')
    ->name('users.')
    ->group(function () {

        /**
         * customers
         */
        Route::prefix('/customers')
            ->name('customers.')
            ->group(function () {

                Route::get('/', fn () => 'index')->name('index');
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

                Route::get('/', fn () => 'index')->name('index');
                Route::get('/{id}', fn () => 'show')->name('show');
                Route::post('/', fn () => 'store')->name('store');
                Route::put('/{id}', fn () => 'update')->name('update');
                Route::delete('/{id}', fn () => 'destroy')->name('destroy');

            });

        /**
         * editors
         */
        Route::prefix('/editors')
            ->name('editors.')
            ->group(function () {

                Route::get('/', fn () => 'index')->name('index');
                Route::get('/{id}', fn () => 'show')->name('show');
                Route::post('/', fn () => 'store')->name('store');
                Route::put('/{id}', fn () => 'update')->name('update');
                Route::delete('/{id}', fn () => 'destroy')->name('destroy');

            });
    });
