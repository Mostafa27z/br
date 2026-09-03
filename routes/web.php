<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CaseController;
use App\Http\Controllers\AssistanceController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
    
    Route::get('/reset-password', [AuthController::class, 'showResetPassword'])->name('password.reset');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    // Session logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Root redirect
    Route::get('/', function () {
        return redirect()->route('dashboard');
    });

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/social', [DashboardController::class, 'socialStats'])->name('dashboard.social');
    Route::get('/dashboard/financial', [DashboardController::class, 'financialStats'])->name('dashboard.financial');

    // Cases
    Route::resource('cases', CaseController::class);
    Route::post('/cases/{case}/assign', [CaseController::class, 'assign'])->name('cases.assign');
    Route::get('/cases/{case}/timeline', [CaseController::class, 'timeline'])->name('cases.timeline');
    Route::post('/cases/{case}/family', [CaseController::class, 'addFamilyMember'])->name('cases.family.store');
    Route::delete('/cases/{case}/family/{family_member}', [CaseController::class, 'removeFamilyMember'])->name('cases.family.destroy');
    Route::post('/cases/{case}/visit', [CaseController::class, 'storeVisit'])->name('cases.visit.store');
    Route::post('/cases/{case}/note', [CaseController::class, 'storeNote'])->name('cases.note.store');

    // Assistances
    Route::resource('assistances', AssistanceController::class);

    // Tasks
    Route::resource('tasks', TaskController::class);

    // Employees (Admin Only - Policy/Controller enforced)
    Route::resource('employees', EmployeeController::class);

    // Settings (Admin Only - Policy/Controller enforced)
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');
});
