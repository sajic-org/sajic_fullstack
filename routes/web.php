<?php

use App\Http\Controllers\LectureController;
use App\Http\Controllers\UserController;
use App\Models\Speaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Palestras
Route::get('/palestras', [LectureController::class, 'index'])->name('lectures.index');

// Minhas Palestras
# adicionar 'verified'
Route::prefix('minhas-palestras')->middleware(['auth'])->group(function () {
    Route::get(
        '/',
        [UserController::class, 'my_lectures']
    )->name('user.lectures');

    Route::post(
        '/join',
        [UserController::class, 'attend_lecture']
    )->name('user.attend-lecture');

    Route::post(
        '/leave',
        [UserController::class, 'leave_lecture']
    )->name('user.leave-lecture');
});


# Rota pra limpar as inscrições pra me facilitar a vida no desenvolvimento
Route::get('/clean', function () {
    $user = Auth::user();
    $user->lectures()->detach([1, 2, 3, 4]);

    return back();
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
