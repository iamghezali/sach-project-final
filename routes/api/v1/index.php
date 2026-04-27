<?php

use App\Http\Controllers\MediaController;

require __DIR__.'/auth.php';

Route::middleware([])
    ->group(function () {

        require __DIR__.'/dashboard/users.php';
        require __DIR__.'/dashboard/attributes.php';
        require __DIR__.'/dashboard/products.php';
        require __DIR__.'/dashboard/custom-orders.php';

    });

Route::prefix('shop')->name('shop.')
    ->group(function () {

        require __DIR__.'/shop/products.php';
        require __DIR__.'/shop/orders.php';
        require __DIR__.'/shop/custom-orders.php';

    });

Route::prefix('tailor')->name('tailor.')
    ->group(function () {

        require __DIR__.'/tailor/orders.php';

    });

Route::get('/media/{uuid}', [MediaController::class, 'show'])->name('media.show');
