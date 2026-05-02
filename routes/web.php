<?php

use App\Authorization\Enums\Role;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('welcome'))->name('welcome');

Route::middleware('guest')->group(function () {

    Route::get('/login', fn () => Inertia::render('auth/login'))->name('login');
    Route::get('/register', fn () => Inertia::render('auth/register'))->name('register');

});

/**
 * Shop routes
 */
Route::prefix('shop')->name('shop.')
    ->group(function () {

        Route::get('/checkout', fn () => Inertia::render('shop/checkout'))->name('checkout');
        Route::get('/custom-order', fn () => Inertia::render('shop/custom-order'))->name('custom-order');

        /**
         * Shop routes that requires Auth
         */
        Route::middleware(['auth:sanctum', Role::accept(Role::CUSTOMER)])->group(function () {

            Route::get('/orders/my', fn () => Inertia::render('shop/orders/my'))->name('orders.my');

        });

    });

/**
 * Tailor routes
 */
Route::prefix('tailor')->name('tailor.')
    ->middleware(['auth:sanctum', Role::accept(Role::TAILOR)])
    ->group(function () {

        Route::get('/', fn () => Inertia::render('tailor/overview'))->name('overview');

    });

/**
 * Dashboard routes
 */
Route::prefix('dashboard')->name('dashboard.')
    ->middleware(['auth:sanctum', Role::accept(Role::ADMIN, Role::EDITOR)])
    ->group(function () {

        Route::get('/', fn () => Inertia::render('dashboard/overview'))->name('overview');

        /**
         * Store Management
         */
        Route::get('/store/products', fn () => Inertia::render('dashboard/store/products/listing'))->name('store.products');
        Route::get('/store/products/{id}', fn ($id) => Inertia::render('dashboard/store/products/details', [
            'id' => $id,
        ]))->name('store.products.details');

        Route::get('/store/attributes', fn () => Inertia::render('dashboard/store/attributes/listing'))->name('store.attributes');

    });
