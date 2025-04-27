<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function attendance_list()
    {
        return Inertia::render('attendance_list');
    }

    public function my_lectures()
    {
        $user = Auth::user()->load(['lectures.speaker.lectures']);

        return Inertia::render('my-lectures', ['user' => $user]);
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
