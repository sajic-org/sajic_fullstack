<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('home', function () {
//         return Inertia::render('home');
//     })->name('home');
// });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
