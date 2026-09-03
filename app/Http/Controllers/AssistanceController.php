<?php

namespace App\Http\Controllers;

use App\Models\Assistance;
use App\Models\SocialCase;
use App\Models\CaseActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AssistanceController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Assistance::with(['socialCase', 'employee']);

        // Employees see assistances for their assigned cases only
        if ($user->role === 'employee') {
            $query->whereHas('socialCase', function($q) use ($user) {
                $q->where('assigned_to', $user->id);
            });
        }

        // Filters
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('socialCase', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })->orWhere('description', 'like', "%{$search}%");
        }

        $assistances = $query->orderBy('date', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Assistances/Index', [
            'assistances' => $assistances,
            'filters' => $request->all(['type', 'search']),
        ]);
    }

    public function show(Assistance $assistance)
    {
        Gate::authorize('view', $assistance);
        $assistance->load(['socialCase', 'employee']);
        return Inertia::render('Assistances/Show', [
            'assistance' => $assistance,
        ]);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        $casesQuery = SocialCase::query();
        if ($user->role === 'employee') {
            $casesQuery->where('assigned_to', $user->id);
        }

        return Inertia::render('Assistances/Create', [
            'cases' => $casesQuery->select('id', 'name')->get(),
            'preselected_case_id' => $request->input('case_id'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'case_id' => 'required|exists:cases,id',
            'type' => 'required|in:financial,non_financial',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'attachments' => 'nullable|string',
        ]);

        // Authorization check: Employee can only add for assigned cases
        $socialCase = SocialCase::findOrFail($validated['case_id']);
        if (Auth::user()->role === 'employee' && $socialCase->assigned_to !== Auth::id()) {
            abort(403, 'غير مصرح لك بإضافة مساعدة لهذه الحالة.');
        }

        $validated['user_id'] = Auth::id();
        $assistance = Assistance::create($validated);

        // Dynamic activity log
        $typeString = $assistance->type === 'financial' ? 'مساعدة مالية' : 'مساعدة عينية';
        CaseActivity::create([
            'case_id' => $socialCase->id,
            'user_id' => Auth::id(),
            'type' => 'assistance_added',
            'title' => "إضافة {$typeString}",
            'description' => "تم تسجيل {$typeString} بقيمة " . number_format($assistance->amount, 2) . " ريال سعودي: " . $assistance->description,
        ]);

        return redirect()->route('cases.show', $socialCase)->with('success', 'تم تسجيل المساعدة بنجاح.');
    }
}
