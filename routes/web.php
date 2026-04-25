<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/custom-order', fn () => Inertia::render('welcome'))->name('welcome');
