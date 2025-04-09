<?php

namespace App\Http\Controllers;

use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
            'name' => 'required|max:30',
            'description' => 'required|min:150|max:1500',
        ]);

        $imagePath = Storage::disk('public')->putFile('speakers/', $request->image);
        $imagePath = $request->image->store();

        $speaker = Speaker::create([
            'image' => $imagePath,
            'name' => $request['name'],
            'description' => $request['description'],
        ]);
    }

    public function destroy(Speaker $speaker)
    {
        Speaker::destroy($speaker);
    }
}
