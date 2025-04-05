<?php

use App\Http\Controllers\LectureController;
use Illuminate\Support\Facades\Route;


# Todas as rotas nesse arquivo são protegidas pelos middlewares auth, verified e admin

Route::get('/nova-palestra', [LectureController::class, 'create'])->name('lectures.create');
Route::post('/nova-palestra', [LectureController::class, 'store'])->name('lectures.store');

Route::get('/palestras/{lecture}/check-in', [LectureController::class, 'checkin'])->name('lectures.check-in');

Route::get('/palestras/{lecture}/edit', [LectureController::class, 'edit'])->name('lectures.edit');
Route::patch('/palestras/{lecture}/edit', [LectureController::class, 'update'])->name('lectures.update');
Route::delete('/palestras/{lecture}', [LectureController::class, 'destroy'])->name('lectures.destroy');
