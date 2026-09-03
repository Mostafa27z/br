<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => 'بيانات الاعتماد المدخلة غير صحيحة.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }

    public function showForgotPassword()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        // Simplified for simulation
        return back()->with('status', 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني (محاكاة).');
    }

    public function showResetPassword()
    {
        return Inertia::render('Auth/ResetPassword');
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);
        // Simplified for simulation
        return redirect()->route('login')->with('status', 'تمت إعادة تعيين كلمة المرور بنجاح.');
    }
}
