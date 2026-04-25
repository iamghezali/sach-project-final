<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', fn () => 'login');
Route::post('/register', fn () => 'register');

Route::middleware([])->group(function () {

    Route::get('/me', fn () => 'me');
    Route::delete('/logout', fn () => 'logout');

});
