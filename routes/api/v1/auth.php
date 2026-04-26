<?php

use App\Features\Auth\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', fn () => 'register');

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/me', [LoginController::class, 'me']);
    Route::delete('/logout', [LoginController::class, 'logout']);

});
