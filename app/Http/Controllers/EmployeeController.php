<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        if (!Auth::user()->isAdmin()) {
            abort(403, 'غير مصرح للوصول لهذه الصفحة.');
        }

        $employees = User::where('role', 'employee')
            ->withCount(['cases', 'tasks'])
            ->get();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = 'employee';

        User::create($validated);

        return back()->with('success', 'تم تسجيل الباحث الجديد بنجاح.');
    }

    public function update(Request $request, User $employee)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $employee->id,
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $employee->update($validated);

        return back()->with('success', 'تم تحديث بيانات الباحث بنجاح.');
    }

    public function destroy(User $employee)
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $employee->delete();

        return back()->with('success', 'تم حذف حساب الباحث بنجاح.');
    }
}
