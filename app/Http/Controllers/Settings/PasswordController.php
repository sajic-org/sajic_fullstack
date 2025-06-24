<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/password', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['nullable', 'current_password'],
            'password' => ['nullable', Password::defaults(), 'confirmed'],
            'course' => ['nullable', 'in:ADS,REDES,MKT,PG,ETC'],
            'semester' => ['nullable', 'in:1,2,3,4,5,6,7,8,8+'],

        ]);

        if (! empty($request->current_password) || ! empty($request->password)) {
            $request->user()->update([
                'password' => Hash::make($validated['password']),
                'course' => $request->course,
                'semester' => $request->semester,
            ]);
        } else {
            $request->user()->update([
                'course' => $request->course,
                'semester' => $request->semester,
            ]);
        }

        return back();
    }
}
