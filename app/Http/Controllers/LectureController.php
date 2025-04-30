<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use App\Models\LectureAttendance;
use App\Models\Room;
use App\Models\Speaker;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Boolean;

class LectureController extends Controller
{
    // Listagem de Palestras
    public function index()
    {
        $user='';

        if(Auth::check()){
            $user= Auth::user()->load(['lectures']);
        }

        function defer_lectures()
        {
                $lectures = Lecture::with(['speaker.lectures'])->get();

                return $lectures;
        }

        return Inertia::render('lectures', ['lectures' => defer_lectures(), 'user' => $user,
        ]);
    }

    // GET do Form de criação de Palestras
    public function create(bool $speakerJustCreated = false)
    {

        return Inertia::render('new-lecture-form', ['speakers' => Speaker::get(), 'rooms' => Room::get()]);
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

    // GET Check In
    public function attendant_table(Lecture $lecture)
    {
        $lecture->load('attendants', 'speaker');

        return Inertia::render('check-in', ['lecture'=>$lecture]);
    }

    // POST realiza o Check In
    public function checkin(Request $request, Lecture $lecture)
    {
        $validated = $request->validate([
            'checkedUsers' => 'required|array',
            'checkedUsers.*.userId' => 'required|integer|exists:users,id',
            'checkedUsers.*.presence' => 'required|boolean'
        ]);

        foreach ($validated['checkedUsers'] as $entry) {
            LectureAttendance::where([
                ['lecture_id', '=', $lecture->id],
                ['user_id', '=', $entry['userId']]
            ])->update(['showed_up' => $entry['presence']]);
        }

        return to_route('lectures.index');
    }

    // GET do Form de Edição de Palestra
    public function edit(Lecture $lecture)
    {
        return Inertia::render('edit-lecture-form', $lecture);
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

        Lecture::update($validated);

        return to_route('lectures.create');
    }

    // Deleta Palestra
    public function destroy(Lecture $lecture)
    {
        Lecture::destroy($lecture);

        return to_route('home');
    }
}
