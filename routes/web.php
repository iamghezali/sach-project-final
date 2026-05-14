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

        Route::get('/', fn () => Inertia::render('shop/listing'))->name('listing');
        Route::get('/product/{slug}', fn ($slug) => Inertia::render('shop/product', [
            'slug' => $slug,
        ]))->name('product.details');

        Route::get('/cart', fn () => Inertia::render('shop/cart'))->name('cart');
        Route::get('/checkout', fn () => Inertia::render('shop/checkout'))->name('checkout');

        /**
         * Shop routes that requires Auth
         */
        Route::middleware(['auth:sanctum', Role::accept(Role::CUSTOMER)])->group(function () {

            Route::get('/orders/my', fn () => Inertia::render('shop/orders/my'))->name('orders.my');
            Route::get('/orders/my/{id}/order', fn ($id) => Inertia::render('shop/orders/details', [
                'id' => $id,
            ]))->name('orders.my.order');

            Route::get('/orders/my/{id}/custom-order', fn ($id) => Inertia::render('shop/orders/custom-order-folder', [
                'id' => $id,
            ]))->name('orders.my.custom-order');

            Route::get('/orders/my/{orderID}/custom-order/item/{itemID}', fn ($orderID, $itemID) => Inertia::render('shop/orders/custom-order-details', [
                'orderID' => $orderID,
                'itemID' => $itemID,
            ]))->name('orders.my.custom-order.item');

            Route::get('/custom-order', fn () => Inertia::render('shop/custom-order'))->name('custom-order');

        });

    });

/**
 * Tailor routes
 */
Route::prefix('tailor')->name('tailor.')
    ->middleware(['auth:sanctum', Role::accept(Role::TAILOR)])
    ->group(function () {

        Route::get('/', fn () => Inertia::render('tailor/overview'))->name('overview');
        Route::get('/orders/{id}', fn ($id) => Inertia::render('tailor/orders/folder', [
            'id' => $id,
        ]))->name('orders.folder');

        Route::get('/orders/{orderID}/item/{itemID}', fn ($orderID, $itemID) => Inertia::render('tailor/orders/details', [
            'orderID' => $orderID,
            'itemID' => $itemID,
        ]))->name('orders.item');
    });

/**
 * Dashboard routes
 */
Route::prefix('dashboard')->name('dashboard.')
    ->middleware(['auth:sanctum', Role::accept(Role::ADMIN, Role::EDITOR)])
    ->group(function () {

        Route::get('/', fn () => Inertia::render('dashboard/overview'))->name('overview');

        /**
         * User Management
         */
        Route::get('/users/customers', fn () => Inertia::render('dashboard/users/customers/listing'))->name('users.customers');
        Route::get('/users/tailors', fn () => Inertia::render('dashboard/users/tailors/listing'))->name('users.tailors');
        Route::get('/users/editors', fn () => Inertia::render('dashboard/users/editors/listing'))->name('users.editors');

        /**
         * Store Management
         */
        Route::get('/store/products', fn () => Inertia::render('dashboard/store/products/listing'))->name('store.products');
        Route::get('/store/products/{id}', fn ($id) => Inertia::render('dashboard/store/products/details', [
            'id' => $id,
        ]))->name('store.products.details');

        Route::get('/store/attributes', fn () => Inertia::render('dashboard/store/attributes/listing'))->name('store.attributes');

        /**
         * Orders
         */
        Route::get('/orders', fn () => Inertia::render('dashboard/orders/ready-to-wear/listing'))->name('orders');
        Route::get('/orders/{id}', fn ($id) => Inertia::render('dashboard/orders/ready-to-wear/details', [
            'id' => $id,
        ]))->name('orders.details');

        Route::get('/custom-orders', fn () => Inertia::render('dashboard/orders/custom-orders/listing'))->name('custom-orders');
        Route::get('/custom-orders/{id}', fn ($id) => Inertia::render('dashboard/orders/custom-orders/order-folder', [
            'id' => $id,
        ]))->name('custom-orders.folder');
    });
