<?php

namespace App\Http\Controllers;

use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SpeakerController extends Controller
{
    public function index()
    {
        $speakers = Speaker::get();

        return $speakers;
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image',
            'name' => 'required|min:8|max:30',
            'description' => 'required|min:150|max:1500',
        ]);

        $imagePath = Storage::disk('public')->putFile('speakers', $request->image);

        $assetPath = asset(Storage::url($imagePath));

        $speaker = Speaker::create([
            'image' => $assetPath,
            'name' => $request['name'],
            'description' => $request['description'],
        ]);

        return back()->with('newSpeaker', $speaker);
    }

    public function update(Speaker $speaker, Request $request)
    {
        $validated = $request->validate([
            'name' => 'min:8|max:30',
            'description' => 'min:150|max:1500',
        ]);

        Speaker::whereId($speaker->id)->update(['name' => $validated['name'], 'description' => $validated['description']]);

        return back();
    }

    public function destroy(Speaker $speaker)
    {
        Speaker::destroy($speaker->id);

        return back();
    }
}
