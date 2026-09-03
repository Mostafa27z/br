<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Filtered in Controller
    }

    public function view(User $user, Task $task): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $task->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Task $task): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $task->user_id === $user->id;
    }

    public function delete(User $user, Task $task): bool
    {
        return $user->isAdmin();
    }
}
