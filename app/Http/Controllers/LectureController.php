<?php

namespace App\Http\Controllers;

use App\Mail\SendCertificate;
use App\Models\Lecture;
use App\Models\LectureAttendance;
use App\Models\LectureType;
use App\Models\Room;
use App\Models\Speaker;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

use function PHPSTORM_META\type;

class LectureController extends Controller
{
    // Listagem de Palestras
    public function index()
    {
        $user = '';

        if (Auth::check()) {
            $user = Auth::user()->load(['lectures']);
        }

        $lectures = Lecture::with(['speaker', 'speakers', 'room', 'type'])->get();

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
        return Inertia::render('new-lecture-form', ['speakers' => Speaker::get(), 'rooms' => Room::with('lectures')->get(), 'types'=> LectureType::get()]);
    }




    //  POST de criação de Palestras
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:75',
            'speaker_ids' => 'required|array|min:1',
            'speaker_ids.*' => 'exists:speakers,id',
            'room_number' => 'required|min:3',
            'type' => 'required',
            'date' => 'required|min:5|max:5',
            'starts' => 'required|min:5|max:5',
            'ends' => 'required|min:5|max:5',
        ]);

        $lectureType = LectureType::firstOrCreate(['title'=>$request['type']]);

        $lecture = Lecture::create([
            'speaker_id' => $request['speaker_ids'][0] ?? null,
            'room_number' => $request['room_number'],
            'type_id' => $lectureType->id,
            'title' => $request['title'],
            'date' => $request['date'],
            'starts' => $request['starts'],
            'ends' => $request['ends'],
        ]);

        $lecture->speakers()->sync($request['speaker_ids']);

        Log::info('Admin [' . Auth::user()->email . '] adicionou palestra [' . $lecture->title . ']');

        return to_route('lectures.index');
    }

    public function edit(Lecture $lecture)
    {
        // Carrega todos os relacionamentos necessários
        $lecture->load(['type', 'speakers', 'speaker', 'room']);

        return Inertia::render('edit-lecture-form', [
            'lecture' => $lecture,
            'speakers' => Speaker::get(),
            'rooms' => Room::with('lectures')->get(),
            'types' => LectureType::get()
        ]);
    }

    // PATCH da edição de Palestra
    public function update(Request $request, Lecture $lecture)
    {
        $validated = $request->validate([
            'title' => 'required|max:75',
            'speaker_ids' => 'required|array|min:1',
            'speaker_ids.*' => 'exists:speakers,id',
            'room_number' => 'required|min:3',
            'type' => 'required',
            'date' => 'required|min:5|max:5',
            'starts' => 'required|min:5|max:5',
            'ends' => 'required|min:5|max:5',
        ]);

        $lectureType = LectureType::firstOrCreate(['title'=>$request['type']]);

        $oldData = $lecture->toArray();

        $lecture->update([
            'title' => $validated['title'],
            'speaker_id' => $validated['speaker_ids'][0] ?? null,
            'room_number' => $validated['room_number'],
            'type_id' => $lectureType->id,
            'date' => $validated['date'],
            'starts' => $validated['starts'],
            'ends' => $validated['ends'],
        ]);

        // Sincroniza os palestrantes
        $lecture->speakers()->sync($validated['speaker_ids']);

        Log::info('Admin [' . Auth::user()->email . '] alterou a palestra [' . $oldData['title'] . '] -> ' . json_encode($validated));

        return back();
    }

    // Deleta Palestra
    public function destroy(Lecture $lecture)
    {
        Lecture::destroy($lecture->id);

        Log::info('Admin [' . Auth::user()->email . '] deletou a palestra [' . $lecture->title . ']');

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

        Log::info('Admin [' . Auth::user()->email . '] fez o checkin da palestra [' . $lecture->title . ']');

        return to_route('lectures.index');
    }

    // Abre e fecha inscrições
    public function reopen_enrollment(Lecture $lecture)
    {
        $lecture->is_open_for_enrollment = ! $lecture->is_open_for_enrollment;
        $lecture->save();

        Log::info('Admin [' . Auth::user()->email. '] reabriu as inscrições para a palestra [' . $lecture->title . ']');

        return back();
    }
}
