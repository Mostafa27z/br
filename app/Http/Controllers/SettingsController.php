<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        // Mocked settings loaded dynamically or simulated
        $settings = [
            'org_name' => 'جمعية البر الخيرية',
            'support_email' => 'info@birr.org',
            'support_phone' => '920001234',
            'city' => 'الرياض',
            'allow_registration' => false,
            'default_currency' => 'ريال سعودي',
        ];

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $request->validate([
            'org_name' => 'required|string',
            'support_email' => 'required|email',
            'support_phone' => 'required',
        ]);

        // Simulating settings save
        return back()->with('success', 'تم حفظ إعدادات النظام بنجاح.');
    }
}
