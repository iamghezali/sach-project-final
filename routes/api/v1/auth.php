<?php

use App\Features\Auth\Controllers\LoginController;
use App\Features\User\Customer\Controllers\Shop\CustomerController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [CustomerController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/me', [LoginController::class, 'me']);
    Route::delete('/logout', [LoginController::class, 'logout']);

});
