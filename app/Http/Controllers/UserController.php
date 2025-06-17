<?php

namespace App\Http\Controllers;

use App\Models\LectureAttendance;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Str;

class UserController extends Controller
{
    public function attendance_list()
    {
        $attendants = LectureAttendance::whereShowedUp(true)
            ->join("lectures", "lecture_attendances.lecture_id", "=", "lectures.id")
            ->join("users", "lecture_attendances.user_id", "=", "users.id")
            ->where("users.course", '!=', 'NULL')
            ->select(
                'users.name',
                'lectures.date',
                'users.course',
                'users.semester',
            )
            ->orderBy('users.name', 'desc')
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
        $user->lectures()->attach($request->id, ['id' => Str::uuid()]);

        return back();
    }

    public function leave_lecture(Request $request)
    {
        $user = Auth::user();
        $user->lectures()->detach($request->id);

        return back();
    }

    public function certificate(LectureAttendance $lectureAttendance)
    {
        $lectureAttendance->load('lecture', 'user');

        return Pdf::loadView('pdf.certificate', [
            'id' => $lectureAttendance->id,
            'name' => Str::upper($lectureAttendance->user->name),
            'title' => $lectureAttendance->lecture->title,
            'date' => $lectureAttendance->lecture->date,
            'start' => $lectureAttendance->lecture->starts,
            'end' => $lectureAttendance->lecture->ends,
        ])->setPaper('a4', 'landscape')->stream();
    }
}
