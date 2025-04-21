<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Ramsey\Uuid\Type\Integer;

class UserController extends Controller
{
    public function my_lectures()
    {
        return Inertia::render('my-lectures', ['user' => Auth::user()]);
    }

    public function attend_lecture(Request $request)
    {
        $user = Auth::user();
        $user->lectures()->attach($request->id);

        return back();
    }

    public function leave_lecture(Request $request)
    {
        $user = Auth::user();
        $user->lectures()->detach($request->id);

        return back();
    }
}
