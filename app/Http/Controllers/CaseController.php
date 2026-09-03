<?php

namespace App\Http\Controllers;

use App\Models\SocialCase;
use App\Models\FamilyMember;
use App\Models\Visit;
use App\Models\CaseActivity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CaseController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = SocialCase::with('assignedEmployee');

        // Apply authorization filter: employees see only assigned cases
        if ($user->role === 'employee') {
            $query->where('assigned_to', $user->id);
        }

        // Apply searching
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('national_id', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        if ($request->filled('governorate')) {
            $query->where('governorate', $request->input('governorate'));
        }

        // Sorting
        $sortField = $request->filled('sort') ? $request->input('sort') : 'created_at';
        $sortDirection = $request->input('direction') === 'asc' ? 'asc' : 'desc';
        $query->orderBy($sortField, $sortDirection);

        $cases = $query->paginate(10)->withQueryString();

        return Inertia::render('Cases/Index', [
            'cases' => $cases,
            'filters' => $request->all(['search', 'status', 'priority', 'governorate', 'sort', 'direction']),
            'employees' => $user->isAdmin() ? User::where('role', 'employee')->get() : [],
        ]);
    }

    public function show(SocialCase $case)
    {
        Gate::authorize('view', $case);

        $case->load([
            'assignedEmployee',
            'familyMembers',
            'visits.employee',
            'assistances.employee',
            'tasks.assignedEmployee',
            'activities.user'
        ]);

        return Inertia::render('Cases/Show', [
            'socialCase' => $case,
            'employees' => Auth::user()->isAdmin() ? User::where('role', 'employee')->get() : [],
        ]);
    }

    public function timeline(SocialCase $case)
    {
        Gate::authorize('view', $case);

        $activities = CaseActivity::where('case_id', $case->id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Cases/Timeline', [
            'socialCase' => $case->only(['id', 'name']),
            'activities' => $activities,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', SocialCase::class);

        return Inertia::render('Cases/Create', [
            'employees' => User::where('role', 'employee')->get(),
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('create', SocialCase::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'national_id' => 'required|string|size:10|unique:cases,national_id',
            'phone' => 'nullable|string|max:20',
            'assigned_to' => 'nullable|exists:users,id',
            'income_source' => 'nullable|string|max:255',
            'governorate' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'detailed_address' => 'required|string',
            'marital_status' => 'required|string|max:255',
            'income' => 'required|numeric|min:0',
            'medical_condition' => 'nullable|string|max:255',
            'housing_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|string',
            'priority' => 'required|string',
        ]);

        $socialCase = SocialCase::create($validated);

        CaseActivity::create([
            'case_id' => $socialCase->id,
            'user_id' => Auth::id(),
            'type' => 'case_created',
            'title' => 'إنشاء ملف حالة جديدة',
            'description' => "قام الموظف " . Auth::user()->name . " بإنشاء ملف الحالة وتسجيل البيانات الأساسية.",
        ]);

        return redirect()->route('cases.show', $socialCase)->with('success', 'تم إنشاء ملف الحالة بنجاح.');
    }

    public function edit(SocialCase $case)
    {
        Gate::authorize('update', $case);

        return Inertia::render('Cases/Edit', [
            'socialCase' => $case,
            'employees' => Auth::user()->isAdmin() ? User::where('role', 'employee')->get() : [],
        ]);
    }

    public function update(Request $request, SocialCase $case)
    {
        Gate::authorize('update', $case);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'national_id' => 'required|string|size:10|unique:cases,national_id,' . $case->id,
            'phone' => 'nullable|string|max:20',
            'assigned_to' => 'nullable|exists:users,id',
            'income_source' => 'nullable|string|max:255',
            'governorate' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'detailed_address' => 'required|string',
            'marital_status' => 'required|string|max:255',
            'income' => 'required|numeric|min:0',
            'medical_condition' => 'nullable|string|max:255',
            'housing_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'required|string',
            'priority' => 'required|string',
        ]);

        $oldAssigned = $case->assigned_to;
        $case->update($validated);

        // Activity logging
        CaseActivity::create([
            'case_id' => $case->id,
            'user_id' => Auth::id(),
            'type' => 'case_updated',
            'title' => 'تحديث بيانات الحالة',
            'description' => "تم تحديث البيانات الأساسية للملف بواسطة " . Auth::user()->name,
        ]);

        if ($oldAssigned != $case->assigned_to) {
            $newAssignee = User::find($case->assigned_to);
            CaseActivity::create([
                'case_id' => $case->id,
                'user_id' => Auth::id(),
                'type' => 'assignment_changed',
                'title' => 'تغيير الموظف المسؤول',
                'description' => $newAssignee ? "تم تعيين الحالة للموظف " . $newAssignee->name : "تم إلغاء تعيين الحالة",
            ]);
        }

        return redirect()->route('cases.show', $case)->with('success', 'تم تحديث بيانات الحالة بنجاح.');
    }

    public function assign(Request $request, SocialCase $case)
    {
        Gate::authorize('assign', SocialCase::class);

        $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $case->update(['assigned_to' => $request->input('assigned_to')]);

        $newAssignee = User::find($request->input('assigned_to'));
        CaseActivity::create([
            'case_id' => $case->id,
            'user_id' => Auth::id(),
            'type' => 'assignment_changed',
            'title' => 'تعديل التوزيع',
            'description' => $newAssignee ? "تم توزيع الحالة على الموظف " . $newAssignee->name : "تم إلغاء توزيع الحالة",
        ]);

        return back()->with('success', 'تم تعيين الموظف للحالة بنجاح.');
    }

    // Family Member Management
    public function addFamilyMember(Request $request, SocialCase $case)
    {
        Gate::authorize('update', $case);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'national_id' => 'nullable|string|max:15',
            'relationship' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'medical_condition' => 'nullable|string|max:255',
        ]);

        $case->familyMembers()->create($validated);

        CaseActivity::create([
            'case_id' => $case->id,
            'user_id' => Auth::id(),
            'type' => 'case_updated',
            'title' => 'إضافة فرد أسرة جديد',
            'description' => "تمت إضافة فرد أسرة جديد: " . $request->input('name') . " (" . $request->input('relationship') . ")",
        ]);

        return back()->with('success', 'تمت إضافة فرد الأسرة بنجاح.');
    }

    public function removeFamilyMember(SocialCase $case, FamilyMember $familyMember)
    {
        Gate::authorize('update', $case);

        $memberName = $familyMember->name;
        $familyMember->delete();

        CaseActivity::create([
            'case_id' => $case->id,
            'user_id' => Auth::id(),
            'type' => 'case_updated',
            'title' => 'حذف فرد أسرة',
            'description' => "تم حذف فرد الأسرة: " . $memberName,
        ]);

        return back()->with('success', 'تم حذف فرد الأسرة بنجاح.');
    }

    // Field Visit logs
    public function storeVisit(Request $request, SocialCase $case)
    {
        Gate::authorize('update', $case);

        $validated = $request->validate([
            'visit_date' => 'required|date',
            'status' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();
        $case->visits()->create($validated);

        CaseActivity::create([
            'case_id' => $case->id,
            'user_id' => Auth::id(),
            'type' => 'visit_added',
            'title' => 'تسجيل زيارة ميدانية',
            'description' => "تم تسجيل زيارة ميدانية بتاريخ " . $request->input('visit_date') . " وحالة: " . $request->input('status'),
        ]);

        return back()->with('success', 'تمت إضافة الزيارة الميدانية بنجاح.');
    }

    // Case updates / Note creation
    public function storeNote(Request $request, SocialCase $case)
    {
        Gate::authorize('update', $case);

        $request->validate([
            'type' => 'required|string', // ملاحظة عامة, زيارة ميدانية, تحديث حالة, تواصل هاتفي
            'content' => 'required|string',
        ]);

        CaseActivity::create([
            'case_id' => $case->id,
            'user_id' => Auth::id(),
            'type' => 'note_added',
            'title' => $request->input('type'),
            'description' => $request->input('content'),
        ]);

        return back()->with('success', 'تمت إضافة التحديث بنجاح.');
    }
}
