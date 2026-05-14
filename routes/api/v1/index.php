<?php

use App\Authorization\Enums\Role;
use App\Http\Controllers\MediaController;

require __DIR__.'/auth.php';

Route::middleware([])
    ->middleware(['auth:sanctum', Role::accept(Role::ADMIN, Role::EDITOR)])
    ->group(function () {

        require __DIR__.'/dashboard/users.php';
        require __DIR__.'/dashboard/attributes.php';
        require __DIR__.'/dashboard/products.php';
        require __DIR__.'/dashboard/categories.php';
        require __DIR__.'/dashboard/orders.php';
        require __DIR__.'/dashboard/custom-orders.php';

    });

Route::prefix('shop')->name('shop.')
    ->group(function () {

        require __DIR__.'/shop/products.php';

        Route::middleware(['auth:sanctum', Role::accept(Role::CUSTOMER)])->group(function () {

            require __DIR__.'/shop/orders.php';
            require __DIR__.'/shop/custom-orders.php';

        });
    });

Route::prefix('tailor')->name('tailor.')
    ->middleware(['auth:sanctum', Role::accept(Role::TAILOR)])
    ->group(function () {

        require __DIR__.'/tailor/orders.php';

    });

Route::get('/media/{uuid}', [MediaController::class, 'show'])->name('media.show');
Route::post('/media/{uuid}/signed-url', [MediaController::class, 'signedUrl'])
    ->middleware('auth:sanctum')
    ->name('media.signed-url');
