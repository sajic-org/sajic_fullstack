<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use App\Models\LectureAttendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
    public function attendance_list()
    {
        $attendants = LectureAttendance::whereShowedUp(true)
            ->join("lectures", "lecture_attendances.lecture_id", "=", "lectures.id")
            ->join("users", "lecture_attendances.user_id", "=", "users.id")
            ->where("users.is_unisenac_student", true)
            ->select(
                "users.name",
                "lectures.date",
                DB::raw("count(lectures.id) as lecture_count")
            )
            ->groupBy("users.name", "lectures.date")
            ->orderBy("users.name", "desc")
            ->get();

        return Inertia::render('attendance_list', ['attendees' => $attendants]);
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

    public  function  certficate(){

    }
}
