<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function my_lectures()
    {
        return Inertia::render('my-lectures');
    }
    public function attend_lecture(Lecture $lecture)
    {
        $user = Auth::user();
        $user->lectures->attach($lecture);

        return 'TODO';
    }
}
