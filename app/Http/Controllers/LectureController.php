<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LectureController extends Controller
{

    // Listagem de Palestras
    public function index()
    {
        $lectures = Lecture::all();

        return Inertia::render('lectures', $lectures);
    }

    // GET do Form de criação de Palestras
    public function create()
    {
        return Inertia::render('new-lecture-form');
    }


    //  POST de criação de Palestras
    public function store(Request $request)
    {
        #todo
        $validated = $request->validate([
            'speaker_id' => 'required',
            'room_number' => 'required',
            'type' => 'required',
            'title' => 'required',
            'date' => 'required',
            'starts' => 'required',
            'ends' => 'required',
        ]);

        Lecture::create($validated);

        return to_route('lectures.create');
    }


    // GET Check In
    public function attendant_table(Lecture $lecture)
    {
        $attendants = User::with('lectures')->whereIn('lectures', $lecture);

        return Inertia::render('check-in', [$lecture, 'users' => $attendants]);
    }

    // realiza o Check In
    public function checkin(Request $request, User $users) {}



    // GET do Form de Edição de Palestra
    public function edit(Lecture $lecture)
    {
        return Inertia::render('edit-lecture-form', $lecture);
    }

    // PATCH da edição de Palestra
    public function update(Request $request, Lecture $lecture)
    {
        //
    }


    // Deleta Palestra
    public function destroy(Lecture $lecture)
    {
        //
    }
}
