<?php

use App\Http\Controllers\LectureController;
use App\Http\Controllers\UserController;
use App\Models\Speaker;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Palestras
Route::get('/palestras', [LectureController::class, 'index'])->name('lectures.index');

// Minhas Palestras
Route::prefix('minhas-palestras')->middleware(['auth', 'verified'])->group(function () {
    Route::get(
        '/',
        [UserController::class, 'my_lectures']
    )->name('user.lectures');

    Route::post(
        '/',
        [UserController::class, 'attend_lecture']
    )->name('user.attend-lecture');
});

Route::get('/deletarspeakers', function () {
    Speaker::query()->delete();

    return to_route('lectures.create');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
