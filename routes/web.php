<?php

use App\Http\Controllers\LectureController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


# Home
Route::get('/', function () {
    return Inertia::render('home');
})->name('home');


# Palestras
Route::get('/palestras', [LectureController::class, 'index'])->name('lectures.index');

Route::middleware(['auth', 'verified'])->group(function () {
    # Adicionar middleware ou gate de admin
    Route::get('/nova-palestra', [LectureController::class, 'create'])->name('lectures.create');
    Route::post('/nova-palestra', [LectureController::class, 'store'])->name('lectures.store');

    Route::get('/palestras/{lecture}/check-in', [LectureController::class, 'checkin'])->name('lectures.check-in');

    Route::get('/palestras/{lecture}/edit', [LectureController::class, 'edit'])->name('lectures.edit');
    Route::patch('/palestras/{lecture}/edit', [LectureController::class, 'update'])->name('lectures.update');
    Route::delete('/palestras/{lecture}', [LectureController::class, 'destroy'])->name('lectures.destroy');
});

# Minhas Palestras
Route::get('/minhas-palestras', function () {
    return Inertia::render('my-lectures');
})->name('user.lectures')->middleware('auth');

Route::prefix('minhas-palestras')->middleware('auth')->group(function () {
    Route::get(
        '/',
        [UserController::class, 'lectures']
    )->name('user.lectures');

    Route::post(
        '/',
        [UserController::class, 'attend_lecture']
    )->name('user.attend-lecture');
});




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
