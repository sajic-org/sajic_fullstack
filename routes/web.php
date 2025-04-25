<?php

use App\Http\Controllers\LectureController;
use App\Http\Controllers\UserController;
use App\Models\Lecture;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home
Route::get('/', function () {

    return Inertia::render('home', ['lectures' => Inertia::defer(function() {
        
        $lectures = Lecture::with('speaker')->get();
        
        return $lectures;
    })]);

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



# Rota p os guri criar admin rapido dps de limpar o db
Route::get('/criar-admin', function(){

    $user = User::create([
        'name' => 'admin',
        'email' => 'admin@gmail.com',
        'password' => 'admin1234',
        'is_admin' => 1
    ]);


    Auth::login($user);

    return to_route('home');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
