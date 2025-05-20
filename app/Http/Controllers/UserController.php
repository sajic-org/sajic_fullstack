<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function attendance_list()
    {
        $users = User::join('lecture_user', 'users.id', '=', 'lecture_user.user_id')
            ->join('lectures', 'lectures.id', '=', 'lecture_user.lecture_id')
            ->where('lecture_user.showed_up', true)
            ->orderBy('lectures.date', 'desc')
            ->orderBy('users.name')
            ->get();

        return Inertia::render('attendance_list', ['attendees' => $users]);
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
