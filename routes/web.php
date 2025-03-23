<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/palestrantes', function () {
    return Inertia::render("lecturers");
})->name('lecturers.index');

Route::get('/palestras', function () {
    return Inertia::render("lectures");
})->name('lectures.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/minhas-palestras', function () {
        return Inertia::render('my-lectures');
    })->name('user.lectures');

    Route::get('/nova-palestra', function () {
        return Inertia::render('new-lecture-form');
    })->name('lectures.create');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
