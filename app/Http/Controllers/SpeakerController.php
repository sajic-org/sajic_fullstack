<?php

namespace App\Http\Controllers;

use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SpeakerController extends Controller
{
    public function index()
    {
        $speakers = Speaker::get();
        $admin = Auth::user();
        if ($admin && ($admin->is_admin ?? false)) {
            Log::info('Admin [' . $admin->email . '] acessou a listagem de palestrantes.');
        }
        return $speakers;
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'image|nullable',
            'image_link'=>'nullable|string',
            'name' => 'required|min:5|max:30',
            'description' => 'required|min:50|max:1500',
        ]);

        if($request->hasFile('image')){
            $imagePath = Storage::disk('public')->putFile('speakers', $request->image);
            $assetPath = asset(Storage::url($imagePath));
        } elseif($request->image_link){
            $assetPath = $request->image_link;
        }
        $speaker = Speaker::create([
            'image' => $assetPath,
            'name' => $request['name'],
            'description' => $request['description'],
        ]);

        $admin = Auth::user();
        if ($admin && ($admin->is_admin ?? false)) {
            Log::info('Admin [' . $admin->email . '] adicionou palestrante [' . $speaker->name . ']');
        }

        return back()->with('newSpeaker', $speaker);
    }

    public function update(Speaker $speaker, Request $request)
    {
        $validated = $request->validate([
            'name' => 'min:8|max:30',
            'description' => 'min:150|max:1500',
        ]);

        $oldData = $speaker->toArray();
        Speaker::whereId($speaker->id)->update(['name' => $validated['name'], 'description' => $validated['description']]);

        $admin = Auth::user();
        if ($admin && ($admin->is_admin ?? false)) {
            Log::info('Admin [' . $admin->email . '] alterou o palestrante [' . $oldData['name'] . '] -> ' . json_encode($validated));
        }

        return back();
    }

    public function destroy(Speaker $speaker)
    {
        $admin = Auth::user();
        $speakerName = $speaker->name;
        Speaker::destroy($speaker->id);
        if ($admin && ($admin->is_admin ?? false)) {
            Log::info('Admin [' . $admin->email . '] deletou o palestrante [' . $speakerName . ']');
        }
        return back();
    }
}
