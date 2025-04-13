<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function my_lectures()
    {
        return Inertia::render('my-lectures', ['user' => Auth::user()]);
    }

    public function attend_lecture(Lecture $lecture)
    {
        $user = Auth::user();
        $user->lectures()->attach($lecture);
    }
}
