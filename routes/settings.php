<?php

use App\Http\Controllers\Settings\PasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','verified'])->group(function () {
    Route::get('configuracoes', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('configuracoes', [PasswordController::class, 'update'])->name('password.update');
});
