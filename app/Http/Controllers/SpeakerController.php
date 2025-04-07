<?php

namespace App\Http\Controllers;

use App\Models\Speaker;
use Illuminate\Http\Request;

class SpeakerController extends Controller
{
    public function index()
    {
        $speakers = Speaker::get();

        return $speakers;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image',
            'name' => 'required|max:30',
            'description' => 'required|min:150|max:1500'
        ]);

        Speaker::create($validated);
    }

    public function destroy(Speaker $speaker)
    {
        Speaker::destroy($speaker);
    }
}
