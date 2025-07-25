<?php

namespace App\Http\Controllers;

use App\Mail\SendCertificate;
use App\Models\Lecture;
use App\Models\LectureAttendance;
use App\Models\Room;
use App\Models\Speaker;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class LectureController extends Controller
{
    // Listagem de Palestras
    public function index()
    {
        $user = '';

        if (Auth::check()) {
            $user = Auth::user()->load(['lectures']);
        }

        $lectures = Lecture::with(['speaker.lectures', 'room'])->get();

        $lectures = $lectures->sortBy(function ($lecture) {
            $date = Carbon::createFromFormat('d/m', $lecture->date);
            $startTime = Carbon::createFromFormat('H:i', $lecture->starts);
            return [$date->timestamp, $startTime->timestamp];
        })->values();

        foreach ($lectures as $l) {
            $l['n_attendees'] = DB::table('lecture_attendances')->where('lecture_id', $l->id)->count();
        }

        return Inertia::render('lectures', [
            'lectures' => $lectures,
            'user' => $user,
        ]);
    }

    // GET do Form de criação de Palestras
    public function create(bool $speakerJustCreated = false)
    {
        return Inertia::render('new-lecture-form', ['speakers' => Speaker::get(), 'rooms' => Room::with('lectures')->get()]);
    }

    //  POST de criação de Palestras
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:75|min:10',
            'speaker_id' => 'required',
            'room_number' => 'required|min:3',
            'type' => 'required|in:Tecnologia,Gestão e Mercado',
            'date' => 'required|min:5|max:5',
            'starts' => 'required|min:5|max:5',
            'ends' => 'required|min:5|max:5',
        ]);

        Lecture::create([
            'speaker_id' => $request['speaker_id'],
            'room_number' => $request['room_number'],
            'type' => $request['type'],
            'title' => $request['title'],
            'date' => $request['date'],
            'starts' => $request['starts'],
            'ends' => $request['ends'],
        ]);

        return to_route('lectures.index');
    }

    // GET do Form de Edição de Palestra
    public function edit(Lecture $lecture)
    {
        return Inertia::render('edit-lecture-form', ['lecture' => $lecture, 'speakers' => Speaker::get(), 'rooms' => Room::with('lectures')->get()]);
    }

    // PATCH da edição de Palestra
    public function update(Request $request, Lecture $lecture)
    {
        $validated = $request->validate([
            'title' => 'required|max:75|min:10',
            'speaker_id' => 'required',
            'room_number' => 'required|min:3',
            'type' => 'required|in:Tecnologia,Gestão e Mercado',
            'date' => 'required|min:5|max:5',
            'starts' => 'required|min:5|max:5',
            'ends' => 'required|min:5|max:5',
        ]);

        Lecture::whereId($lecture->id)->update($validated);

        return back();
    }

    // Deleta Palestra
    public function destroy(Lecture $lecture)
    {
        Lecture::destroy($lecture->id);

        return to_route('lectures.index');
    }

    // GET Check In
    public function attendant_table(Lecture $lecture)
    {
        $lecture->load('attendants', 'speaker');

        return Inertia::render('check-in', ['lecture' => $lecture]);
    }

    // POST realiza o Check In
    public function checkin(Request $request, Lecture $lecture)
    {
        $validated = $request->validate([
            'checkedUsersIds' => 'required|array',
            'checkedUsersIds.*' => 'string',
        ]);

        $attendances = LectureAttendance::whereBelongsTo($lecture)
            ->whereIn('user_id', $validated['checkedUsersIds'])
            ->with('user')
            ->get();

        LectureAttendance::whereIn('id', $attendances->pluck('id'))
            ->update(['showed_up' => true]);

        foreach ($attendances as $attendance) {
            Mail::to($attendance->user->email)
                ->send(new SendCertificate($attendance->id));
        }

        return to_route('lectures.index');
    }

    // Abre e fecha inscrições
    public function reopen_enrollment(Lecture $lecture)
    {
        $lecture->is_open_for_enrollment = ! $lecture->is_open_for_enrollment;
        $lecture->save();

        return back();
    }
}
