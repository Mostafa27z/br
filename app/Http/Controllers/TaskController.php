<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\SocialCase;
use App\Models\User;
use App\Models\CaseActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Task::with(['socialCase', 'assignedEmployee', 'creator']);

        if ($user->role === 'employee') {
            $query->where('user_id', $user->id);
        }

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->input('priority'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('socialCase', function($sq) use ($search) {
                      $sq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $tasks = $query->orderBy('due_date', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'filters' => $request->all(['status', 'priority', 'search']),
        ]);
    }

    public function show(Task $task)
    {
        Gate::authorize('view', $task);
        $task->load(['socialCase', 'assignedEmployee', 'creator']);
        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }

    public function create(Request $request)
    {
        Gate::authorize('create', Task::class);

        return Inertia::render('Tasks/Create', [
            'cases' => SocialCase::select('id', 'name')->get(),
            'employees' => User::where('role', 'employee')->get(),
            'preselected_case_id' => $request->input('case_id'),
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Task::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'case_id' => 'required|exists:cases,id',
            'user_id' => 'required|exists:users,id', // assigned employee
            'priority' => 'required|string',
            'due_date' => 'nullable|date',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['status'] = 'معلقة';

        $task = Task::create($validated);

        // Activity log
        CaseActivity::create([
            'case_id' => $task->case_id,
            'user_id' => Auth::id(),
            'type' => 'task_updated',
            'title' => 'إسناد مهمة جديدة للباحث',
            'description' => "تم إنشاء مهمة: \"{$task->title}\" وإسنادها للموظف " . User::find($task->user_id)->name,
        ]);

        return redirect()->route('tasks.index')->with('success', 'تم إنشاء المهمة وإسنادها بنجاح.');
    }

    public function update(Request $request, Task $task)
    {
        Gate::authorize('update', $task);

        if (Auth::user()->isAdmin()) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'user_id' => 'required|exists:users,id',
                'priority' => 'required|string',
                'status' => 'required|string',
                'due_date' => 'nullable|date',
                'updates' => 'nullable|string',
            ]);
            $task->update($validated);
        } else {
            // Employees can only update status and write updates
            $validated = $request->validate([
                'status' => 'required|string',
                'updates' => 'nullable|string',
            ]);
            $task->update($validated);
        }

        // Activity log
        CaseActivity::create([
            'case_id' => $task->case_id,
            'user_id' => Auth::id(),
            'type' => 'task_updated',
            'title' => 'تحديث حالة المهمة',
            'description' => "تم تحديث المهمة \"{$task->title}\" إلى حالة ({$task->status}) بواسطة " . Auth::user()->name,
        ]);

        return redirect()->route('tasks.show', $task)->with('success', 'تم تحديث المهمة بنجاح.');
    }

    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);
        
        $caseId = $task->case_id;
        $title = $task->title;
        $task->delete();

        CaseActivity::create([
            'case_id' => $caseId,
            'user_id' => Auth::id(),
            'type' => 'task_updated',
            'title' => 'حذف مهمة الباحث',
            'description' => "تم حذف المهمة: \"{$title}\" بواسطة " . Auth::user()->name,
        ]);

        return redirect()->route('tasks.index')->with('success', 'تم حذف المهمة بنجاح.');
    }
}
